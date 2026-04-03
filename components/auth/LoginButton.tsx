/**
 * Login/User button component
 * Shows login button when not authenticated, or user name when authenticated
 * Opens login drawer on click
 */
"use client";

import React from "react";
import { useAuthStore } from "@/lib/stores/authStore";

const LoginButton: React.FC = () => {
  const { user, isLoggedIn, openLogin } = useAuthStore();

  return (
    <button
      onClick={openLogin}
      className="flex items-center space-x-2 text-white dark:text-white hover:text-gray-200 dark:hover:text-gray-200 transition-colors cursor-pointer"
    >
      {isLoggedIn && user ? (
        <>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="hidden md:inline">{user.name}</span>
        </>
      ) : (
        <>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="hidden md:inline cursor-pointer">Login</span>
        </>
      )}
    </button>
  );
};

export default LoginButton;
