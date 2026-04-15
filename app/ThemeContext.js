import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  dark: {
    id: 'dark',
    bg: '#111',
    card: '#1a1a1a',
    card2: '#2a2a2a',
    texte: '#fff',
    texteSous: '#aaa',
    texteFaible: '#555',
    bordure: '#2a2a2a',
    accent: '#E63946',
    tabBar: '#111',
    tabBordure: '#222',
    inputBg: '#1a1a1a',
    inputBordure: '#2a2a2a',
  },
  light: {
    id: 'light',
    bg: '#f5f5f5',
    card: '#fff',
    card2: '#f0f0f0',
    texte: '#111',
    texteSous: '#555',
    texteFaible: '#999',
    bordure: '#e0e0e0',
    accent: '#E63946',
    tabBar: '#fff',
    tabBordure: '#e0e0e0',
    inputBg: '#fff',
    inputBordure: '#e0e0e0',
  },
};

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('dark');
  const theme = THEMES[themeId];

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}