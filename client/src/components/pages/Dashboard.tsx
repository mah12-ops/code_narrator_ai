import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import type  {AxiosRequestConfig } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiTypescript,
  SiRuby,
  SiOpenjdk,
} from "react-icons/si";
import {
  FiSettings,
  FiBookOpen,
  FiLogOut,
  FiUser,
  FiClock,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiRefreshCcw,
  FiZap,
  FiKey,
  FiHelpCircle,
  FiExternalLink,
  FiCommand,
} from "react-icons/fi";

type HistoryItem = {
  id: number;
  code: string;
  language: string;
  explanation: string;
  timestamp: string;
};

type UserMe = {
  id: string | number;
  name: string;
  email: string;
};

type Settings = {
  apiBaseUrl: string;
  theme: "dark" | "light";
  providerKey?: string; // optional: if you BYO provider to your backend
};

const LANGUAGES = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Python", icon: <SiPython className="text-blue-400" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
  { name: "Java", icon: <SiOpenjdk className="text-red-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-400" /> },
  { name: "Ruby", icon: <SiRuby className="text-pink-500" /> },
] as const;

type PageKey = "Try Narrator" | "History" | "Settings" | "Shortcuts" | "Docs";

const DEFAULT_SETTINGS: Settings = {
  apiBaseUrl: "http://localhost:8080",
  theme: "dark",
};

const cardClass =
  "bg-gray-900/60 rounded-2xl p-6 shadow-xl border border-white/10";

const btnClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold transition";

const Dashboard: React.FC = () => {
  // ---------- App / auth ----------
  const [activePage, setActivePage] = useState<PageKey>("Try Narrator");
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<UserMe | null>(null);

  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem("cn_settings");
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem("cn_settings", JSON.stringify(settings));
    // theme hook
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings]);

  // Axios helper (no header type errors — pass headers inline)
  const axiosConfig = useMemo<AxiosRequestConfig>(() => {
    const token = localStorage.getItem("token");
    return {
      baseURL: settings.apiBaseUrl,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    };
  }, [settings.apiBaseUrl]);

  // Load /me
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("/api/me", axiosConfig);
        setUser(res.data as UserMe);
      } catch {
        // not logged in or token invalid – silently ignore here
      }
    };
    fetchMe();
  }, [axiosConfig]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // optional: clear app state
    setUser(null);
    // redirect if using router
    // navigate("/login");
    alert("Logged out");
  };

  // ---------- Try Narrator ----------
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    if (!code || !language) {
      alert("Please enter both code and language.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/explain",
        { code, language },
        axiosConfig
      );
      const text =
        typeof res.data?.explanation === "string"
          ? res.data.explanation
          : JSON.stringify(res.data);
      setExplanation(text);

      const newEntry: HistoryItem = {
        id: Date.now(),
        code,
        language,
        explanation: text,
        timestamp: new Date().toLocaleString(),
      };
      setHistory((prev) => [newEntry, ...prev]);
    } catch (err: any) {
      console.error("❌ Error fetching explanation:", err?.message || err);
      alert("Failed to explain code.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- History ----------
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Load history
  useEffect(() => {
    const stored = localStorage.getItem("explanationHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);
  // Save history
  useEffect(() => {
    localStorage.setItem("explanationHistory", JSON.stringify(history));
  }, [history]);

  const clearHistory = () => {
    if (!confirm("Clear all history?")) return;
    setHistory([]);
    localStorage.removeItem("explanationHistory");
  };

  const deleteHistoryItem = (id: number) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const restoreToEditor = (item: HistoryItem) => {
    setActivePage("Try Narrator");
    setLanguage(item.language);
    setCode(item.code);
    setExplanation(item.explanation);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyExplanation = async (item: HistoryItem) => {
    try {
      await navigator.clipboard.writeText(item.explanation);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      alert("Copy failed");
    }
  };

  // ---------- Shortcuts modal ----------
  const [showShortcuts, setShowShortcuts] = useState(false);

  // ---------- UI ----------
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-68 bg-gray-950/80 backdrop-blur-xl p-6 flex flex-col gap-6 border-r border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 border border-white/10">
            <FiZap className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-lg font-semibold">CodeNarrator</div>
            <div className="text-xs text-white/50">Ship clarity, faster</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {(
            [
              { key: "Try Narrator", icon: <FiBookOpen /> },
              { key: "History", icon: <FiClock /> },
              { key: "Settings", icon: <FiSettings /> },
              { key: "Shortcuts", icon: <FiCommand /> },
              { key: "Docs", icon: <FiHelpCircle /> },
            ] as { key: PageKey; icon: React.ReactNode }[]
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`flex items-center gap-3 p-3 rounded-xl transition text-sm
              ${
                activePage === item.key
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-white/5 text-white/80"
              }`}
            >
              {item.icon} {item.key}
            </button>
          ))}

          <div className="h-px my-3 bg-white/10" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl transition text-sm hover:bg-white/5 text-red-300"
          >
            <FiLogOut /> Logout
          </button>
        </nav>

        <div className="mt-auto text-xs text-white/40">
          v1.0 • {new Date().getFullYear()}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-gray-950/70">
          <h2 className="text-xl font-semibold">{activePage}</h2>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <FiUser />
              <span className="text-sm">
                {user ? user.name : "Guest User"}
              </span>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-2 w-60 bg-gray-900 rounded-xl shadow-xl border border-white/10 p-2 z-20"
                >
                  <div className="px-3 py-2">
                    <div className="text-sm font-medium">
                      {user ? user.name : "Anonymous"}
                    </div>
                    <div className="text-xs text-white/60">
                      {user ? user.email : "—"}
                    </div>
                  </div>
                  <div className="h-px bg-white/10 my-1" />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setActivePage("Settings");
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FiSettings /> Account Settings
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-red-300"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FiLogOut /> Logout
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pages */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activePage === "Try Narrator" && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Editor */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={cardClass}
              >
                <h1 className="text-2xl font-bold mb-4">
                  💻 Explain & Narrate
                </h1>

                <textarea
                  placeholder="Paste your code here..."
                  rows={12}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-black/40 text-gray-100 p-4 rounded-xl border border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none mb-6 font-mono"
                />

                <h3 className="text-lg font-semibold mb-3">Select Language</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => setLanguage(lang.name)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border 
                        transition-all duration-300 shadow-sm text-xs
                        ${
                          language === lang.name
                            ? "bg-emerald-600 text-white border-emerald-400 scale-105"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                    >
                      <span className="text-2xl mb-1">{lang.icon}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={fetchExplanation}
                    disabled={loading}
                    className={`${btnClass} bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50`}
                  >
                    {loading ? "⏳ Analyzing..." : "⚡ Explain My Code"}
                  </motion.button>

                  <button
                    onClick={() => {
                      setCode("");
                      setExplanation("");
                    }}
                    className={`${btnClass} border border-white/10 bg-white/5 hover:bg-white/10`}
                  >
                    <FiRefreshCcw /> Reset
                  </button>
                </div>
              </motion.div>

              {/* Right: Output */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`${cardClass} flex-1`}
              >
                <h2 className="text-xl font-bold mb-4">🧠 AI Explanation</h2>
                <div className="min-h-[300px] max-h-[60vh] overflow-y-auto bg-black/40 p-4 rounded-xl border border-white/10 text-gray-200 font-mono whitespace-pre-wrap">
                  {explanation
                    ? explanation
                    : "Your explanation will appear here after submitting..."}
                </div>
              </motion.div>
            </div>
          )}

          {activePage === "History" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cardClass}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">📜 History of Explanations</h2>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-sm text-red-300 hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {history.length === 0 ? (
                <p className="text-white/60">
                  No history yet. Run some explanations first.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {history.map((item) => {
                    const isExpanded = expandedId === item.id;
                    const copied = copiedId === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        className="bg-white/5 rounded-xl border border-white/10 p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-white/60">
                            {item.timestamp} — {item.language}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyExplanation(item)}
                              className="p-2 rounded-lg hover:bg-white/10"
                              title="Copy explanation"
                            >
                              {copied ? <FiCheck /> : <FiCopy />}
                            </button>
                            <button
                              onClick={() => deleteHistoryItem(item.id)}
                              className="p-2 rounded-lg hover:bg-white/10 text-red-300"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            setExpandedId(isExpanded ? null : item.id)
                          }
                          className="cursor-pointer"
                        >
                          <p className="font-medium text-gray-200 line-clamp-3">
                            {item.explanation}
                          </p>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 space-y-2"
                            >
                              <div>
                                <p className="text-xs text-white/50 mb-1">
                                  🔑 Full Explanation:
                                </p>
                                <pre className="text-gray-200 text-sm whitespace-pre-wrap bg-black/40 p-2 rounded">
                                  {item.explanation}
                                </pre>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 mb-1">
                                  📄 Original Code:
                                </p>
                                <pre className="bg-black/40 p-2 rounded text-xs text-gray-300 overflow-x-auto">
                                  {item.code}
                                </pre>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => restoreToEditor(item)}
                                  className={`${btnClass} bg-emerald-600 hover:bg-emerald-700`}
                                >
                                  Restore to Editor
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activePage === "Settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${cardClass} max-w-4xl`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiSettings /> Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold mb-3">General</h3>

                  <label className="block text-sm mb-1">API Base URL</label>
                  <input
                    value={settings.apiBaseUrl}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, apiBaseUrl: e.target.value }))
                    }
                    placeholder="http://localhost:8080"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <label className="block text-sm mb-1">Theme</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSettings((s) => ({ ...s, theme: "dark" }))
                      }
                      className={`${btnClass} border border-white/10 bg-white/5 hover:bg-white/10 ${
                        settings.theme === "dark" ? "ring-2 ring-emerald-500" : ""
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() =>
                        setSettings((s) => ({ ...s, theme: "light" }))
                      }
                      className={`${btnClass} border border-white/10 bg-white/5 hover:bg-white/10 ${
                        settings.theme === "light" ? "ring-2 ring-emerald-500" : ""
                      }`}
                    >
                      Light
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FiKey /> Provider
                  </h3>
                  <p className="text-xs text-white/60 mb-2">
                    (Optional) If your backend expects a provider key from the
                    client, you can store it locally here.
                  </p>
                  <input
                    value={settings.providerKey || ""}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, providerKey: e.target.value }))
                    }
                    placeholder="e.g. sk-***"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => alert("Saved locally")}
                    className={`${btnClass} bg-emerald-600 hover:bg-emerald-700`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === "Shortcuts" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${cardClass} max-w-3xl`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiCommand /> Keyboard Shortcuts
              </h2>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + Enter</span>{" "}
                  — Run Explain
                </li>
                <li>
                  <span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + K</span> — Quick
                  switch page
                </li>
                <li>
                  <span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + L</span> — Clear editor
                </li>
              </ul>
              <div className="mt-4">
                <button
                  onClick={() => setShowShortcuts(true)}
                  className={`${btnClass} border border-white/10 bg-white/5 hover:bg-white/10`}
                >
                  Show Modal
                </button>
              </div>

              <AnimatePresence>
                {showShortcuts && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 grid place-items-center z-30"
                    onClick={() => setShowShortcuts(false)}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-gray-900 rounded-2xl p-6 border border-white/10 max-w-md w-full"
                    >
                      <h3 className="text-lg font-semibold mb-3">
                        Keyboard Shortcuts
                      </h3>
                      <ul className="space-y-2 text-sm text-white/80">
                        <li>
                          <span className="px-2 py-1 bg-white/10 rounded">
                            Ctrl/⌘ + Enter
                          </span>{" "}
                          — Run Explain
                        </li>
                        <li>
                          <span className="px-2 py-1 bg-white/10 rounded">
                            Ctrl/⌘ + K
                          </span>{" "}
                          — Quick switch page
                        </li>
                        <li>
                          <span className="px-2 py-1 bg-white/10 rounded">
                            Ctrl/⌘ + L
                          </span>{" "}
                          — Clear editor
                        </li>
                      </ul>
                      <div className="mt-4 text-right">
                        <button
                          onClick={() => setShowShortcuts(false)}
                          className={`${btnClass} bg-emerald-600 hover:bg-emerald-700`}
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activePage === "Docs" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${cardClass} max-w-4xl`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiHelpCircle /> Docs
              </h2>
              <p className="text-white/70 mb-4">
                Find examples, API details and integration notes.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={`${btnClass} border border-white/10 bg-white/5 hover:bg-white/10`}
              >
                Open Docs <FiExternalLink />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
