
import { FiCommand } from "react-icons/fi";

export default function ShortcutsPage() {
  return (
    <div className="bg-gray-900/60 rounded-2xl p-6 shadow border border-white/10 max-w-3xl">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FiCommand /> Keyboard Shortcuts</h2>
      <ul className="space-y-2 text-white/80 text-sm">
        <li><span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + Enter</span> — Run Explain</li>
        <li><span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + K</span> — Quick switch page</li>
        <li><span className="px-2 py-1 bg-white/10 rounded">Ctrl/⌘ + L</span> — Clear editor</li>
      </ul>
    </div>
  );
}
