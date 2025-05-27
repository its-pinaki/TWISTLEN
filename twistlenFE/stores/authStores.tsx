import { create } from "zustand";

interface AuthState {
  authMode: "login" | "signup" | "changePassword" | "forgotPassword";
  setAuthMode: (mode: "login" | "signup" | "changePassword" | "forgotPassword") => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // ✅ Default state
  authMode: "login",

  // ✅ Actions
  setAuthMode: (mode) => set({ authMode: mode }),
}));
