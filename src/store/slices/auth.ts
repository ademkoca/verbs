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
};

interface IState {
  user: IUser;
}
type SetFunction<T> = (updater: (prev: T) => T) => void;
export const authSlice = (set: SetFunction<IState>) => ({
  ...initialAuthState,
  login: (user: IUser) =>
    set(() => {
      return { ...initialAuthState, user };
    }),
  // updateToken: (token: string) => {
  //   set((state: IState) => ({ ...state, token: token }));
  // },

  logout: () =>
    set((state: IState) => {
      return { ...state, user: null };
    }),

  updateUser: (user: IUser) => {
    set((state: IState) => ({ ...state, user }));
  },
  // debugLogin: () =>
  //   set((state: IState) => ({
  //     ...state,
  //     user: {
  //       id: '1',
  //       firstName: 'Adem',
  //       lastName: 'Koca',
  //       username: 'ademkoca',
  //       email: 'aademkocaa@gmail.com',
  //     },
  //   })),
});
