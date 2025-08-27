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

export type PageKey = "Try Narrator" | "History" | "Settings" | "Shortcuts" | "Docs";
