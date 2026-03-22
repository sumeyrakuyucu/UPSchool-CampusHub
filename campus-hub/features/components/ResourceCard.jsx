import React, { useState } from 'react';
import { FileText, Download, Star, Clock, Edit3, X, PenTool, Type, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './ResourceCard.css';

const AnnotationModal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-content" style={{ maxWidth: '900px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Defter Modu: {title}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sayfa 1 / 14</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-outline btn-sm" style={{ padding: '0.4rem', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>
              <PenTool size={16} /> Çiz
            </button>
            <button className="btn btn-outline btn-sm" style={{ padding: '0.4rem' }}>
              <Type size={16} /> Metin Ekle
            </button>
            <button className="btn btn-outline btn-sm" style={{ padding: '0.4rem', color: '#ef4444' }}>
              <Trash2 size={16} /> Temizle
            </button>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>
            <button className="btn btn-primary btn-sm" onClick={() => { toast.success('Notlu halini kaydettiniz!'); onClose(); }}>
              Değişiklikleri Kaydet
            </button>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>
        </div>
        
        <div className="modal-body" style={{ flex: 1, backgroundColor: '#e2e8f0', padding: '2rem', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
          {/* Fake PDF Page */}
          <div style={{ width: '100%', maxWidth: '600px', height: '800px', backgroundColor: 'white', padding: '3rem', boxShadow: 'var(--shadow-md)', borderRadius: '4px', position: 'relative' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid black', paddingBottom: '1rem' }}>{title}</h2>
            <p style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#333' }}>
              Ders notları başlangıcı... <br/><br/>
              Limit, matematikte bir fonksiyonun bir noktaya yaklaşırken aldığı değere yakınsamasıdır.
              Türev ise bu değişimin anlık hızıdır. <br/><br/>
              <span style={{ backgroundColor: 'rgba(250, 204, 21, 0.4)', padding: '0 0.2rem' }}>
                Önemli Formül: f'(x) = lim h-&gt;0 [f(x+h) - f(x)] / h
              </span>
            </p>
            {/* Fake Hand-drawn annotation */}
            <div style={{ position: 'absolute', top: '180px', right: '50px', transform: 'rotate(-10deg)', color: '#ef4444', fontFamily: 'cursive', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Burası vizede kesin <br/>çıkacak hoca söyledi!
            </div>
            <div style={{ position: 'absolute', top: '220px', right: '180px', width: '30px', height: '30px', border: '3px solid #ef4444', borderRadius: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ title, category, university, downloads: initialDownloads, date, author }) => {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnnotationOpen, setAnnotationOpen] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    toast.loading('Dosya indiriliyor...', { id: 'downloadToast' });
    
    setTimeout(() => {
      toast.success('Dosya başarıyla indirildi!', { id: 'downloadToast' });
      setIsDownloading(false);
      if (typeof downloads === 'string' && !downloads.includes('k')) {
        setDownloads(parseInt(downloads) + 1);
      }
    }, 1500);
  };

  const handleSave = () => {
    if (isSaved) {
      setIsSaved(false);
      toast('Kaydedilenlerden çıkarıldı.', { icon: '🗑️' });
    } else {
      setIsSaved(true);
      toast.success('Kaydedilenlere eklendi!');
    }
  };

  return (
    <div className="resource-card animate-fade-in">
      <div className="resource-icon-wrapper">
        <FileText size={32} className="resource-icon" />
      </div>
      <div className="resource-content">
        <div className="resource-badges">
          <span className="badge badge-category">{category}</span>
          <span className="badge badge-university">{university}</span>
        </div>
        <h3 className="resource-title">{title}</h3>
        <p className="resource-meta">
          Yükleyen: {author} <span className="dot">•</span> <Clock size={14} className="meta-icon"/> {date}
        </p>
      </div>
      <div className="resource-actions" style={{ alignItems: 'flex-end' }}>
        <div className="stats">
          <span className="stat-item"><Download size={16} /> {downloads}</span>
          <button 
            className="stat-item" 
            onClick={handleSave}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: isSaved ? '#eab308' : 'var(--text-muted)' }}
          >
            <Star size={16} fill={isSaved ? '#eab308' : 'none'} color={isSaved ? '#eab308' : 'currentColor'} />
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setAnnotationOpen(true)}
            style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Edit3 size={14} /> İncele & Çiz
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'İndiriliyor...' : 'İndir'}
          </button>
        </div>
      </div>

      <AnnotationModal isOpen={isAnnotationOpen} onClose={() => setAnnotationOpen(false)} title={title} />
    </div>
  );
};

export default ResourceCard;
