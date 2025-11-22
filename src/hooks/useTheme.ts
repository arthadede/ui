'use client';

import { useThemeContext } from '../contexts/ThemeContext';

/**
 * Hook for accessing theme state and controls
 *
 * @returns {Object} Theme state and controls
 * @returns {Theme} theme - Current theme setting ('light' | 'dark' | 'system')
 * @returns {'light' | 'dark'} resolvedTheme - The actual resolved theme (for system preference)
 * @returns {(theme: Theme) => void} setTheme - Function to change theme
 */
export function useTheme() {
  const { theme, resolvedTheme, setTheme } = useThemeContext();
  return { theme, resolvedTheme, setTheme };
}

/**
 * Hook for getting just the current resolved theme (for components that only need to know light/dark)
 *
 * @returns {'light' | 'dark'} The current resolved theme
 */
export function useResolvedTheme() {
  const { resolvedTheme } = useThemeContext();
  return resolvedTheme;
}