import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export type HistoryItem = {
  id: number;
  code: string;
  language: string;
  explanation: string;
  timestamp: string;
};

export type UserMe = {
  id: string | number;
  name: string;
  email: string;
  profileImage?: string | null;
};

export type Settings = {
  apiBaseUrl: string;
  theme: "dark" | "light";
  providerKey?: string;
  aiModel?: string;
  compactMode?: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  theme: "dark",
  aiModel: "GPT-4",
  compactMode: false,
};

type AppContextType = {
  user: UserMe | null;
  setUser: (u: UserMe | null) => void;
  fetchUser: () => Promise<void>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
  axiosConfig: AxiosRequestConfig;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserMe | null>(null);
  const [settings, setSettings] = useState<Settings>(() => {
    const s = localStorage.getItem("cn_settings");
    return s ? (JSON.parse(s) as Settings) : DEFAULT_SETTINGS;
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const s = localStorage.getItem("explanationHistory");
    return s ? (JSON.parse(s) as HistoryItem[]) : [];
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem("cn_settings", JSON.stringify(settings));
    if (settings.theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [settings]);

  // Persist history
  useEffect(() => {
    localStorage.setItem("explanationHistory", JSON.stringify(history));
  }, [history]);

  const axiosConfig = useMemo<AxiosRequestConfig>(() => {
    const token = localStorage.getItem("token");
    return {
      baseURL: settings.apiBaseUrl,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    };
  }, [settings.apiBaseUrl]);

  // Fetch user
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(`${settings.apiBaseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data as UserMe);
    } catch (err) {
      console.error("❌ fetchUser failed:", err);
      setUser(null);
    }
  }, [settings.apiBaseUrl]);

  // Auto-fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser();
  }, [fetchUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        settings,
        setSettings,
        history,
        setHistory,
        axiosConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
