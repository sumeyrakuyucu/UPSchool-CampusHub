import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import { Filter, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';
import './Resources.css';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { resources } = useData();

  const handleFilterChange = (e) => {
    toast.success(`${e.target.labels?.[0]?.innerText || 'Filtre'} başarıyla uygulandı!`, {
      icon: '✓',
      duration: 1500
    });
  };

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
              <label className="checkbox-label"><input type="checkbox" defaultChecked onChange={handleFilterChange} /> Tüm Kaynaklar</label>
              <label className="checkbox-label"><input type="checkbox" onChange={handleFilterChange} /> Ders Notu</label>
              <label className="checkbox-label"><input type="checkbox" onChange={handleFilterChange} /> Çıkmış Soru</label>
              <label className="checkbox-label"><input type="checkbox" onChange={handleFilterChange} /> Sınav Özeti</label>
            </div>
            
            <div className="filter-section">
              <h4>Üniversite</h4>
              <select className="filter-select" onChange={(e) => toast(`Üniversite seçildi: ${e.target.value}`, { icon: '🏫' })}>
                <option>Tüm Üniversiteler</option>
                <option>İTÜ</option>
                <option>ODTÜ</option>
                <option>Boğaziçi Üniv.</option>
                <option>Hacettepe Üniv.</option>
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
            <select className="filter-select sort-select" onChange={(e) => toast(`Sıralama: ${e.target.value}`, { icon: '🔄' })}>
              <option>En Yeniler</option>
              <option>En Çok İndirilenler</option>
              <option>En Yüksek Puanlılar</option>
            </select>
          </div>
          
          <div className="resources-list">
            {resources.map(r => (
              <ResourceCard 
                key={r.id}
                title={r.title} category={r.type === 'not' ? 'Ders Notu' : 'Çıkmış Soru'}
                university="Senin Kampüsün" downloads="0" date="Az önce" author={r.author} 
              />
            ))}
            <ResourceCard 
              title="Calculus 1 - Vize Hazırlık (Konu Özeti)" category="Ders Notu"
              university="İTÜ" downloads="1.2k" date="2 gün önce" author="matematikci" />
            <ResourceCard 
              title="Fizik 101 - Son 5 Yıl Çıkmış Sorular" category="Çıkmış Soru"
              university="ODTÜ" downloads="850" date="1 hafta önce" author="fizik_ustasi" />
            <ResourceCard 
              title="Lineer Cebir - Tam Dönem Ders Notları" category="Ders Notu"
              university="Boğaziçi Üniv." downloads="2.1k" date="3 hafta önce" author="ali_k" />
            <ResourceCard 
              title="Kimya Laboratuvarı Rapor Örnekleri" category="Ödev/Proje"
              university="Ege Üniv." downloads="420" date="1 ay önce" author="kimyager" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resources;
