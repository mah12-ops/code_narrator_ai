import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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
};

export type Settings = {
  apiBaseUrl: string;
  theme: "dark" | "light";
  providerKey?: string;
};

const DEFAULT_SETTINGS: Settings = {
  apiBaseUrl: "http://localhost:8080",
  theme: "dark",
};

type AppContextType = {
  user: UserMe | null;
  setUser: (u: UserMe | null) => void;
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

  // persist settings
  useEffect(() => {
    localStorage.setItem("cn_settings", JSON.stringify(settings));
    if (settings.theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [settings]);

  // persist history
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

  return (
    <AppContext.Provider value={{ user, setUser, settings, setSettings, history, setHistory, axiosConfig }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
