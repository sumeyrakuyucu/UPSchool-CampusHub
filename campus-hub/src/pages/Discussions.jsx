import React, { useState } from 'react';
import DiscussionCard from '../components/DiscussionCard';
import UploadModal from '../components/UploadModal';
import { PenTool } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Discussions.css';

const Discussions = () => {
  const [activeTab, setActiveTab] = useState('Trend Olanlar');
  const [isModalOpen, setModalOpen] = useState(false);
  const { questions } = useData();

  const tabs = ['Trend Olanlar', 'En Yeniler', 'Çözülmemiş', 'Benim Alanım'];

  return (
    <div className="discussions-page animate-fade-in">
      <div className="page-header text-center">
        <div className="container">
          <h1>Soru-Cevap & Tartışmalar</h1>
          <p>Çözemediğin soruları sor, deneyimlerini paylaş, diğer üniversitelilerle yardımlaş.</p>
          <div className="header-actions">
            <button className="btn btn-primary mt-4" onClick={() => setModalOpen(true)}>
              <PenTool size={18} /> Yeni Soru Sor
            </button>
          </div>
        </div>
      </div>
      
      <div className="container d-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="discussions-feed animate-fade-in" key={activeTab}>
          {(() => {
            let filtered = [...questions];
            if (activeTab === 'En Yeniler') {
              filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (activeTab === 'Trend Olanlar') {
              filtered.sort((a, b) => b.likes - a.likes);
            } else if (activeTab === 'Çözülmemiş') {
              filtered = filtered.filter(q => q.comments === 0);
            }

            if (filtered.length === 0) {
              return <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>Bu kategoride henüz soru yok.</div>;
            }

            return filtered.map(q => (
              <DiscussionCard 
                key={q.id}
                user={q.author} 
                university={q.university || 'Bilinmeyen Kampüs'} 
                time={new Date(q.date).toLocaleDateString('tr-TR')}
                question={q.title + " - " + q.content}
                tags={[q.type, q.comments === 0 ? 'yeni' : 'çözülüyor']} 
                likes={q.likes || 0} 
                comments={q.comments || 0}
              />
            ));
          })()}
        </div>
      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Discussions;
