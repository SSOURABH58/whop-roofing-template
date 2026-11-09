import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = (localStorage.getItem('theme') || localStorage.getItem('whop_roofing_theme')) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {
    // Graceful fallback for restricted environments
  }
  // Default to 'light'
  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Graceful fallback for restricted environments
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' };
}
