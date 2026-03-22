const https = require('https');

// GÜVENLİK NOTU: API anahtarınızı buraya ASLA sabit olarak yazmayın! (Hardcoding)
// Bu betiği (.env içindeki anahtarla) güvenli çalıştırmak için:
// 1. `dotenv` paketini kullanın
// 2. VEYA terminalde: `set VITE_GEMINI_API_KEY=your_key && node test-ai.cjs` çalıştırın.
const API_KEY = process.env.VITE_GEMINI_API_KEY || "";
if (!API_KEY) {
    console.error("HATA: VITE_GEMINI_API_KEY bulunamadı. Lütfen çevre değişkenlerini kontrol edin.");
    process.exit(1);
}

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    const parsed = JSON.parse(data);
    if (parsed.error) {
        console.error("API Error Detail:", JSON.stringify(parsed.error, null, 2));
    } else {
        console.log("Available Models Found!");
        if (parsed.models) {
            parsed.models.forEach(m => console.log("- " + m.name));
        } else {
            console.log("No models listed in response.");
        }
    }
  });
}).on('error', (err) => {
  console.error("HTTPS Error:", err.message);
});
