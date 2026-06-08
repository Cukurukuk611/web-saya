import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Lang } from '../types';
import { getLang, setLang as storeLang } from '../store';

const LangContext = createContext<{ lang: Lang; toggleLang: () => void }>({
  lang: 'id',
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getLang());

  useEffect(() => {
    storeLang(lang);
  }, [lang]);

  const toggleLang = () => {
    setLangState(prev => (prev === 'id' ? 'en' : 'id'));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
