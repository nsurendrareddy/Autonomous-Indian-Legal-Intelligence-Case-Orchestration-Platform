import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import LawyerCard from '../components/LawyerCard';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import './Lawyers.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CATS = ['All', 'Consumer Law', 'Property Law', 'Cyber Law', 'Criminal Law', 'Family Law', 'Labour Law'];

/* ─── Demo lawyers shown when backend is offline ─── */
const DEMO_LAWYERS = [
    { name: 'Adv. Priya Sharma', specializations: ['Consumer Law', 'Civil Law'], rating: 4.8, experience: 12, phone: '+91 98765 43210', email: 'priya.sharma@legalfirm.in' },
    { name: 'Adv. Ravi Kumar', specializations: ['Cyber Law', 'Criminal Law'], rating: 4.7, experience: 9, phone: '+91 98123 45678', email: 'ravi.kumar@cyberlaw.in' },
    { name: 'Adv. Sunita Reddy', specializations: ['Property Law', 'Civil Law'], rating: 4.9, experience: 15, phone: '+91 97001 23456', email: 'sunita.reddy@propertylaw.in' },
    { name: 'Adv. Mohammed Iqbal', specializations: ['Family Law', 'Civil Law'], rating: 4.6, experience: 11, phone: '+91 96543 21098', email: 'm.iqbal@familylaw.in' },
    { name: 'Adv. Anjali Gupta', specializations: ['Labour Law', 'Civil Law'], rating: 4.5, experience: 8, phone: '+91 95432 10987', email: 'anjali.gupta@labourlaw.in' },
    { name: 'Adv. Srinivas Rao', specializations: ['Criminal Law', 'Consumer Law'], rating: 4.7, experience: 14, phone: '+91 94321 09876', email: 'srinivas.rao@criminallaw.in' },
    { name: 'Adv. Kavitha Nair', specializations: ['Property Law', 'Family Law'], rating: 4.8, experience: 10, phone: '+91 93210 98765', email: 'kavitha.nair@legalassist.in' },
    { name: 'Adv. Deepak Joshi', specializations: ['Cyber Law', 'Consumer Law'], rating: 4.6, experience: 7, phone: '+91 92109 87654', email: 'deepak.joshi@cyberlaw.in' },
    { name: 'Adv. Lakshmi Venkat', specializations: ['Labour Law', 'Criminal Law'], rating: 4.5, experience: 13, phone: '+91 91098 76543', email: 'lakshmi.venkat@labourlaw.in' },
    { name: 'Adv. Arun Mehta', specializations: ['Property Law', 'Consumer Law'], rating: 4.4, experience: 6, phone: '+91 90987 65432', email: 'arun.mehta@propertyconsumer.in' },
    { name: 'Adv. Neha Patel', specializations: ['Family Law', "Women's Rights"], rating: 4.9, experience: 16, phone: '+91 89876 54321', email: 'neha.patel@familyrights.in' },
    { name: 'Adv. Vikram Singh', specializations: ['Criminal Law', 'Civil Law'], rating: 4.7, experience: 18, phone: '+91 88765 43210', email: 'vikram.singh@criminallaw.in' },
    { name: 'Adv. Meera Krishnan', specializations: ['Cyber Law', 'Financial Fraud'], rating: 4.6, experience: 8, phone: '+91 87654 32109', email: 'meera.krishnan@cyberfinance.in' },
    { name: 'Adv. Suresh Babu', specializations: ['Labour Law', 'Consumer Law'], rating: 4.5, experience: 20, phone: '+91 86543 21098', email: 'suresh.babu@labourlegal.in' },
    { name: 'Adv. Pooja Iyer', specializations: ['Property Law', 'Civil Law'], rating: 4.8, experience: 11, phone: '+91 85432 10987', email: 'pooja.iyer@propertylegal.in' },
    { name: 'Adv. Rahul Verma', specializations: ['Financial Fraud', 'Criminal Law'], rating: 4.7, experience: 13, phone: '+91 84321 09876', email: 'rahul.verma@fraudlaw.in' },
    { name: 'Adv. Divya Menon', specializations: ["Women's Rights", 'Family Law'], rating: 4.9, experience: 9, phone: '+91 83210 98765', email: 'divya.menon@womenlaw.in' },
    { name: 'Adv. Karthik Rajan', specializations: ['Consumer Law', 'Property Law'], rating: 4.6, experience: 7, phone: '+91 82109 87654', email: 'karthik.rajan@consumerlaw.in' },
    { name: 'Adv. Ananya Das', specializations: ['Cyber Law', 'Criminal Law'], rating: 4.5, experience: 5, phone: '+91 81098 76543', email: 'ananya.das@cyberlaw.in' },
    { name: 'Adv. Rajesh Nambiar', specializations: ['Labour Law', 'Civil Law'], rating: 4.8, experience: 22, phone: '+91 80987 65432', email: 'rajesh.nambiar@labourlaw.in' },
];

export default function Lawyers() {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCat, setSelectedCat] = useState('All');
    const [isDemo, setIsDemo] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API}/api/lawyers/top`, { timeout: 10000 });
            if (Array.isArray(data) && data.length > 0) {
                setLawyers(data);
                setIsDemo(false);
            } else {
                setLawyers(DEMO_LAWYERS);
                setIsDemo(true);
            }
        } catch {
            setLawyers(DEMO_LAWYERS);
            setIsDemo(true);
        }
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const filtered = selectedCat === 'All'
        ? lawyers
        : lawyers.filter(l => l.specializations?.includes(selectedCat));

    return (
        <div className="page-container">
            <div className="page-header">
                <motion.h1
                    className="gradient-text"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    👨‍⚖️ Top Lawyers in Hyderabad
                </motion.h1>
                <p>Find specialized lawyers matched to your legal needs</p>
            </div>

            {/* Demo mode banner */}
            {isDemo && (
                <motion.div
                    className="demo-banner"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <FaWifi className="demo-icon" />
                    <span>
                        <strong>Demo Mode</strong> — Backend not connected. Showing sample lawyers.
                    </span>
                    <button className="retry-btn" onClick={load} disabled={loading}>
                        {loading ? 'Retrying…' : '↻ Retry'}
                    </button>
                </motion.div>
            )}

            {/* Category filter tabs */}
            <div className="lawyers-filters">
                {CATS.map(cat => (
                    <button
                        key={cat}
                        className={`cat-btn ${selectedCat === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCat(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="loading-center"><div className="spinner" /></div>
            ) : filtered.length === 0 ? (
                <div className="no-results glass">
                    <FaExclamationTriangle style={{ fontSize: '1.8rem', color: 'var(--text-muted)', marginBottom: 12 }} />
                    <p>No lawyers found for "<strong>{selectedCat}</strong>".</p>
                    <p style={{ fontSize: '0.85rem', marginTop: 6 }}>Try selecting a different category.</p>
                </div>
            ) : (
                <div className="grid-3 lawyers-grid">
                    {filtered.map((lawyer, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(i * 0.07, 0.5) }}
                        >
                            <LawyerCard lawyer={lawyer} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
