"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "seeker" | "employer";
  company?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email?: string, name?: string, company?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("skillforz_auth");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (
    email = "sachithra.w@gmail.com",
    name = "Sachithra Weerasinghe",
    company = "Dialog Axiata PLC"
  ) => {
    const isEmployer =
      email.includes("dialog") ||
      email.includes("hire") ||
      email.includes("recruiter") ||
      email.includes("employer") ||
      !!company;

    const newUser: AuthUser = {
      id: isEmployer ? "user-emp-01" : "user-seeker-01",
      name: isEmployer ? name || "Dialog Talent Acquisition" : name || "Sachithra Weerasinghe",
      email,
      avatar: isEmployer
        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      role: isEmployer ? "employer" : "seeker",
      company: isEmployer ? company || "Dialog Axiata PLC" : undefined,
    };

    setUser(newUser);
    try {
      localStorage.setItem("skillforz_auth", JSON.stringify(newUser));
    } catch {
      // ignore storage errors
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("skillforz_auth");
    } catch {
      // ignore storage errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
