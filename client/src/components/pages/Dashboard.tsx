import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiTypescript,
  SiRuby,
  SiOpenjdk,
} from "react-icons/si";

const languages = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Python", icon: <SiPython className="text-blue-400" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
  { name: "Java", icon: <SiOpenjdk className="text-red-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-400" /> },
  { name: "Ruby", icon: <SiRuby className="text-pink-500" /> },
];

type HistoryItem = {
  id: number;
  code: string;
  language: string;
  explanation: string;
  timestamp: string;
};

function Dashboard() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // ✅ Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("explanationHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // ✅ Save history to localStorage
  useEffect(() => {
    localStorage.setItem("explanationHistory", JSON.stringify(history));
  }, [history]);

  const fetchExplanation = async () => {
    if (!code || !language) return alert("Please enter both code and language.");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/explain", {
        code,
        language,
      });
      setExplanation(res.data.explanation);

      // Save to history
      const newEntry: HistoryItem = {
        id: Date.now(),
        code,
        language,
        explanation: res.data.explanation,
        timestamp: new Date().toLocaleString(),
      };
      setHistory((prev) => [newEntry, ...prev]); // prepend latest
    } catch (err: any) {
      console.error("❌ Error fetching explanation:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("explanationHistory");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row p-6 gap-6">
      {/* Left Panel */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-4">💻 Code Narrator Dashboard</h1>
        <textarea
          placeholder="Paste your code here..."
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-gray-800 text-gray-100 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none mb-6"
        />

        <h3 className="text-lg font-semibold mb-3">Select Language</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.name}
              onClick={() => setLanguage(lang.name)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border 
              transition-all duration-300 shadow-md
              ${
                language === lang.name
                  ? "bg-emerald-600 text-white border-emerald-400 scale-105"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              }`}
            >
              <span className="text-2xl mb-1">{lang.icon}</span>
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchExplanation}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? "⏳ Analyzing..." : "⚡ Explain My Code"}
        </motion.button>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col gap-6"
      >
        {/* AI Explanation */}
        <div className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4">🧠 AI Explanation</h2>
          <div className="h-[70%] overflow-y-auto bg-gray-800 p-4 rounded-xl border border-gray-700 text-gray-200 font-mono whitespace-pre-wrap">
            {explanation
              ? explanation
              : "Your explanation will appear here after submitting..."}
          </div>
        </div>

        {/* History of Explanations */}
        <div className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📜 History of Explanations</h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-400 hover:underline"
              >
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-gray-400">No history yet. Run some queries!</p>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-4">
              {history.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    className="bg-gray-800 p-3 rounded-lg border border-gray-700 cursor-pointer"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : item.id)
                    }
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {item.timestamp} — {item.language}
                    </p>

                    <p className="font-medium text-gray-200 truncate">
                      {item.explanation.slice(0, 100)}
                      {item.explanation.length > 100 && "…"}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 space-y-2"
                        >
                          <div>
                            <p className="text-sm text-gray-400 mb-1">
                              🔑 Full Explanation:
                            </p>
                            <pre className="text-gray-200 text-sm whitespace-pre-wrap">
                              {item.explanation}
                            </pre>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">
                              📄 Original Code:
                            </p>
                            <pre className="bg-black/40 p-2 rounded text-xs text-gray-300 overflow-x-auto">
                              {item.code}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
