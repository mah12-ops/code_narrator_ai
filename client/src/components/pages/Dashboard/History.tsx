import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCopy, FiCheck } from "react-icons/fi";
import { useApp } from "./context/AppContext";
import type {HistoryItem} from "./context/AppContext";

export default function HistoryPage() {
  const { history, setHistory } = useApp();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const clearAll = () => {
    if (!confirm("Clear all history?")) return;
    setHistory([]);
  };

  const deleteItem = (id: number) => {
    setHistory((h) => h.filter((x) => x.id !== id));
  };

  const restoreToEditor = (item: HistoryItem) => {
    // We navigate via localStorage flag: TryNarrator will read this flag if present.
    localStorage.setItem("restore_item", JSON.stringify(item));
    // switch route programatically is out of this file; easiest is to recommend user click Try Narrator or implement navigation in your router.
    alert("Saved restore item. Open 'Try Narrator' to restore.");
  };

  const copyText = async (t: string, id: number) => {
    try {
      await navigator.clipboard.writeText(t);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900/60 rounded-2xl p-6 shadow border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">📜 History of Explanations</h2>
        <div>
          {history.length > 0 && (
            <button onClick={clearAll} className="text-sm text-red-300 hover:underline">
              Clear All
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <p className="text-white/60">No history yet. Run some explanations first.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {history.map((item) => {
            const isExpanded = expandedId === item.id;
            const copied = copiedId === item.id;
            return (
              <motion.div layout key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs text-white/60">{item.timestamp} — {item.language}</div>
                  <div className="flex items-center gap-2">
                    <button title="Copy explanation" onClick={() => copyText(item.explanation, item.id)} className="p-2 rounded hover:bg-white/10">
                      {copied ? <FiCheck /> : <FiCopy />}
                    </button>
                    <button title="Delete" onClick={() => deleteItem(item.id)} className="p-2 rounded hover:bg-white/10 text-red-300">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div onClick={() => setExpandedId(isExpanded ? null : item.id)} className="cursor-pointer">
                  <p className="font-medium text-gray-200 line-clamp-3">{item.explanation}</p>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs text-white/50 mb-1">🔑 Full Explanation:</p>
                        <pre className="text-gray-200 text-sm whitespace-pre-wrap bg-black/40 p-2 rounded">{item.explanation}</pre>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 mb-1">📄 Original Code:</p>
                        <pre className="bg-black/40 p-2 rounded text-xs text-gray-300 overflow-x-auto">{item.code}</pre>
                      </div>
                      <div>
                        <button onClick={() => restoreToEditor(item)} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700">Restore to Editor</button>
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
  );
}
