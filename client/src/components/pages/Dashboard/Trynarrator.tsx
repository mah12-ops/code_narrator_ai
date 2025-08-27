import  { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiRefreshCcw } from "react-icons/fi";
import { useApp } from "./context/AppContext";
import type {HistoryItem} from "./context/AppContext";
import { SiJavascript, SiPython, SiPhp, SiTypescript, SiRuby, SiOpenjdk } from "react-icons/si";

const LANGS = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Python", icon: <SiPython className="text-blue-400" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
  { name: "Java", icon: <SiOpenjdk className="text-red-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-400" /> },
  { name: "Ruby", icon: <SiRuby className="text-pink-500" /> },
];

export default function TryNarrator() {
  const { axiosConfig, history, setHistory } = useApp();
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
      const res = await axios.post("/api/explain", { code, language }, axiosConfig);
      const text = typeof res.data?.explanation === "string" ? res.data.explanation : JSON.stringify(res.data);
      setExplanation(text);

      const entry: HistoryItem = {
        id: Date.now(),
        code,
        language,
        explanation: text,
        timestamp: new Date().toLocaleString(),
      };
      setHistory([entry, ...history]);
    } catch (err: any) {
      console.error(err);
      alert("Failed to explain code. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-gray-900/60 rounded-2xl p-6 shadow border border-white/10">
        <h2 className="text-2xl font-bold mb-4">💻 Explain & Narrate</h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          rows={12}
          className="w-full bg-black/40 text-gray-100 p-4 rounded-xl border border-white/10 mb-4 font-mono"
        />

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2">Language</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {LANGS.map((l) => (
              <button
                key={l.name}
                onClick={() => setLanguage(l.name)}
                className={`p-3 rounded-xl text-xs flex flex-col items-center gap-1 transition ${
                  language === l.name ? "bg-emerald-600 text-white border-emerald-400" : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="text-2xl">{l.icon}</div>
                <div>{l.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} onClick={fetchExplanation} disabled={loading} className="px-4 py-2 bg-emerald-600 rounded-xl font-semibold disabled:opacity-50">
            {loading ? "⏳ Analyzing..." : "⚡ Explain My Code"}
          </motion.button>

          <button
            onClick={() => {
              setCode("");
              setExplanation("");
            }}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5"
          >
            <FiRefreshCcw /> Reset
          </button>
        </div>
      </div>

      <div className="mt-6 bg-gray-900/60 rounded-2xl p-6 shadow border border-white/10">
        <h3 className="text-xl font-bold mb-3">🧠 AI Explanation</h3>
        <div className="min-h-[160px] max-h-[50vh] overflow-y-auto bg-black/40 p-4 rounded text-gray-200 font-mono whitespace-pre-wrap">
          {explanation || "Your explanation will appear here after submitting..."}
        </div>
      </div>
    </motion.div>
  );
}
