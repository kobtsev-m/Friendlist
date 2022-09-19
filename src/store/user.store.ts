import { User } from '../types/api';
import create from 'zustand';
import { Roles } from '../types/roles';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: () => boolean;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  isAdmin: () => {
    const { user } = get();
    return !!user?.roles.find(({ value }) => value === Roles.Admin);
  }
}));
