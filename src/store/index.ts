import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthActions, AuthState, authSlice } from './slices/auth';

type GermanStore = AuthState & AuthActions;

const useGermanStore = create<GermanStore>()(
  devtools(
    persist((set) => authSlice(set), {
      name: 'german-storage',
      // the Firebase SDK keeps the session; only the profile and theme are cached here
      partialize: (state) => ({ user: state.user, darkMode: state.darkMode }),
    })
  )
);

export default useGermanStore;
