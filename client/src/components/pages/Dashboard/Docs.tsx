
import { FiExternalLink, FiHelpCircle } from "react-icons/fi";

export default function DocsPage() {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 shadow border border-white/10 max-w-4xl">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FiHelpCircle /> Docs</h2>
      <p className="text-gray-400 mb-4">Find examples, API details and integration notes for CodeNarrator.</p>
      <div className="grid gap-3">
        <a target="_blank" rel="noreferrer" href="https://github.com" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 inline-flex items-center gap-2">
          Open Docs <FiExternalLink />
        </a>
      </div>
    </div>
  );
}
