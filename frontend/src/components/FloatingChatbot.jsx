import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './FloatingChatbot.css';


const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FloatingChatbot() {
    const { token } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I\'m your AI legal assistant. Ask me anything about Indian law or your legal issue.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysisContext, setAnalysisContext] = useState(null);
    const [sessionId, setSessionId] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Generate a unique session ID for history grouping
            if (!sessionId) {
                const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
                setSessionId(newId);
            }

            const stored = localStorage.getItem('latestAnalysis');
            if (stored && stored.trim()) {
                setAnalysisContext(stored); // plain text report
            }
        } else {
            // Optional: reset session when closed so next open is a new history item
            // I'll leave the session active until page refresh to allow continuing chat, 
            // but the user requested: "single session until the user closes the bot".
            setSessionId('');
            setMessages([{ role: 'bot', text: 'Hi! I\'m your AI legal assistant. Ask me anything about Indian law or your legal issue.' }]);
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const send = async () => {
        if (!input.trim() || loading) return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const { data } = await axios.post(`${API}/api/chatbot`, {
                message: userMsg,
                sessionId: sessionId,
                analysisContext: analysisContext || undefined
            }, { headers });
            setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
        } catch {
            setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I\'m having trouble connecting. Please try again.' }]);
        }
        setLoading(false);
    };


    return (
        <>
            {/* Toggle button */}
            <motion.button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="AI Legal Assistant"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <FaTimes />
                        </motion.span>
                    ) : (
                        <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <FaRobot />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window glass-strong"
                        initial={{ scale: 0.85, opacity: 0, y: 20, originX: 1, originY: 1 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-info">
                                <div className="chatbot-avatar"><FaRobot /></div>
                                <div>
                                    <span className="chatbot-title">AI Assistant</span>
                                    {analysisContext && <span className="chatbot-context-badge">Context Aware</span>}
                                </div>
                            </div>
                            <div className="chatbot-status-dot" />
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    className={`chatbot-msg ${m.role}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    {m.text}
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="chatbot-msg bot chatbot-typing">
                                    <span /><span /><span />
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="chatbot-input-row">
                            <input
                                className="chatbot-input"
                                type="text"
                                placeholder="Ask a legal question..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && send()}
                            />
                            <button className="chatbot-send" onClick={send} disabled={!input.trim() || loading}>
                                <FaPaperPlane />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
