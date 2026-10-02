import { Progress } from '../../types/interfaces';

export type User = {
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
};
export type IUser = User | null;

export interface AuthState {
  user: IUser;
  darkMode: boolean;
}

export interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setDarkMode: (value: boolean) => void;
}

type SetFunction = (updater: (prev: AuthState) => Partial<AuthState>) => void;

export const authSlice = (set: SetFunction): AuthState & AuthActions => ({
  user: null,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
  updateUser: (user) => set(() => ({ user })),
  setDarkMode: (darkMode) => set(() => ({ darkMode })),
});
