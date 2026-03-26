import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Menu, Moon, Sun, Award, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { user, logout } = useAuth();
  
  // Kampüs Puanı (user varsa ondan al, yoksa 0)
  const points = user?.kp || 0; 

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActive = (path) => location.pathname === path;

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-brand">
            <BookOpen className="brand-icon" size={28} />
            <span>CampusHub</span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'active' : ''}`}>
              Kaynağa Ulaş
            </Link>
            <Link to="/discussions" className={`nav-link ${isActive('/discussions') ? 'active' : ''}`}>
              Soru-Cevap Ana Sayfası
            </Link>
            <Link to="/study-rooms" className={`nav-link ${isActive('/study-rooms') ? 'active' : ''}`}>
              <span style={{color: 'var(--primary-color)', display:'flex', alignItems:'center', gap:'0.2rem'}}>
                ⏳ Odalar
              </span>
            </Link>
          </div>

          <div className="navbar-actions">
            
            {/* Kampüs Puanı (Gamification) */}
            <div className="points-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)' }}>
              <Award size={16} /> {points} KP
            </div>

            <button onClick={toggleTheme} className="theme-toggle" style={{ padding: '0.5rem', color: 'var(--text-main)', display:'flex', borderRadius: '50%', transition: 'background-color 0.2s ease'}}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</span>
                </div>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.4rem', minWidth: 'auto' }} onClick={logout} title="Çıkış Yap">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => openAuth('login')}>
                  <User size={18} /> Giriş Yap
                </button>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => openAuth('register')}>
                  Kayıt Ol
                </button>
              </>
            )}
            
            <button className="mobile-menu-btn" onClick={() => (user ? logout() : openAuth('login'))}>
               {user ? <LogOut size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </>
  );
};

export default Navbar;
