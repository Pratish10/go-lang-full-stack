"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  ID: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  refresh_token: string;
  token: string;
  updated_at: string;
  created_at: string;
}

interface AuthState {
  user: {
    user: User | null;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        user: null,
      },
      isAuthenticated: false,
      isLoading: false,

      login: async (user: User) => {
        set({
          user: user,
          isAuthenticated: true,
        });
      },

      register: async (user: User) => {
        set({
          user: user,
          isAuthenticated: true,
        });
      },

      signOut: () => {
        set({
          user: {
            user: null,
          },
          isAuthenticated: false,
        });
      },

      updateUser: (updatedUser: User) => {
        set({ user: { user: updatedUser } });
      },

      initializeAuth: () => {
        set({ isLoading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
