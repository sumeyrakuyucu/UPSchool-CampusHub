# 🛠️ Teknik Yığın (Tech Stack)

Bu proje, modern ve hızlı bir kullanıcı deneyimi sunmak için aşağıdaki teknolojilerle inşa edilmiştir:

## 🌐 Frontend: React (Vite)
*   **Neden?** Vite'ın sunduğu ultra hızlı geliştirme (HMR) ve React'in bileşen tabanlı yapısı, projenin modüler ve ölçeklenebilir olmasını sağlar.

## 🎨 Tasarım & Stil: Vanilla CSS
*   **Neden?** "Soft" renk paletini, cam efekti (glassmorphism) geçişlerini ve özel mikro-animasyonları kısıtlama olmadan tam kontrolle uygulamak için harici kütüphaneler yerine saf CSS tercih edilmiştir.

## 🛠️ Kütüphaneler ve Araçlar
*   **Lucide React:** Modern, şık ve tutarlı bir ikon seti için.
*   **React Router DOM:** Sayfalar arası akıcı ve SPA uyumlu navigasyon yönetimi için.
*   **React Hot Toast:** Kullanıcı eylemlerine (indirme, kaydetme, hata vb.) anlık ve zarif bildirimler vermek için.

## 🚀 Mimari Kararlar
*   **AI Integration:** Platforma özel "Hubie" asistanı, asenkron mesajlaşma yapısı ve dinamik yanıt simülasyonu ile entegre edilmiştir. Gelecekte gerçek bir LLM (Gemini, GPT vb.) API'sına bağlanmaya hazırdır.
*   **Modular CSS:** Her bileşen için ayrı CSS dosyaları (Navbar.css, Home.css, AiAssistant.css vb.) kullanılarak stil izolasyonu sağlanmıştır.
*   **State Management:** Bildirimler, modal durumları ve beğeni sayıları gibi dinamik veriler React hooks (`useState`, `useEffect`) ile yönetilmiştir.
