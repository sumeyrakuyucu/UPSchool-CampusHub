import React from 'react';
import './Footer.css';
import { BookOpen, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <BookOpen size={24} />
            <span>CampusHub</span>
          </div>
          <p className="footer-description">
            Üniversite öğrencileri için not, kaynak paylaşım ve yardımlaşma platformu. Birlikte daha güçlüyüz.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link"><Twitter size={20} /></a>
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Github size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links-group">
          <h4>Platform</h4>
          <a href="#">Ana Sayfa</a>
          <a href="#">Ders Notları</a>
          <a href="#">Çıkmış Sorular</a>
          <a href="#">Soru-Cevap</a>
        </div>
        
        <div className="footer-links-group">
          <h4>Destek</h4>
          <a href="#">Hakkımızda</a>
          <a href="#">İletişim</a>
          <a href="#">Kullanım Koşulları</a>
          <a href="#">Gizlilik Politikası</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CampusHub Platformu. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
