import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiRefreshCcw } from "react-icons/fi";
import { useApp } from "./context/AppContext";
import type { HistoryItem } from "./context/AppContext";
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiTypescript,
  SiRuby,
  SiOpenjdk,
} from "react-icons/si";
import ShortcutsPage from "./Shortcuts";


const LANGS = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Python", icon: <SiPython className="text-blue-400" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
  { name: "Java", icon: <SiOpenjdk className="text-red-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-400" /> },
  { name: "Ruby", icon: <SiRuby className="text-pink-500" /> },
];

const glow =
  "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(70%_70%_at_20%_20%,rgba(168,85,247,0.15),rgba(0,0,0,0))]";

export default function TryNarrator() {
  const { axiosConfig, history, setHistory } = useApp();
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

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

      const entry: HistoryItem = {
        id: Date.now(),
        code,
        language,
        explanation: text,
        timestamp: new Date().toLocaleString(),
      };
      setHistory([entry, ...history]);

      showToast("⚡ Code Explained!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to explain code. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const clearEditor = () => {
    setCode("");
    setExplanation("");
    showToast("🧹 Editor Cleared");
  };

  const quickSwitch = () => {
    showToast("🔀 Quick Switch Triggered");
    // 👉 you can wire this to router navigation if needed
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-6"
    >
      {/* Floating Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-6 right-6 bg-black/80 text-white px-4 py-2 rounded-xl shadow-lg text-sm"
        >
          {toast}
        </motion.div>
      )}

      {/* Input Card */}
      <div
        className={`relative bg-black backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 overflow-hidden ${glow}`}
      >
        <h2 className="text-2xl text-white font-extrabold mb-6">
          <span className="text-purple-400">💻 Code Narrator</span> — Explain &
          Understand
        </h2>

        {/* Code Input */}
        <div className="relative mb-6">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={12}
            className="w-full bg-black/40 text-gray-100 p-4 shadow-purple-300 shadow-sm rounded-xl border  font-mono focus:ring-2 focus:ring-purple-500/60 outline-none"
          />
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <div className="text-sm font-semibold mb-3 text-white/100">
            Choose Language
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LANGS.map((l) => (
              <motion.button
                key={l.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLanguage(l.name)}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition border ${
                  language === l.name
                    ? "bg-gradient-to-r from-purple-600 to-emerald-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                }`}
              >
                <div className="text-2xl">{l.icon}</div>
                <div className="text-xs font-medium">{l.name}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={fetchExplanation}
            disabled={loading}
            className="px-6 py-3 bg-purple-200 rounded-xl font-semibold text-black shadow-md disabled:opacity-50"
          >
            {loading ? "⏳ Analyzing..." : "⚡ Explain My Code"}
          </motion.button>

          <button
            onClick={clearEditor}
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 flex items-center gap-2"
          >
            <FiRefreshCcw /> Reset
          </button>
        </div>
      </div>

      {/* Explanation Card */}
      <div
        className={`relative bg-black backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl overflow-hidden ${glow}`}
      >
        <div className="flex items-center justify-between bg-black/30 px-4 py-2 border-b border-white/10">
          <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
            🧠 AI Explanation
          </h3>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
        </div>

        <div className="min-h-[200px] max-h-[50vh] overflow-y-auto bg-black/40 p-6 font-mono text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
          {explanation ||
            "💡 Your AI-generated explanation will appear here after submitting..."}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <ShortcutsPage
        onRunExplain={fetchExplanation}
        onQuickSwitch={quickSwitch}
        onClearEditor={clearEditor}
      />
    </motion.div>
  );
}
