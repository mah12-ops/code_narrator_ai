import { useEffect } from "react";
import { FiCommand } from "react-icons/fi";

export default function ShortcutsPage({ onRunExplain, onQuickSwitch, onClearEditor }:any) {
  useEffect(() => {
    const handleKeyDown = (e:any) => {
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      if (ctrlOrCmd && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        onRunExplain?.();
      }

      if (ctrlOrCmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onQuickSwitch?.();
      }

      if (ctrlOrCmd && e.key.toLowerCase() === "l") {
        e.preventDefault();
        onClearEditor?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRunExplain, onQuickSwitch, onClearEditor]);

  return (
    <div className="bg-black rounded-2xl p-6 shadow border border-white/10 max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FiCommand /> Keyboard Shortcuts
      </h2>
      <ul className="space-y-2 list-none text-white/100 text-sm">
        <li>
          <span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + Enter</span> — Run Explain
        </li>
        <li>
          <span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + K</span> — Quick switch page
        </li>
        <li>
          <span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + L</span> — Clear editor
        </li>
      </ul>
    </div>
  );
}
