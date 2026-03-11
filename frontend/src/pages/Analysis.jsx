import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import InputBox from '../components/InputBox';
import LegalSteps from '../components/LegalSteps';
import LawyerCard from '../components/LawyerCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Analysis.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Analysis() {
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [lawyers, setLawyers] = useState([]);
    const [error, setError] = useState(null);

    const handleAnalyze = async ({ query, image }) => {
        setLoading(true);
        setError(null);
        setAnalysis(null);
        setLawyers([]);
        try {
            const formData = new FormData();
            formData.append('query', query);
            if (image) formData.append('image', image);

            const token = localStorage.getItem('la_token');
            const { data } = await axios.post(`${API}/api/analysis`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
            });

            setAnalysis(data.analysis);
            setLawyers(data.recommendedLawyers || []);
            // Store report text for chatbot context
            localStorage.setItem('latestAnalysis', data.analysis?.reportText || '');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to analyze. Please check your connection and API key.');
        }
        setLoading(false);
    };

    return (
        <div className="page-container analysis-page">
            <div className="page-header">
                <motion.h1
                    className="gradient-text"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    ⚖️ AI Legal Analysis
                </motion.h1>
                <p>Describe your legal issue and get instant, AI-powered guidance based on Indian law</p>
            </div>

            <InputBox onAnalyze={handleAnalyze} loading={loading} />

            {loading && (
                <motion.div
                    className="loading-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="spinner" />
                    <p className="loading-text">Analyzing your legal issue with AI...</p>
                    <p className="loading-sub">This may take 10–20 seconds</p>
                </motion.div>
            )}

            {error && (
                <motion.div
                    className="error-card glass"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <FaExclamationTriangle className="error-icon" />
                    <div>
                        <strong>Analysis Failed</strong>
                        <p>{error}</p>
                        {(error.includes('API key') || error.includes('401') || error.includes('503')) && (
                            <a
                                href="https://console.groq.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="error-link"
                            >
                                → Get your free Groq API key at console.groq.com
                            </a>
                        )}
                    </div>
                </motion.div>
            )}

            {analysis && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <LegalSteps analysis={analysis} />

                    {lawyers.length > 0 && (
                        <div className="lawyers-section">
                            <h2 className="lawyers-section-title">
                                👨‍⚖️ Recommended Lawyers
                            </h2>
                            <div className="grid-3 lawyers-grid">
                                {lawyers.map((l, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <LawyerCard lawyer={l} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
