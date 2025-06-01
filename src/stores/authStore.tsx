import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist((set) => ({
      token: null,
      isLoggedIn: false,
      login: (token) => set({ token, isLoggedIn: true }),
      logout: () => set({ token: null, isLoggedIn: false }),
    }),{
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return Promise.resolve(str ? JSON.parse(str) : null);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
          return Promise.resolve();
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        },
      },
    }
  )
);

