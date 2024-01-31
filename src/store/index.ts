import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser, authSlice } from './slices/auth';

interface GermanStore {
  user: IUser;
  token: string | null;
  darkMode: boolean;
  login: (user: IUser, token: string) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
  updateToken: (token: string) => void;
  setDarkMode: (value: boolean) => void;
}

const useGermanStore = create<GermanStore>()(
  devtools(
    persist(
      (set) => ({
        ...authSlice(set),
      }),
      {
        name: 'german-storage',
      }
    )
  )
);

export default useGermanStore;
