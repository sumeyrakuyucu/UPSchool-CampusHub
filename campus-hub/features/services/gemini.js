import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY .env dosyasında bulunamadı veya yüklenemedi!");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export const getGeminiResponse = async (prompt) => {
  if (!API_KEY) {
    return "Hata: API anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin ve terminalde projeyi (npm run dev) yeniden başlatın.";
  }

  // Kullanıcının API listesinde gördüğümüz çalışan modelleri sırasıyla deniyoruz
  const modelsToTry = ["gemini-flash-latest", "gemini-pro-latest", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
  
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const systemInstruction = `
        Sen CampusHub asistanı Hubie'sin. 
        Öğrencilerin akademik asistanısın. Samimi ve yardımcı ol.
      `;

      const result = await model.generateContent(systemInstruction + "\n\nKullanıcı: " + prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.warn(`${modelName} başarısız oldu:`, error.message);
      lastError = error;
      // Kota aşımı (429) veya model bulunamadı (404) durumunda bir sonrakini dene
      continue;
    }
  }

  // Eğer hiçbiri çalışmazsa en son hatayı döndür
  return `Tüm alternatif modeller başarısız oldu. Hata: ${lastError?.message || "Bilinmeyen hata"}. İpucu: API anahtarınızın kotasını AI Studio üzerinden kontrol edebilirsiniz.`;
};
