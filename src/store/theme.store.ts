import create from 'zustand';
import { AppTheme } from '../config/theme.config';

interface ThemeState {
  theme: AppTheme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: AppTheme.Dark,
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === AppTheme.Dark ? AppTheme.Light : AppTheme.Dark }));
  }
}));
