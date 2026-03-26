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
          {activeTab === 'En Yeniler' ? (
            <>
              {questions.map(q => (
                <DiscussionCard 
                  key={q.id}
                  user={q.author} university="Senin Kampüsün" time="Az önce"
                  question={q.title + " - " + q.content}
                  tags={[q.type, 'yeni']} likes={0} comments={0}
                />
              ))}
              <DiscussionCard 
                user="YeniKullanici" university="Gazi Üniv." time="5 dakika önce"
                question="Programlamaya yeni başlıyorum, Python mu öğrenmeliyim C mi? Üniversitemizdeki hocalar C ile başlatıyor ama internet Python diyor."
                tags={['programlama', 'tavsiye', 'yeni']} likes={3} comments={0}
              />
              <DiscussionCard 
                user="MuhendisBey" university="Yıldız Teknik Üniv." time="Dün"
                question="Bitirme projesi için React mı yoksa Vue mü tercih etmeliyim? Projenin kapsamı oldukça geniş ve ölçeklenebilir olması gerekiyor."
                tags={['yazılım', 'frontend', 'proje']} likes={56} comments={34}
              />
            </>
          ) : activeTab === 'Çözülmemiş' ? (
            <>
              {questions.map(q => (
                <DiscussionCard 
                  key={q.id}
                  user={q.author} university="Senin Kampüsün" time="Az önce"
                  question={q.title + " - " + q.content}
                  tags={[q.type, 'soru']} likes={0} comments={0}
                />
              ))}
              <DiscussionCard 
                user="EconStudent" university="Koç Üniv." time="5 saat önce"
                question="Mikroekonomi dersinde arz-talep eğrilerinde esneklik konusundaki bu integralli çözümü bir türlü anlayamadım. Yardımcı olabilecek var mı?"
                tags={['ekonomi', 'mikroekonomi', 'soru']} likes={8} comments={3}
              />
            </>
          ) : (
            <>
              {questions.map(q => (
                <DiscussionCard 
                  key={q.id}
                  user={q.author} university="Senin Kampüsün" time="Az önce"
                  question={q.title + " - " + q.content}
                  tags={[q.type]} likes={0} comments={0}
                />
              ))}
              <DiscussionCard 
                user="Yazilimci123" university="Boğaziçi Üniv." time="1 saat önce"
                question="Algoritma dersinde Dinamik Programlama konusunu bir türlü oturtamadım. Önerebileceğiniz bir kaynak veya çalışma taktiği var mı?"
                tags={['algoritma', 'cs101', 'tavsiye']} likes={24} comments={5}
              />
              <DiscussionCard 
                user="CananT" university="Hacettepe Üniv." time="3 saat önce"
                question="Tıp 1. Sınıf anatomi laboratuvar sınavı için pratik ipuçlarınız nelerdir? Kemik ezberlerken hangi yöntemleri kullandınız?"
                tags={['tıp', 'anatomi', 'tavsiye']} likes={42} comments={12}
              />
            </>
          )}
        </div>
      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Discussions;
