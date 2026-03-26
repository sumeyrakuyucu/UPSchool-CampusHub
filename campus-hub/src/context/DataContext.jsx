import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    const savedResources = localStorage.getItem('resources');
    
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      // Seed questions
      const initialQuestions = [
        { id: 'q1', author: 'Yazilimci123', university: 'Boğaziçi Üniv.', date: new Date(Date.now() - 3600000).toISOString(), title: 'Algoritma Dersi', content: 'Algoritma dersinde Dinamik Programlama konusunu bir türlü oturtamadım. Önerebileceğiniz bir kaynak veya çalışma taktiği var mı?', type: 'tavsiye', likes: 24, comments: 5 },
        { id: 'q2', author: 'CananT', university: 'Hacettepe Üniv.', date: new Date(Date.now() - 10800000).toISOString(), title: 'Anatomi Pratik', content: 'Tıp 1. Sınıf anatomi laboratuvar sınavı için pratik ipuçlarınız nelerdir? Kemik ezberlerken hangi yöntemleri kullandınız?', type: 'tavsiye', likes: 42, comments: 12 },
        { id: 'q3', author: 'EconStudent', university: 'Koç Üniv.', date: new Date(Date.now() - 18000000).toISOString(), title: 'Mikroekonomi', content: 'Mikroekonomi dersinde arz-talep eğrilerinde esneklik konusundaki bu integralli çözümü bir türlü anlayamadım. Yardımcı olabilecek var mı?', type: 'soru', likes: 8, comments: 3 }
      ];
      setQuestions(initialQuestions);
      localStorage.setItem('questions', JSON.stringify(initialQuestions));
    }

    if (savedResources) {
      setResources(JSON.parse(savedResources));
    } else {
      // Seed resources
      const initialResources = [
        { id: 'r1', title: 'Calculus 1 - Vize Hazırlık (Konu Özeti)', type: 'not', university: 'İTÜ', downloads: '1.2k', date: new Date(Date.now() - 172800000).toISOString(), author: 'matematikci' },
        { id: 'r2', title: 'Fizik 101 - Son 5 Yıl Çıkmış Sorular', type: 'cikmis', university: 'ODTÜ', downloads: '850', date: new Date(Date.now() - 604800000).toISOString(), author: 'fizik_ustasi' },
        { id: 'r3', title: 'Lineer Cebir - Tam Dönem Ders Notları', type: 'not', university: 'Boğaziçi Üniv.', downloads: '2.1k', date: new Date(Date.now() - 1814400000).toISOString(), author: 'ali_k' }
      ];
      setResources(initialResources);
      localStorage.setItem('resources', JSON.stringify(initialResources));
    }
  }, []);

  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      comments: 0,
      likes: 0,
      university: question.university || 'Bilinmeyen Kampüs'
    };
    const updated = [newQuestion, ...questions];
    setQuestions(updated);
    localStorage.setItem('questions', JSON.stringify(updated));
  };

  const addResource = (resource) => {
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      downloads: 0,
      university: resource.university || 'Bilinmeyen Kampüs'
    };
    const updated = [newResource, ...resources];
    setResources(updated);
    localStorage.setItem('resources', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider value={{ questions, resources, addQuestion, addResource }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
