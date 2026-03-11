import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('la_token'));
    const [loading, setLoading] = useState(true);

    // On mount, verify stored token
    useEffect(() => {
        const init = async () => {
            const stored = localStorage.getItem('la_token');
            if (stored) {
                try {
                    const { data } = await axios.get(`${API}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${stored}` },
                        timeout: 8000,
                    });
                    setUser(data);
                    setToken(stored);
                } catch {
                    localStorage.removeItem('la_token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        init();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post(`${API}/api/auth/login`, { email, password });
        localStorage.setItem('la_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post(`${API}/api/auth/register`, { name, email, password });
        localStorage.setItem('la_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('la_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
