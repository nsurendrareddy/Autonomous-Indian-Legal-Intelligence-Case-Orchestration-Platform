import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBalanceScale } from 'react-icons/fa';
import './Navbar.css';

const links = [
    { to: '/', label: 'Home' },
    { to: '/laws', label: 'Laws' },
    { to: '/lawyers', label: 'Lawyers' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.1 }}
        >
            <div className="navbar-inner">
                {/* Logo */}
                <div className="navbar-logo" onClick={() => navigate('/')}>
                    <div className="logo-icon">
                        <FaBalanceScale />
                    </div>
                    <span className="logo-text gradient-text">LegalAssist</span>
                </div>

                {/* Nav Links */}
                <div className="navbar-links">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/'}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <span className="nav-link-inner">
                                    {link.label}
                                    {isActive && (
                                        <motion.span
                                            className="nav-active-indicator"
                                            layoutId="nav-indicator"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* CTA */}
                <button className="btn btn-primary navbar-cta" onClick={() => navigate('/analysis')}>
                    Get Legal Help
                </button>
            </div>
        </motion.nav>
    );
}
