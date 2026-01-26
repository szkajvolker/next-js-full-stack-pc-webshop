import { create } from "zustand";

interface DarkModeState {
  darkMode: boolean | undefined;
  init: () => void;
  toggle: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: undefined,

  init: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("darkMode");
    const value =
      saved !== null
        ? saved === "true"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("darkMode", value.toString());

    set({ darkMode: value });
  },

  toggle: () => {
    set((state) => {
      const value = !state.darkMode;
      document.documentElement.classList.toggle("dark", value);
      localStorage.setItem("darkMode", value.toString());

      return { darkMode: value };
    });
  },
}));
