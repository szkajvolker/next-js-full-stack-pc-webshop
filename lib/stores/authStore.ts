/**
 * Authentication Zustand store
 * Manages user authentication state and drawer visibility
 * Handles login, registration, and logout with mock API calls
 */
"use client";

import { create } from "zustand";
import { User, AuthState } from "@/types/user";

interface AuthStore extends AuthState {
  isOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  openLogin: () => void;
  closeLogin: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  isOpen: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Real API call will be implemented later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        _id: "1",
        name: "Test User",
        email: email,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set({
        user: mockUser,
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Login failed",
        isLoading: false,
      });
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Real API call will be implemented later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        _id: "2",
        name: name,
        email: email,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set({
        user: mockUser,
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Registration failed",
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      isLoggedIn: false,
      error: null,
    });
  },

  openLogin: () => {
    set({ isOpen: true });
  },

  closeLogin: () => {
    set({ isOpen: false });
  },

  clearError: () => {
    set({ error: null });
  },
}));
