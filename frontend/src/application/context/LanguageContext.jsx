import { createContext, useContext, useState, useEffect } from "react";
import translations from "../../locales/translations.json";

// Crear el contexto
const TranslationContext = createContext();

// Proveedor del contexto
export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  // Función para traducir
  const t = (key) => {
    return translations[language]?.[key] || key; // Fallback si no existe
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook para usar la traducción en cualquier parte
export function useTranslation() {
  return useContext(TranslationContext);
}
