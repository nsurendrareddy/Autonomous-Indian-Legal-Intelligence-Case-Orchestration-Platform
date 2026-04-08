import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaImage, FaTimes, FaSearch } from 'react-icons/fa';
import './InputBox.css';

const MAX_IMAGES = 2;

export default function InputBox({ onAnalyze, loading }) {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [listening, setListening] = useState(false);
    const fileRef = useRef(null);
    const recognitionRef = useRef(null);

    // ── Voice Recognition (native Web Speech API – works on Render/HTTPS) ───
    const toggleMic = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                'Speech recognition is not supported in this browser.\n' +
                'Please use Google Chrome or Microsoft Edge.'
            );
            return;
        }

        // If already listening, stop
        if (listening) {
            recognitionRef.current?.stop();
            setListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onstart = () => setListening(true);

        recognition.onresult = (e) => {
            let fullTranscript = '';
            for (let i = 0; i < e.results.length; i++) {
                fullTranscript += e.results[i][0].transcript;
            }
            setQuery(fullTranscript);
        };

        recognition.onerror = (e) => {
            setListening(false);
            if (e.error === 'not-allowed') {
                alert(
                    'Microphone permission was denied.\n' +
                    'Please allow microphone access in your browser settings and try again.'
                );
            } else if (e.error !== 'aborted') {
                console.error('Speech recognition error:', e.error);
            }
        };

        recognition.onend = () => setListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    // ── Image Handling ────────────────────────────────────────────────────────
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;

        const toAdd = files.slice(0, remaining);
        const newPreviews = toAdd.map(f => URL.createObjectURL(f));

        setImages(prev => [...prev, ...toAdd]);
        setPreviews(prev => [...prev, ...newPreviews]);

        if (fileRef.current) fileRef.current.value = '';
    };

    const removeImage = (idx) => {
        URL.revokeObjectURL(previews[idx]);
        setImages(prev => prev.filter((_, i) => i !== idx));
        setPreviews(prev => prev.filter((_, i) => i !== idx));
    };

    // ── Submit ─────────────────────────────────────────────────────────────────
    const handleSubmit = () => {
        if (!query.trim() || loading) return;
        if (listening) {
            recognitionRef.current?.stop();
            setListening(false);
        }
        onAnalyze({ query, images });
    };

    const canAddMore = images.length < MAX_IMAGES;

    return (
        <motion.div
            className="input-box glass-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Textarea */}
            <div className={`textarea-wrapper ${listening ? 'mic-active' : ''}`}>
                <textarea
                    className="input-box-textarea"
                    rows={4}
                    placeholder="Describe your legal issue in detail (e.g. 'I ordered a product from Flipkart but received a damaged item and they are refusing to refund…')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
                    }}
                />
                {listening && (
                    <div className="mic-listening-badge">
                        <span className="mic-pulse" />
                        Listening…
                    </div>
                )}
            </div>

            {/* Image Previews */}
            <AnimatePresence>
                {previews.length > 0 && (
                    <motion.div
                        className="image-preview-row"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {previews.map((src, idx) => (
                            <div key={idx} className="image-preview-wrap">
                                <img src={src} alt={`Evidence ${idx + 1}`} className="image-preview-img" />
                                <button
                                    className="image-remove-btn"
                                    onClick={() => removeImage(idx)}
                                    title="Remove image"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                        <span className="image-preview-label">
                            {images.length}/{MAX_IMAGES} image{images.length !== 1 ? 's' : ''} attached
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actions Row */}
            <div className="input-box-actions">
                <div className="input-box-left">
                    {/* Mic Button */}
                    <button
                        className={`icon-btn ${listening ? 'icon-btn--active' : ''}`}
                        onClick={toggleMic}
                        title={listening ? 'Stop voice input' : 'Start voice input'}
                    >
                        {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>

                    {/* Attach Image Button */}
                    <button
                        className={`icon-btn ${!canAddMore ? 'icon-btn--disabled' : ''}`}
                        onClick={() => canAddMore && fileRef.current?.click()}
                        title={canAddMore ? `Attach image (${MAX_IMAGES - images.length} left)` : 'Maximum 2 images'}
                        disabled={!canAddMore}
                    >
                        <FaImage />
                    </button>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
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
