import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaLinkedin,
    FaTwitter,
    FaGithub,
    FaPaperPlane
} from 'react-icons/fa';
import './Contact.css';

export default function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5678/webhook-test/contact-us",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            alert(result.message || "Message sent successfully!");

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error(error);
            alert("Error sending message");
        }
    };

    return (
        <div className="page-container">

            <div className="page-header">
                <motion.h1
                    className="gradient-text"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Contact Us
                </motion.h1>
                <p>Have questions or need support? We'd love to hear from you.</p>
            </div>

            <div className="contact-layout">

                {/* Info Card */}
                <motion.div
                    className="contact-info glass-strong"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="contact-info-title">Get in Touch</h2>

                    <div className="contact-items">

                        <div className="contact-item">
                            <div className="contact-item-icon"><FaEnvelope /></div>
                            <div>
                                <span className="contact-item-label">Email</span>
                                <a href="mailto:nsurendrareddy3@gmail.com" className="contact-item-value">
                                    nsurendrareddy3@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon"><FaPhone /></div>
                            <div>
                                <span className="contact-item-label">Phone</span>
                                <a href="tel:+919874069999" className="contact-item-value">
                                    +91 9874069999
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon"><FaMapMarkerAlt /></div>
                            <div>
                                <span className="contact-item-label">Location</span>
                                <span className="contact-item-value">
                                    Hyderabad, Telangana, India
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="contact-socials">
                        <a href="#" className="social-btn"><FaLinkedin /></a>
                        <a href="#" className="social-btn"><FaTwitter /></a>
                        <a href="#" className="social-btn"><FaGithub /></a>
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="contact-form-card glass-strong"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <h2 className="contact-info-title">Send a Message</h2>

                    <form className="contact-form" onSubmit={handleSubmit}>

                        <div className="form-row">

                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="What is this about?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea
                                rows={5}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-textarea"
                                placeholder="Tell us how we can help..."
                                required
                            />
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
