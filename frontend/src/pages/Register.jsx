import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password || !form.confirm) {
            setError('Please fill in all fields.');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (form.password !== form.confirm) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Logo */}
                <div className="auth-logo" onClick={() => navigate('/')}>
                    <div className="auth-logo-icon"><FaBalanceScale /></div>
                    <span className="auth-logo-text gradient-text">LegalAssist</span>
                </div>

                <h1 className="auth-title">Create account</h1>
                <p className="auth-subtitle">Join LegalAssist for free legal guidance</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && <div className="auth-error">{error}</div>}

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            id="register-name"
                            className="form-input"
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            id="register-email"
                            className="form-input"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="register-password"
                                className="form-input"
                                type={showPwd ? 'text' : 'password'}
                                name="password"
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                style={{ paddingRight: '2.8rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd(v => !v)}
                                style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
                            >
                                {showPwd ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            id="register-confirm"
                            className="form-input"
                            type="password"
                            name="confirm"
                            placeholder="Re-enter your password"
                            value={form.confirm}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <button id="register-submit" className="auth-btn" type="submit" disabled={loading}>
                        {loading ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{' '}
                    <a onClick={() => navigate('/login')}>Sign in</a>
                </p>
            </motion.div>
        </div>
    );
}
