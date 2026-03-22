# 🚀 CampusHub

## Problem
Üniversite öğrencilerinin derslerde yetersiz kaldığı anlarda veya sınav dönemlerinde kaliteli, düzenli ve güvenilir akademik kaynaklara ulaşma zorluğu yaşaması. Bilgilerin farklı platformlarda dağınık olması ve yalnız çalışırken odaklanma sorunu çekilmesi.

## Çözüm
CampusHub, öğrencilerin ders notlarını paylaştığı ve birlikte çalıştığı modern bir ekosistemdir. Uygulama içerisinde yer alan AI Asistanı **Hubie**, kullanıcılara anlık yanıtlar vererek, doğru kaynaklara yönlendirerek ve akademik kavramları açıklayarak rehberlik rolü üstlenir.

## Canlı Demo
**Yayın Linki:** [CampusHub Canlı Demo](https://tangerine-platypus-4cc9e2.netlify.app/)  
**Demo Video:** [Projenin Kullanım Videosu (Loom/YouTube)](https://youtube.com)  
*(Not: Bu bir prototiptir, linkler temsilidir.)*

## Kullanılan Teknolojiler
- **Frontend:** React (Vite)
- **Stil:** Vanilla CSS (Glassmorphism & Mikro-animasyonlar)
- **AI:** Google Gemini API (@google/generative-ai)
- **İkonlar:** Lucide React
- **Navigasyon:** React Router DOM
- **Bildirimler:** React Hot Toast

## Nasıl Çalıştırılır?

1.  **Bağımlılıkları Kurun:**
    ```bash
    npm install
    ```
2.  **API Anahtarını Ayarlayın:**
    `.env.example` dosyasını `.env` olarak kopyalayın ve içine kendi `VITE_GEMINI_API_KEY` anahtarınızı ekleyin.
3.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
4.  **Tarayıcıda Açın:**
    https://tangerine-platypus-4cc9e2.netlify.app/ 
