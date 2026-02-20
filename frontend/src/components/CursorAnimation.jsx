import React, { useEffect, useRef } from 'react';
import './CursorAnimation.css';

const MAX_POINTS = 28; // trail chain length

export default function CursorAnimation() {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -500, y: -500 });
    const trail = useRef(
        Array.from({ length: MAX_POINTS }, () => ({ x: -500, y: -500 }))
    );
    const animFrame = useRef(null);
    const t = useRef(0); // time counter for colour cycling

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', onMove);

        /* ─── Catmull-Rom spline helper ─────────────────────── */
        const catmullRomPoint = (p0, p1, p2, p3, t) => ({
            x: 0.5 * (
                2 * p1.x +
                (-p0.x + p2.x) * t +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t * t +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t * t * t
            ),
            y: 0.5 * (
                2 * p1.y +
                (-p0.y + p2.y) * t +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t * t +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t * t * t
            ),
        });

        const animate = () => {
            t.current += 0.012;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /* ── Update trail: each point chases the one before it ── */
            trail.current[0].x += (mouse.current.x - trail.current[0].x) * 0.28;
            trail.current[0].y += (mouse.current.y - trail.current[0].y) * 0.28;
            for (let i = 1; i < MAX_POINTS; i++) {
                trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.44;
                trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.44;
            }

            /* ── Draw smooth Catmull-Rom blob trail ── */
            for (let i = 1; i < MAX_POINTS - 2; i++) {
                const progress = 1 - i / MAX_POINTS; // 1 at head, 0 at tail
                const thickness = progress * 22 + 2;  // taper from 24 → 2
                const alpha = progress * 0.85;
                const hue = (260 + Math.sin(t.current + i * 0.25) * 50) % 360; // 210–310

                // Sample 4 points for Catmull-Rom
                const p0 = trail.current[Math.max(0, i - 1)];
                const p1 = trail.current[i];
                const p2 = trail.current[i + 1];
                const p3 = trail.current[Math.min(MAX_POINTS - 1, i + 2)];

                // Draw sub-segments for smoothness
                for (let j = 0; j < 4; j++) {
                    const pt1 = catmullRomPoint(p0, p1, p2, p3, j / 4);
                    const pt2 = catmullRomPoint(p0, p1, p2, p3, (j + 1) / 4);

                    ctx.beginPath();
                    ctx.moveTo(pt1.x, pt1.y);
                    ctx.lineTo(pt2.x, pt2.y);
                    ctx.strokeStyle = `hsla(${hue}, 85%, 68%, ${alpha})`;
                    ctx.lineWidth = thickness;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.shadowColor = `hsla(${hue}, 90%, 65%, ${alpha * 0.6})`;
                    ctx.shadowBlur = thickness * 1.5;
                    ctx.stroke();
                }
            }

            /* ── Fluid glob at the cursor head ── */
            const hx = trail.current[0].x;
            const hy = trail.current[0].y;
            const headHue = (260 + Math.sin(t.current) * 50) % 360;

            // Pulsing outer glow
            const pulse = 1 + Math.sin(t.current * 3) * 0.12;
            const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 28 * pulse);
            grad.addColorStop(0, `hsla(${headHue}, 100%, 85%, 0.9)`);
            grad.addColorStop(0.45, `hsla(${headHue + 20}, 90%, 65%, 0.55)`);
            grad.addColorStop(1, `hsla(${headHue + 40}, 80%, 50%, 0)`);

            ctx.beginPath();
            ctx.arc(hx, hy, 28 * pulse, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.shadowBlur = 0;
            ctx.fill();

            // Crisp inner core
            ctx.beginPath();
            ctx.arc(hx, hy, 6, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${headHue}, 80%, 92%, 0.98)`;
            ctx.shadowColor = `hsla(${headHue}, 100%, 70%, 1)`;
            ctx.shadowBlur = 16;
            ctx.fill();

            animFrame.current = requestAnimationFrame(animate);
        };

        animFrame.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animFrame.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="cursor-canvas"
        />
    );
}
