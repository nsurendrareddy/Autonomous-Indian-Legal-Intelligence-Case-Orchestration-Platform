import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHistory, FaRobot, FaSearch, FaTrash, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './History.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function timeAgo(isoStr) {
    const diff = (Date.now() - new Date(isoStr)) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(isoStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function History() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('All');   // All | Chat | Analysis
    const [clearing, setClearing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchHistory();
    }, [user]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API}/api/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(data.history || []);
        } catch {
            setItems([]);
        }
        setLoading(false);
    };

    const clearHistory = async () => {
        if (!window.confirm('Clear all history? This cannot be undone.')) return;
        setClearing(true);
        try {
            await axios.delete(`${API}/api/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems([]);
        } catch { }
        setClearing(false);
    };

    const filtered = items.filter(item => {
        if (tab === 'All') return true;
        if (tab === 'Chat') return item.type === 'chat';
        if (tab === 'Analysis') return item.type === 'analysis';
        return true;
    });

    return (
        <div className="history-page">
            <div className="history-header">
                <motion.h1
                    className="gradient-text"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    🕰️ My History
                </motion.h1>
                <p>Your previous chats and legal analysis sessions</p>
            </div>

            <div className="history-toolbar">
                <div className="history-tabs">
                    {['All', 'Chat', 'Analysis'].map(t => (
                        <button
                            key={t}
                            className={`tab-btn ${tab === t ? 'active' : ''}`}
                            onClick={() => setTab(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                {items.length > 0 && (
                    <button className="clear-btn" onClick={clearHistory} disabled={clearing}>
                        <FaTrash style={{ marginRight: 6 }} />
                        {clearing ? 'Clearing…' : 'Clear All'}
                    </button>
                )}
            </div>

            {loading ? (
                <div className="loading-center"><div className="spinner" /></div>
            ) : filtered.length === 0 ? (
                <div className="history-empty glass">
                    <div className="history-empty-icon">📭</div>
                    <h3>No history yet</h3>
                    <p>
                        {tab === 'Analysis'
                            ? 'Run a legal analysis to see it here.'
                            : 'Start chatting with the AI assistant to see your history here.'}
                    </p>
                </div>
            ) : (
                <div className="history-timeline">
                    {filtered.map((item, i) => (
                        <motion.div
                            key={i}
                            className="history-item glass clickable"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(i * 0.04, 0.4) }}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="history-item-header">
                                {item.type === 'chat' ? (
                                    <span className={`history-type-badge ${item.role === 'user' ? 'badge-chat-user' : 'badge-chat-bot'}`}>
                                        💬 Chat Session
                                    </span>
                                ) : (
                                    <span className="history-type-badge badge-analysis">
                                        📋 Legal Analysis
                                    </span>
                                )}
                                <span className="history-time">{timeAgo(item.created_at)}</span>
                            </div>

                            <div className="history-item-body">
                                {item.type === 'chat' ? (
                                    <>
                                        <h4 className="history-item-title">
                                            Discussion ({item.messages?.length || 0} messages)
                                        </h4>
                                        <p className="history-text line-clamp-2">
                                            {item.messages && item.messages.length > 0 
                                                ? `Last msg: "${item.messages[item.messages.length - 1].text}"`
                                                : 'Empty Chat Session'}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="history-item-title line-clamp-1">"{item.query}"</h4>
                                        <div className="history-category-wrapper">
                                            <span className="history-category-pill small">{item.category}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal for full text */}
            {selectedItem && (
                <div className="history-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <motion.div 
                        className="history-modal glass"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="history-modal-close" onClick={() => setSelectedItem(null)}>
                            <FaTimes />
                        </button>
                        <div className="history-modal-header">
                            <span className="history-time">{new Date(selectedItem.created_at).toLocaleString()}</span>
                            {selectedItem.type === 'analysis' && (
                                <span className="history-category-pill">{selectedItem.category}</span>
                            )}
                        </div>
                        <div className="history-modal-content">
                            {selectedItem.type === 'analysis' ? (
                                <>
                                    <h3 className="history-modal-query">"{selectedItem.query}"</h3>
                                    <hr className="history-modal-divider" />
                                    <div className="history-modal-report format-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                                        {selectedItem.report_text}
                                    </div>
                                </>
                            ) : (
                                <div className="history-modal-chat-session">
                                    {selectedItem.messages?.map((msg, idx) => (
                                        <div key={idx} className={`chat-bubble-wrapper ${msg.role}`}>
                                            <div className="chat-bubble">
                                                {msg.text}
                                            </div>
                                            <span className="chat-bubble-time">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                    ))}
                                    {(!selectedItem.messages || selectedItem.messages.length === 0) && (
                                        <p className="history-text">No messages in this session.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
