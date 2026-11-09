import { useEffect, useCallback } from 'react';

export type Theme = 'light';

const THEME_STORAGE_KEY = 'whop_roofing_theme';

export function getInitialTheme(): Theme {
  return 'light';
}

export function applyThemeToDocument(_theme?: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('dark');
  root.classList.add('light');
  root.setAttribute('data-theme', 'light');
  root.style.colorScheme = 'light';
}

export function useTheme() {
  // Enforce light theme in DOM and storage
  useEffect(() => {
    applyThemeToDocument('light');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      localStorage.setItem('theme', 'light');
    } catch (e) {
      // LocalStorage might be restricted
    }
  }, []);

  const toggleTheme = useCallback(() => {
    // No-op: strictly light theme
  }, []);

  const setTheme = useCallback((_newTheme: string) => {
    // No-op: strictly light theme
  }, []);

  return { theme: 'light' as const, toggleTheme, setTheme, isDark: false };
}
