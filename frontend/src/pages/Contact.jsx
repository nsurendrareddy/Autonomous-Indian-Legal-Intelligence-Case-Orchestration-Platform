import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <motion.h1 className="gradient-text" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
                    Contact Us
                </motion.h1>
                <p>Have questions or need support? We'd love to hear from you.</p>
            </div>

            <div className="contact-layout">
                {/* Info card */}
                <motion.div className="contact-info glass-strong" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <h2 className="contact-info-title">Get in Touch</h2>
                    <div className="contact-items">
                        <div className="contact-item">
                            <div className="contact-item-icon"><FaEnvelope /></div>
                            <div>
                                <span className="contact-item-label">Email</span>
                                <a href="mailto:support@legalassist.com" className="contact-item-value">
                                    support@legalassist.com
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-item-icon"><FaPhone /></div>
                            <div>
                                <span className="contact-item-label">Phone</span>
                                <a href="tel:+911234567890" className="contact-item-value">
                                    +91 123-456-7890
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-item-icon"><FaMapMarkerAlt /></div>
                            <div>
                                <span className="contact-item-label">Location</span>
                                <span className="contact-item-value">Hyderabad, Telangana, India</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-socials">
                        <a href="#" className="social-btn"><FaLinkedin /></a>
                        <a href="#" className="social-btn"><FaTwitter /></a>
                        <a href="#" className="social-btn"><FaGithub /></a>
                    </div>
                </motion.div>

                {/* Form card */}
                <motion.div className="contact-form-card glass-strong" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <h2 className="contact-info-title">Send a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-input" placeholder="Your name" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-input" placeholder="your@email.com" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input type="text" className="form-input" placeholder="What is this about?" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea rows={5} className="form-textarea" placeholder="Tell us how we can help..." required />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn btn-primary contact-submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaPaperPlane /> Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
