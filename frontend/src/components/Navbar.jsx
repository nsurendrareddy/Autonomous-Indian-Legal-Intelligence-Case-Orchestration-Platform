import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBalanceScale, FaUserCircle, FaSignOutAlt, FaHistory } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
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
    const { user, logout, loading } = useAuth();
    const [dropOpen, setDropOpen] = useState(false);

    const handleLogout = () => {
        setDropOpen(false);
        logout();
        navigate('/');
    };

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

                {/* Auth / CTA section */}
                <div className="navbar-auth">
                    {!loading && user ? (
                        /* Logged in: user avatar dropdown */
                        <div className="user-menu" onMouseLeave={() => setDropOpen(false)}>
                            <button
                                className="user-btn"
                                onClick={() => setDropOpen(v => !v)}
                                title={user.email}
                            >
                                <FaUserCircle className="user-icon" />
                                <span className="user-name">{user.name.split(' ')[0]}</span>
                                <span className="user-chevron">{dropOpen ? '▲' : '▼'}</span>
                            </button>
                            <AnimatePresence>
                                {dropOpen && (
                                    <motion.div
                                        className="user-dropdown"
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <div className="dropdown-info">
                                            <span className="dropdown-name">{user.name}</span>
                                            <span className="dropdown-email">{user.email}</span>
                                        </div>
                                        <hr className="dropdown-divider" />
                                        <button className="dropdown-link" onClick={() => { setDropOpen(false); navigate('/history'); }}>
                                            <FaHistory /> My History
                                        </button>
                                        <hr className="dropdown-divider" />
                                        <button className="dropdown-logout" onClick={handleLogout}>
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        /* Logged out: Login + Register buttons */
                        !loading && (
                            <div className="auth-btns">
                                <button
                                    className="btn btn-ghost navbar-login"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-primary navbar-cta"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
