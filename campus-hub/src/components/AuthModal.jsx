import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState(initialMode || 'login'); // 'login' veya 'register'
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(mode === 'login' ? 'Başarıyla giriş yapıldı!' : 'Kayıt işlemi başarılı! Hoş geldin.');
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" style={{ zIndex: 9999 }}>
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h3>{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="form-group">
                <label>Ad Soyad</label>
                <input type="text" required placeholder="Örn: Ahmet Yılmaz" className="form-input" />
              </div>
            )}
            
            <div className="form-group">
              <label>Üniversite E-Postası</label>
              <input type="email" required placeholder="Örn: ahmet@ogrenci.edu.tr" className="form-input" />
            </div>
            
            <div className="form-group">
              <label>Şifre</label>
              <input type="password" required placeholder="••••••••" className="form-input" />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {mode === 'login' ? 'Giriş Yap' : 'Ücretsiz Kayıt Ol'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {mode === 'login' ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={{ color: 'var(--primary-color)', marginLeft: '0.5rem', fontWeight: 600, textDecoration: 'underline' }}
            >
              {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
