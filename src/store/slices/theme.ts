export interface IDarkModeState {
  darkMode: boolean;
}
const initialDarkModeState = {
  darkMode: false,
};
type SetFunction<T> = (updater: (prev: T) => T) => void;
export const themeSlice = (set: SetFunction<IDarkModeState>) => ({
  setDarkMode: (darkMode: boolean) =>
    set(() => {
      return { ...initialDarkModeState, darkMode };
    }),
});
