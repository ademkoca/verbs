import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser, authSlice } from './slices/auth';

interface GermanStore {
  user: IUser;
  login: (user: IUser) => void;
  logout: () => void;
  debugLogin: () => void;
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
