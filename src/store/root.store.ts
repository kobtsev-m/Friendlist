import { ThemeStore } from './theme.store';
import { UserStore } from './user.store';
import { createContext } from 'react';
import { ChatStore } from './chat.store';

export class RootStore {
  themeStore = new ThemeStore(this);
  userStore = new UserStore(this);
  chatStore = new ChatStore(this);
}

export const StoreContext = createContext(<RootStore>{});
