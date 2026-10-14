import { createContext, useContext } from 'react';

// Kept apart from the provider so editing text or the provider never replaces
// the context object while the page is running.
export const LanguageContext = createContext(null);

export const useLang = () => useContext(LanguageContext);
