import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FaRobot, FaBalanceScale, FaUserTie, FaCheckCircle,
    FaArrowRight, FaUsers, FaMobileAlt, FaShoppingCart, FaHome, FaLaptop
} from 'react-icons/fa';
import './Home.css';

const features = [
    { icon: <FaRobot />, title: 'AI-Powered Analysis', desc: 'Describe your issue and get instant legal guidance powered by LLaMA 3.1 70B.' },
    { icon: <FaBalanceScale />, title: 'Know Your Rights', desc: 'Access applicable Indian law sections with clear descriptions in plain language.' },
    { icon: <FaUserTie />, title: 'Expert Lawyers', desc: 'Get matched with specialized lawyers in Hyderabad based on your case type.' },
];

const useCases = [
    { icon: <FaShoppingCart />, text: 'Consumer disputes — wrong product, refund issues' },
    { icon: <FaHome />, text: 'Property & land disputes' },
    { icon: <FaLaptop />, text: 'Cyber crimes — online fraud, phishing, data breach' },
    { icon: <FaMobileAlt />, text: 'Lost or stolen mobile phone' },
    { icon: <FaUsers />, text: 'Service deficiency complaints' },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg-gradient" />
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="hero-text"
                    >
                        <motion.span
                            className="hero-badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            🇮🇳 For Indian Citizens
                        </motion.span>
                        <h1 className="hero-title">
                            Know Your<br />
                            <span className="gradient-text">Legal Rights</span>
                        </h1>
                        <p className="hero-subtitle">
                            AI-powered legal assistance for consumer rights, property law, cyber crimes and more.
                            Get instant guidance in plain language — free, always.
                        </p>
                        <div className="hero-ctas">
                            <motion.button
                                className="btn btn-primary hero-cta-primary"
                                onClick={() => navigate('/analysis')}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Get Legal Help <FaArrowRight />
                            </motion.button>
                            <motion.button
                                className="btn btn-secondary hero-cta-secondary"
                                onClick={() => navigate('/lawyers')}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Find Lawyers
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Floating decoration */}
                    <motion.div
                        className="hero-decoration"
                        animate={{ y: [0, -16, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaBalanceScale className="hero-deco-icon" />
                    </motion.div>
                </div>
            </section>

            {/* Real Story */}
            <section className="section-padded">
                <div className="container">
                    <motion.div
                        className="story-card glass-strong"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="story-icon">💬</div>
                        <div className="story-content">
                            <h2 className="story-title">A Real Story That Started This Platform</h2>
                            <p className="story-text">
                                A user ordered from Swiggy, received the wrong item, and was told <em>"we can't refund."</em>
                                After using the <strong>National Consumer Helpline (1800-11-4000)</strong>, they filed a complaint
                                and received a <strong>full refund within 12 days</strong>.
                            </p>
                            <p className="story-lesson">
                                💡 <strong>Many people don't know where to escalate.</strong> This platform helps you navigate
                                the system — from company complaints to consumer courts and beyond.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padded">
                <div className="container">
                    <motion.h2
                        className="section-title text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Why Choose <span className="gradient-text">LegalAssist?</span>
                    </motion.h2>
                    <div className="grid-3 features-grid">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                className="feature-card glass glass-hover"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="section-padded use-cases-section">
                <div className="container">
                    <div className="use-cases-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title">We Can Help With</h2>
                            <div className="use-cases-list">
                                {useCases.map((uc, i) => (
                                    <motion.div
                                        key={i}
                                        className="use-case-item"
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.08 }}
                                    >
                                        <span className="use-case-icon">{uc.icon}</span>
                                        <span className="use-case-text">{uc.text}</span>
                                        <FaCheckCircle className="use-case-check" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="cta-box glass-strong"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="cta-box-title">Ready to get help?</h3>
                            <p className="cta-box-desc">
                                Describe your legal issue in plain language and get AI-powered guidance in seconds.
                            </p>
                            <button
                                className="btn btn-primary cta-box-btn"
                                onClick={() => navigate('/analysis')}
                            >
                                Start Your Legal Journey <FaArrowRight />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
