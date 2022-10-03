import { AppTheme } from '../config/theme.config';

const THEME_KEY = 'theme_mode';
const SIDEBAR_OPEN_KEY = 'sidebar_open';

export const setThemeModeInLocalStorage = (theme: AppTheme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemeModeFromLocalStorage = () => {
  return <AppTheme | null>localStorage.getItem(THEME_KEY);
};

export const setSidebarOpenInLocalStorage = (isOpen: boolean) => {
  localStorage.setItem(SIDEBAR_OPEN_KEY, String(isOpen));
};

export const getSidebarOpenFromLocalStorage = () => {
  return localStorage.getItem(SIDEBAR_OPEN_KEY) === 'true';
};
