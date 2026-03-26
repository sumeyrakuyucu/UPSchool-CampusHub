import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import { Filter, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';
import './Resources.css';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All'); // 'All', 'not', 'cikmis', 'ozet'
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const { resources } = useData();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Aramak için bir şey yazın.');
      return;
    }
    toast.loading(`"${searchQuery}" sonuçları getiriliyor...`, { duration: 1000 });
  };

  return (
    <div className="resources-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Tüm Kaynaklar</h1>
          <p>Binlerce ders notu, özet ve çıkmış soru arasından ihtiyacın olanı bul.</p>
        </div>
      </div>
      
      <div className="container resources-container">
        <aside className="filters-sidebar">
          <div className="filter-card">
            <h3 className="filter-title"><Filter size={18} /> Filtreler</h3>
            
            <div className="filter-section">
              <h4>Kategori</h4>
              <label className="checkbox-label">
                <input type="radio" name="type" checked={selectedType === 'All'} onChange={() => setSelectedType('All')} /> Tüm Kaynaklar
              </label>
              <label className="checkbox-label">
                <input type="radio" name="type" checked={selectedType === 'not'} onChange={() => setSelectedType('not')} /> Ders Notu
              </label>
              <label className="checkbox-label">
                <input type="radio" name="type" checked={selectedType === 'cikmis'} onChange={() => setSelectedType('cikmis')} /> Çıkmış Soru
              </label>
            </div>
            
            <div className="filter-section">
              <h4>Üniversite</h4>
              <select 
                className="filter-select" 
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                <option value="All">Tüm Üniversiteler</option>
                <option value="İTÜ">İTÜ</option>
                <option value="ODTÜ">ODTÜ</option>
                <option value="Boğaziçi Üniv.">Boğaziçi Üniv.</option>
                <option value="Hacettepe Üniv.">Hacettepe Üniv.</option>
              </select>
            </div>
          </div>
        </aside>
        
        <main className="resources-main">
          <div className="view-controls">
            <div className="search-box sm-search" style={{ flex: 1 }}>
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Not veya soru ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.8rem' }} onClick={handleSearch}>Ara</button>
            </div>
          </div>
          
          <div className="resources-list">
            {(() => {
              let filtered = resources.filter(r => {
                const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     r.author.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesType = selectedType === 'All' || r.type === selectedType;
                const matchesUniv = selectedUniversity === 'All' || r.university === selectedUniversity;
                
                return matchesSearch && matchesType && matchesUniv;
              });
              
              filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

              if (filtered.length === 0) {
                return (
                  <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', opacity: 0.6, width: '100%' }}>
                    Aradığınız kriterlere uygun kaynak bulunamadı.
                  </div>
                );
              }

              return filtered.map(r => (
                <ResourceCard 
                  key={r.id}
                  title={r.title} 
                  category={r.type === 'not' ? 'Ders Notu' : r.type === 'cikmis' ? 'Çıkmış Soru' : 'Özet'}
                  university={r.university || 'Bilinmeyen Kampüs'} 
                  downloads={r.downloads || '0'} 
                  date={new Date(r.date).toLocaleDateString('tr-TR')} 
                  author={r.author} 
                  content={r.content}
                />
              ));
            })()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resources;
