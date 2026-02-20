import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaLightbulb, FaUsers, FaHeart, FaRobot } from 'react-icons/fa';
import './About.css';

const values = [
    { icon: <FaGavel />, title: 'Justice for All', desc: 'Legal help should not be a privilege. We make it accessible to every Indian citizen.' },
    { icon: <FaLightbulb />, title: 'Empowerment', desc: 'Knowledge is power. Understanding your rights is the first step to defending them.' },
    { icon: <FaUsers />, title: 'Community', desc: 'Built for the people, by people who believe in fair access to the justice system.' },
    { icon: <FaHeart />, title: 'Compassion', desc: 'We understand legal issues are stressful. Our guidance is always helpful and kind.' },
];

export default function About() {
    return (
        <div className="page-container">
            <div className="page-header">
                <motion.h1 className="gradient-text" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
                    About Our Mission
                </motion.h1>
                <p>Why we built LegalAssist and what drives us</p>
            </div>

            <div className="about-grid">
                <motion.div className="about-card glass-strong" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <h2 className="about-card-title">🌟 Why We Built This</h2>
                    <p className="about-card-text">
                        It started with a simple Swiggy order that went wrong. A wrong item was delivered, and after being
                        told "we can't refund," frustration set in — until the <strong>National Consumer Helpline</strong> was found.
                        A complaint was filed, and a full refund arrived in 12 days.
                    </p>
                    <p className="about-card-text">
                        That experience revealed a gap: <em>millions of Indians face injustice simply because they don't know
                            where to go.</em> LegalAssist was built to bridge that gap — free, instant, and always available.
                    </p>
                </motion.div>

                <motion.div className="about-card glass-strong" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <h2 className="about-card-title">💡 What We Provide</h2>
                    <ul className="about-list">
                        <li><span className="about-check">✓</span> AI-powered legal analysis in plain language</li>
                        <li><span className="about-check">✓</span> Step-by-step action plans with authority contacts</li>
                        <li><span className="about-check">✓</span> Applicable Indian law sections (IPC, CPA, IT Act...)</li>
                        <li><span className="about-check">✓</span> Lawyer recommendations by specialization</li>
                        <li><span className="about-check">✓</span> 24/7 AI chatbot for follow-up questions</li>
                        <li><span className="about-check">✓</span> Government portal links & escalation paths</li>
                    </ul>
                </motion.div>
            </div>

            {/* Core Values */}
            <motion.h2 className="about-section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Our Core Values
            </motion.h2>
            <div className="grid-4 values-grid">
                {values.map((v, i) => (
                    <motion.div
                        key={i}
                        className="value-card glass glass-hover"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                    >
                        <div className="value-icon">{v.icon}</div>
                        <h3 className="value-title">{v.title}</h3>
                        <p className="value-desc">{v.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Impact */}
            <motion.div
                className="impact-card glass-strong"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <FaRobot className="impact-icon" />
                <div>
                    <h2 className="impact-title">Our Vision</h2>
                    <p className="impact-text">
                        A future where every Indian citizen — regardless of their background, wealth, or education —
                        has access to clear, actionable legal guidance. Because justice delayed is justice denied.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
