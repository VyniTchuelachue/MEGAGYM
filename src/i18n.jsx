import { useEffect, useMemo, useState } from 'react';
import fr from './content/fr.js';
import en from './content/en.js';
import { LanguageContext } from './lang.js';

const content = { fr, en };
const STORAGE_KEY = 'megagym.lang';

function savedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved in content) return saved;
  } catch {
    // Storage can be unavailable (private mode); French stays the default.
  }
  return 'fr';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(savedLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Nothing to do: the choice just won't be remembered.
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
