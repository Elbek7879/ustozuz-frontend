"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  getMe,
  ApiError,
  type ApiUser,
} from "@/lib/api";

type AuthContextType = {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("ustozuz_token");
    if (!savedToken) {
      setLoading(false);
      return;
    }

    getMe(savedToken)
      .then((u) => {
        setToken(savedToken);
        setUser(u);
      })
      .catch((err) => {
        // Token yaroqsiz yoki foydalanuvchi bloklangan/o'chirilgan bo'lsa chiqaramiz.
        // Backend vaqtincha javob bermasa, token saqlanib qoladi.
        if (err instanceof ApiError && [401, 403, 404].includes(err.status)) {
          localStorage.removeItem("ustozuz_token");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function saveSession(newToken: string, newUser: ApiUser) {
    localStorage.setItem("ustozuz_token", newToken);
    setToken(newToken);
    setUser(newUser);
  }

  async function login(email: string, password: string) {
    const res = await loginRequest({ email, password });
    saveSession(res.token, res.user);
  }

  async function register(name: string, email: string, password: string) {
    const res = await registerRequest({ name, email, password });
    saveSession(res.token, res.user);
  }

  function logout() {
    localStorage.removeItem("ustozuz_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak");
  return ctx;
}

export { ApiError };