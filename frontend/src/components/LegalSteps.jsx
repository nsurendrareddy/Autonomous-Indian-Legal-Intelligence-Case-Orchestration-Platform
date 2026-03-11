import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCopy, FaCheck } from 'react-icons/fa';
import './LegalSteps.css';

const SECTION_ICONS = {
    '1. ISSUE ANALYSIS': '🔍',
    '2. MAIN APPLICABLE LAWS': '⚖️',
    '3. OTHER RELATED': '📚',
    '4. USER RIGHTS': '🛡️',
    '5. STEP-BY-STEP ACTION PLAN': '📋',
    '6. WHERE TO FILE': '🏛️',
    '7. HOW TO FILE': '📝',
    '8. LAWYER GUIDANCE': '👨‍⚖️',
    '9. IMPORTANT TIPS': '💡',
    '10. DISCLAIMER': '⚠️',
};

function getSectionIcon(title) {
    for (const key of Object.keys(SECTION_ICONS)) {
        if (title.toUpperCase().includes(key)) return SECTION_ICONS[key];
    }
    return '📌';
}

function parseReport(reportText) {
    const sections = [];
    // Split on the separator lines
    const raw = reportText.split(/\n-{30,}\n/);

    for (const block of raw) {
        const trimmed = block.trim();
        if (!trimmed) continue;

        // Look for a heading line like "1. ISSUE ANALYSIS"
        const lines = trimmed.split('\n');
        const headingMatch = lines[0].match(/^(\d+\.\s+.+)$/);

        if (headingMatch) {
            const title = headingMatch[1].trim();
            const body = lines.slice(1).join('\n').trim();
            sections.push({ title, body });
        } else if (trimmed) {
            // Content before first section (intro text)
            sections.push({ title: null, body: trimmed });
        }
    }

    return sections;
}

function renderFormattedText(text) {
    if (!text) return null;
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*.*?\*\*)/g;
    const parts = text.split(tokenRegex);
    
    return parts.map((part, index) => {
        if (!part) return null;
        
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            return (
                <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="lr-link">
                    {linkMatch[1]}
                </a>
            );
        }
        
        const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
        if (boldMatch) {
            return <strong key={index}>{boldMatch[1]}</strong>;
        }
        
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
}

function renderBody(body) {
    const lines = body.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
            i++;
            continue;
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            elements.push(
                <div key={i} className="lr-bullet">
                    <span className="lr-bullet-dot">•</span>
                    <span>{renderFormattedText(trimmed.replace(/^[-•]\s*/, ''))}</span>
                </div>
            );
        } else if (/^\d+\.\s/.test(trimmed) && trimmed.length < 80) {
            elements.push(
                <div key={i} className="lr-numbered">
                    <span className="lr-num-badge">{trimmed.match(/^(\d+)\./)[1]}</span>
                    <span>{renderFormattedText(trimmed.replace(/^\d+\.\s*/, ''))}</span>
                </div>
            );
        } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            elements.push(
                <p key={i} className="lr-bold-line">{renderFormattedText(trimmed.replace(/\*\*/g, ''))}</p>
            );
        } else {
            elements.push(
                <p key={i} className="lr-paragraph">{renderFormattedText(trimmed)}</p>
            );
        }
        i++;
    }

    return elements;
}

function ReportSection({ section, index }) {
    const icon = getSectionIcon(section.title || '');
    return (
        <motion.div
            className={`lr-section glass ${section.title?.includes('10.') ? 'lr-disclaimer' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
        >
            {section.title && (
                <div className="lr-section-header">
                    <span className="lr-section-icon">{icon}</span>
                    <h3 className="lr-section-title">{section.title}</h3>
                </div>
            )}
            <div className="lr-section-body">
                {renderBody(section.body)}
            </div>
        </motion.div>
    );
}

export default function LegalSteps({ analysis }) {
    const [copied, setCopied] = useState(false);

    if (!analysis) return null;

    const { reportText, category } = analysis;
    if (!reportText) return null;

    const sections = parseReport(reportText);

    const handleCopy = () => {
        navigator.clipboard.writeText(reportText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="lr-container">
            {/* Header bar */}
            <motion.div
                className="lr-header-bar glass-strong"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
            >
                <div className="lr-header-left">
                    <span className="badge badge-primary">⚖️ {category}</span>
                    <span className="lr-header-label">AI Legal Analysis Report</span>
                </div>
                <div className="lr-header-right">
                    <div className="lr-chatbot-tip">
                        <FaRobot className="tip-icon" />
                        <span>Have questions? Use the chatbot (bottom-right)!</span>
                    </div>
                    <button className="lr-copy-btn btn btn-ghost" onClick={handleCopy}>
                        {copied ? <FaCheck /> : <FaCopy />}
                        {copied ? 'Copied!' : 'Copy Report'}
                    </button>
                </div>
            </motion.div>

            {/* Sections */}
            <div className="lr-sections">
                {sections.map((section, i) => (
                    <ReportSection key={i} section={section} index={i} />
                ))}
            </div>
        </div>
    );
}
