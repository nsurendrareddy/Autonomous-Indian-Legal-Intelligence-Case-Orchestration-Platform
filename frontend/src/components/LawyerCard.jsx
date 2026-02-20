import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPhone, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import './LawyerCard.css';

export default function LawyerCard({ lawyer }) {
    const { name, specializations = [], rating, experience, phone, email, photoUrl } = lawyer;

    const renderStars = (r) =>
        Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < Math.round(r) ? 'star-filled' : 'star-empty'} />
        ));

    return (
        <motion.div
            className="lawyer-card glass glass-hover"
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.25 }}
        >
            <div className="lawyer-card-header">
                <div className="lawyer-avatar">
                    {photoUrl ? (
                        <img src={photoUrl} alt={name} className="lawyer-photo" />
                    ) : (
                        <div className="lawyer-avatar-placeholder">
                            {name?.charAt(0) || 'L'}
                        </div>
                    )}
                </div>
                <div className="lawyer-info">
                    <h3 className="lawyer-name">{name}</h3>
                    <div className="lawyer-stars">{renderStars(rating || 0)}</div>
                    <span className="lawyer-rating-text">{rating?.toFixed(1)} ★</span>
                </div>
            </div>

            <div className="lawyer-specs">
                {specializations.slice(0, 3).map((spec) => (
                    <span key={spec} className="badge badge-primary">{spec}</span>
                ))}
            </div>

            {experience && (
                <div className="lawyer-meta">
                    <FaBriefcase className="meta-icon" />
                    <span>{experience} years experience</span>
                </div>
            )}

            <div className="lawyer-contacts">
                {phone && (
                    <a href={`tel:${phone}`} className="contact-link">
                        <FaPhone /> {phone}
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} className="contact-link">
                        <FaEnvelope /> {email}
                    </a>
                )}
            </div>
        </motion.div>
    );
}
