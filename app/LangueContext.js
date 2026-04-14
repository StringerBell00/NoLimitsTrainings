import { createContext, useContext, useState } from 'react';
import { TRADUCTIONS } from './translations';

const LangueContext = createContext();

export function LangueProvider({ children }) {
  const [langue, setLangue] = useState('fr');
  const t = TRADUCTIONS[langue];
  return (
    <LangueContext.Provider value={{ langue, setLangue, t }}>
      {children}
    </LangueContext.Provider>
  );
}

export function useLangue() {
  return useContext(LangueContext);
}