import React, { useState } from 'react';
import { ArrowRight, Search, PlusCircle, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ResourceCard from '../components/ResourceCard';
import DiscussionCard from '../components/DiscussionCard';
import UploadModal from '../components/UploadModal';
import './Home.css';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Lütfen aranacak bir kelime girin.');
      return;
    }
    toast.loading(`"${searchQuery}" aranıyor...`, { duration: 1000 });
    setTimeout(() => {
      navigate('/resources');
    }, 1000);
  };

  return (
    <div className="home-page animate-fade-in">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">🎓 Üniversiteliler İçin Akıllı Platform</span>
            <h1 className="hero-title">
              Vizelere mi hazırlanıyorsun? <br/>
              <span className="text-gradient">KampüsHub Yanında!</span>
            </h1>
            <p className="hero-subtitle">
              Hocanın anlattığı yetmedi mi? Çıkmış soruları, en iyi ders notlarını bul veya çözemediğin soruları diğer üniversitelilerle tartış!
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                <PlusCircle size={20} /> Hemen Paylaşım Yap
              </button>
              <button className="btn btn-secondary" onClick={() => {
                toast.success('Kaynaklar sayfasına yönlendiriliyorsunuz.', { duration: 1500 });
                setTimeout(() => navigate('/resources'), 500);
              }}>
                Kaynakları Keşfet <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="hero-search">
              <div className="search-box">
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Ders kodu, not veya soru ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn btn-primary search-btn" onClick={handleSearch}>Ara</button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
      </section>

      {/* LİDERLİK TABLOSU (GAMIFICATION) */}
      <section className="leaderboard-section container" style={{ marginTop: '-2rem', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: 'var(--text-main)' }}>
              <Trophy color="#eab308" /> Haftanın En İyileri (Liderlik Tablosu)
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {[
              { rank: 1, name: 'ZeynepK', points: 4500, title: 'Altın Çözücü' },
              { rank: 2, name: 'AliHan', points: 3200, title: 'Not Canavarı' },
              { rank: 3, name: 'CananT', points: 2800, title: 'Düzenli Çalışkan' },
              { rank: 4, name: 'Sen', points: 1250, title: 'Yükselen Yıldız' }
            ].map((usr) => (
              <div key={usr.rank} style={{ flex: '1', minWidth: '200px', backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', border: usr.name === 'Sen' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: usr.name === 'Sen' ? 'var(--primary-color)' : 'var(--text-muted)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {usr.rank}
                </div>
                <strong style={{ color: 'var(--text-main)' }}>{usr.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{usr.title}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 600 }}>{usr.points} KP</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="highlights-section container" style={{ paddingTop: '0' }}>
        <div className="grid-layout">
          <div className="highlight-col">
            <div className="col-header">
              <h2>🔥 Popüler Kaynaklar</h2>
              <button className="view-all" onClick={() => navigate('/resources')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Tümü <ArrowRight size={16} />
              </button>
            </div>
            <div className="cards-list">
              <ResourceCard 
                title="Calculus 1 - Vize Hazırlık (Konu Özeti)"
                category="Ders Notu"
                university="İTÜ"
                downloads="1.2k"
                date="2 gün önce"
                author="matematikci"
              />
              <ResourceCard 
                title="Fizik 101 - Son 5 Yıl Çıkmış Sorular"
                category="Çıkmış Soru"
                university="ODTÜ"
                downloads="850"
                date="1 hafta önce"
                author="fizik_ustasi"
              />
            </div>
          </div>
          
          <div className="highlight-col">
            <div className="col-header">
              <h2>💬 Aktif Tartışmalar</h2>
              <button className="view-all" onClick={() => navigate('/discussions')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Tümü <ArrowRight size={16} />
              </button>
            </div>
            <div className="cards-list">
              <DiscussionCard 
                user="Yazilimci123"
                university="Boğaziçi Üniv."
                time="1 saat önce"
                question="Algoritma dersinde Dinamik Programlama konusunu bir türlü oturtamadım. Önerebileceğiniz bir kaynak var mı?"
                tags={['algoritma', 'cs101', 'tavsiye']}
                likes={24}
                comments={5}
              />
              <DiscussionCard 
                user="CananT"
                university="Hacettepe Üniv."
                time="3 saat önce"
                question="Tıp 1. Sınıf anatomi laboratuvar sınavı için pratik ipuçlarınız nelerdir? Kemik ezberlerken hangi yöntemleri kullandınız?"
                tags={['tıp', 'anatomi', 'tavsiye']}
                likes={42}
                comments={12}
              />
            </div>
          </div>
        </div>
      </section>
      
      <UploadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;
