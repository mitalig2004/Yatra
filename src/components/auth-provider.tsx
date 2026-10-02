"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type PrototypeUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: PrototypeUser | null;
  ready: boolean;
  signUp: (name: string, email: string) => void;
  logIn: (email: string) => void;
  logOut: () => void;
};

const AUTH_KEY = "yatra-auth-v1";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PrototypeUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PrototypeUser;
        if (parsed.name?.trim() && parsed.email?.includes("@")) setUser(parsed);
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
    setReady(true);
  }, []);

  const persist = (next: PrototypeUser | null) => {
    setUser(next);
    if (next) localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    else localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        signUp: (name, email) => persist({ name: name.trim(), email: email.trim() }),
        logIn: (email) => {
          let existing: PrototypeUser | null = null;
          try {
            existing = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
          } catch {
            existing = null;
          }
          persist({
            name: existing?.name?.trim() || "Mitali",
            email: email.trim(),
          });
        },
        logOut: () => persist(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthProvider required");
  return context;
}
