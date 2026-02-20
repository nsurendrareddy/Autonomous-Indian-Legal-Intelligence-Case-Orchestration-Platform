import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingChatbot from './components/FloatingChatbot';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Laws from './pages/Laws';
import Lawyers from './pages/Lawyers';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/laws" element={<Laws />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <FloatingChatbot />
    </BrowserRouter>
  );
}
