"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAuthStore } from "@/lib/stores/authStore";
import { LoginFormData, RegisterFormData } from "@/types/user";

const LoginDrawer: React.FC = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    login,
    register,
    logout,
    isLoading,
    error,
    clearError,
    user,
    isLoggedIn,
    isOpen,
    closeLogin,
  } = useAuthStore();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initial state setup
  useEffect(() => {
    if (drawerRef.current) {
      gsap.set(drawerRef.current, { display: "none" });
    }
  }, []);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current || !contentRef.current)
      return;

    if (isOpen) {
      // Show drawer with animation
      gsap.set(drawerRef.current, { display: "flex" });
      gsap.set(overlayRef.current, { opacity: 0.5 }); // Azonnal félig átlátszó
      gsap.set(contentRef.current, { x: "100%" });

      const tl = gsap.timeline();

      // Már nem kell az overlay opacity animáció, azonnal látszik
      tl.to(
        contentRef.current,
        {
          x: "0%",
          duration: 0.4,
          ease: "power3.out",
        }
      );
    } else {
      // Hide drawer with animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (drawerRef.current) {
            gsap.set(drawerRef.current, { display: "none" });
          }
        },
      });

      tl.to(contentRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1",
      );
    }
  }, [isOpen]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginForm.email, loginForm.password);
    if (isLoggedIn) {
      closeLogin();
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      return; // Passwords don't match
    }
    await register(
      registerForm.name,
      registerForm.email,
      registerForm.password,
    );
    if (isLoggedIn) {
      closeLogin();
    }
  };

  const handleLogout = () => {
    logout();
    closeLogin();
  };

  return (
    <div ref={drawerRef} className="fixed inset-0 z-50 backdrop-blur-2xl">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-neutral-950"
        onClick={closeLogin}
      />

      {/* Login Content */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-y-auto"
      >
        <div className="p-6 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLoggedIn
                ? "Profil"
                : isRegisterMode
                  ? "Registration"
                  : "Login"}
            </h1>
            <button
              onClick={closeLogin}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logged in user */}
          {isLoggedIn && user ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#5200a3] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  My Orders
                </button>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            /* Login/Register Form */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                <button
                  onClick={() => {
                    setIsRegisterMode(false);
                    clearError();
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    !isRegisterMode
                      ? "bg-[#5200a3] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsRegisterMode(true);
                    clearError();
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isRegisterMode
                      ? "bg-[#5200a3] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Registration
                </button>
              </div>

              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {!isRegisterMode ? (
                /* Login Form */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5200a3] dark:bg-gray-700 dark:text-white"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5200a3] dark:bg-gray-700 dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#5200a3] text-white py-3 rounded-lg hover:bg-[#6820b9] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : null}
                    Login
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5200a3] dark:bg-gray-700 dark:text-white"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5200a3] dark:bg-gray-700 dark:text-white"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5200a3] dark:bg-gray-700 dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5200a3] dark:bg-gray-700 dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      registerForm.password !== registerForm.confirmPassword
                    }
                    className="w-full bg-[#5200a3] text-white py-3 rounded-lg hover:bg-[#6820b9] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : null}
                    Registration
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDrawer;
