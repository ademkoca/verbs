import { Progress } from '../../types/interfaces';

export type IUser = {
  address: string;
  country: string;
  createdAt: string;
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  milestones: {
    five: boolean;
    twenty: boolean;
    fifty: boolean;
  };
  phone: string;
  profilePicture: string;
  progress: Progress[];
  state: string;
  subscribed: {
    weeklyNewsletter: boolean;
    productUpdates: boolean;
  };
  updatedAt: string;
  username: string;
  zip: string;
  __v: number;
  _id: string;
} | null;

const initialAuthState = {
  user: null,
  token: null,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  locale: 'en',
};

interface IState {
  user: IUser;
  token: string | null;
  darkMode: boolean;
  locale: string;
}
type SetFunction<T> = (updater: (prev: T) => T) => void;
export const authSlice = (set: SetFunction<IState>) => ({
  ...initialAuthState,
  login: (user: IUser, token: string, locale: string) =>
    set(() => {
      return { ...initialAuthState, user, token, locale };
    }),
  updateToken: (token: string) => {
    set((state: IState) => ({ ...state, token: token }));
  },

  logout: () =>
    set((state: IState) => {
      return { ...state, user: null, token: null };
    }),

  updateUser: (user: IUser) => {
    set((state: IState) => ({ ...state, user }));
  },
  setDarkMode: (darkMode: boolean) =>
    set((state: IState) => {
      return { ...state, darkMode };
    }),
  setLocale: (locale: string) =>
    set((state: IState) => {
      return { ...state, locale };
    }),
});
