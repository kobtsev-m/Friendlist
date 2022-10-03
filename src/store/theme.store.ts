import { RootStore } from './root.store';
import { makeAutoObservable } from 'mobx';
import { AppTheme, darkTheme, lightTheme } from '../config/theme.config';
import {
  getSidebarOpenFromLocalStorage,
  getThemeModeFromLocalStorage,
  setSidebarOpenInLocalStorage,
  setThemeModeInLocalStorage
} from '../utils/theme.utils';

export class ThemeStore {
  theme = getThemeModeFromLocalStorage() ?? AppTheme.Dark;
  isSidebarOpen = getSidebarOpenFromLocalStorage();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  toggleTheme() {
    this.theme = this.theme === AppTheme.Dark ? AppTheme.Light : AppTheme.Dark;
    setThemeModeInLocalStorage(this.theme);
  }
  getThemeStyles() {
    return this.theme === AppTheme.Dark ? darkTheme : lightTheme;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    setSidebarOpenInLocalStorage(false);
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    setSidebarOpenInLocalStorage(this.isSidebarOpen);
  }
}
