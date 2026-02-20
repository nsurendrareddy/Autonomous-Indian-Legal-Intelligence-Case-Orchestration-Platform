import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaImage, FaTimes, FaSearch } from 'react-icons/fa';
import './InputBox.css';

export default function InputBox({ onAnalyze, loading }) {
    const [query, setQuery] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileRef = useRef(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    const handleSubmit = () => {
        if (!query.trim() || loading) return;
        onAnalyze({ query, image });
    };

    const handleMic = () => {
        alert('Voice input requires microphone permission. Please type your query.');
    };

    return (
        <motion.div
            className="input-box glass-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <textarea
                className="input-box-textarea"
                rows={4}
                placeholder="Describe your legal issue in detail (e.g. 'I ordered a product from Flipkart but received a damaged item and they are refusing to refund...')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
                }}
            />

            {imagePreview && (
                <div className="image-preview-row">
                    <div className="image-preview-wrap">
                        <img src={imagePreview} alt="Upload preview" className="image-preview-img" />
                        <button className="image-remove-btn" onClick={removeImage}>
                            <FaTimes />
                        </button>
                    </div>
                    <span className="image-preview-label">Image attached as evidence</span>
                </div>
            )}

            <div className="input-box-actions">
                <div className="input-box-left">
                    <button className="icon-btn" onClick={handleMic} title="Voice input">
                        <FaMicrophone />
                    </button>
                    <button className="icon-btn" onClick={() => fileRef.current?.click()} title="Attach image">
                        <FaImage />
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImage}
                    />
                    <span className="hint">Ctrl+Enter to analyze</span>
                </div>

                <motion.button
                    className="btn btn-primary analyze-btn"
                    onClick={handleSubmit}
                    disabled={!query.trim() || loading}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {loading ? (
                        <>
                            <span className="btn-spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <FaSearch />
                            Analyze Issue
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}
