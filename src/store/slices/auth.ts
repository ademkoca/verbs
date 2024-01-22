import { Progress } from '../../types/interfaces';

export type IUser = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  zip: string;
  progress: Progress[];
  createdAt: string;
  updatedAt: string;
  __v: number;
} | null;

const initialAuthState = {
  user: null,
  token: null,
  darkMode: !!window.matchMedia('(prefers-color-scheme: dark)'),
};

interface IState {
  user: IUser;
  token: string | null;
  darkMode: boolean;
}
type SetFunction<T> = (updater: (prev: T) => T) => void;
export const authSlice = (set: SetFunction<IState>) => ({
  ...initialAuthState,
  login: (user: IUser, token: string) =>
    set(() => {
      return { ...initialAuthState, user, token };
    }),
  updateToken: (token: string) => {
    set((state: IState) => ({ ...state, token: token }));
  },

  logout: () =>
    set((state: IState) => {
      return { ...state, user: null };
    }),

  updateUser: (user: IUser) => {
    set((state: IState) => ({ ...state, user }));
  },
  setDarkMode: (darkMode: boolean) =>
    set((state: IState) => {
      return { ...state, darkMode };
    }),
});
