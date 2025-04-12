import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PageState {
  count: number;
  isLoading: any;
  pages: any; // You can replace `any` with a more specific type if you have one
  darkMode: boolean;
  increment: () => void;
  setIsLoading: (isLoading: any) => void;
  setPages: (pages: any) => void; // Replace `any` with the specific type if available
  toggleDarkMode: () => void;
}

// Define the store with persist
export const usePageStore = create<PageState>((set) => ({
  // ✅ State values
  count: 0,
  isLoading: null,
  pages: [],
  darkMode: false,

  // ✅ Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setPages: (pages) => set({ pages }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
