document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://libretranslate.com/translate"; // bản chính thức, có CORS
    const cachePrefix = "translation_cache_";
    const langMap = { JP: "ja", EN: "en", KR: "ko", CN: "zh", TW: "zh", TH: "th" };
  
    async function translateBatch(texts, targetLang) {
      const target = langMap[targetLang] || "en";
      const results = [];
  
      for (const text of texts) {
        const cacheKey = `${cachePrefix}${target}_${text}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          results.push(cached);
          continue;
        }
  
        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: text,
              source: "ja",
              target: target,
              format: "text"
            }),
          });
  
          const data = await res.json();
          const translated = data.translatedText || text;
          localStorage.setItem(cacheKey, translated);
          results.push(translated);
        } catch (err) {
          console.error("Translation error:", err);
          results.push(text);
        }
      }
  
      return results;
    }
  
    async function translatePage(targetLang) {
      const main = document.querySelector("main");
      if (!main) return;
  
      // chọn phần tử cần dịch
      const elements = Array.from(
        main.querySelectorAll("h1,h2,h3,h4,h5,h6,p,button,div.menuName,div.drinkName,div.name,span,a")
      ).filter(el => {
        if (!el.textContent.trim()) return false;
        if (el.closest("header") || el.closest(".lang-selector")) return false;
        return true;
      });
  
      const originals = elements.map(el => {
        if (!el.dataset.originalText) el.dataset.originalText = el.textContent.trim();
        return el.dataset.originalText;
      });
  
      const translations = await translateBatch(originals, targetLang);
  
      elements.forEach((el, i) => {
        el.textContent = translations[i];
      });
    }
  
    window.translatePage = translatePage;
  });
  