import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiHelpCircle, FiSearch, FiClipboard } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const glow =
  "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(70%_70%_at_20%_20%,rgba(168,85,247,0.15),rgba(0,0,0,0))]";

const DOCS = [
  {
    title: "Getting Started",
    desc: "Learn how to integrate CodeNarrator in your project within minutes.",
    codeExample: `console.log("Hello from CodeNarrator!");`,
    link: "https://github.com",
    tags: ["Introduction", "Integration"],
  },
  {
    title: "API Reference",
    desc: "Full list of endpoints, request formats, and response examples.",
    codeExample: `fetch("/api/explain", { method: "POST", body: JSON.stringify({ code: "print('Hello')", language: "Python" }) });`,
    link: "https://github.com",
    tags: ["API", "Endpoints"],
  },
];

interface DocsPageProps {
  runCode: (code: string) => void;
}

export default function DocsPage({ runCode }: DocsPageProps) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loadingRun, setLoadingRun] = useState<string | null>(null);

  const filteredDocs = DOCS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.desc.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleRun = async (doc: typeof DOCS[0]) => {
    setLoadingRun(doc.title);
    try {
      runCode(doc.codeExample);
    } catch (err) {
      console.error(err);
      alert("Failed to run code.");
    } finally {
      setLoadingRun(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-6"
    >
      <div
        className={`relative bg-[#0b0b0d]/70 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 overflow-hidden ${glow}`}
      >
        <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-purple-400">
          <FiHelpCircle /> Docs
        </h2>
        <p className="text-white/70 mb-6">
          Find examples, API details, and integration notes for CodeNarrator.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search docs..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 text-white/80 rounded-lg border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Docs Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => {
            const isOpen = expanded === doc.title;
            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative flex flex-col p-4 rounded-2xl border border-white/10 bg-[#0b0b0d]/50 shadow-md cursor-pointer overflow-hidden"
              >
                <div
                  onClick={() => setExpanded(isOpen ? null : doc.title)}
                  className="flex items-center justify-between mb-2"
                >
                  <h3 className="text-white font-semibold">{doc.title}</h3>
                  <FiExternalLink
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(doc.link, "_blank");
                    }}
                    className="text-white/60"
                  />
                </div>
                <p className="text-white/60 text-sm mb-2">{doc.desc}</p>

                {isOpen && (
                  <div className="mt-2 bg-black/40 p-3 rounded-lg font-mono text-xs text-gray-200 relative">
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneDark}
                      customStyle={{ background: "transparent", padding: 0 }}
                    >
                      {doc.codeExample}
                    </SyntaxHighlighter>

                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => copyToClipboard(doc.codeExample)}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/70 text-xs flex items-center gap-1"
                      >
                        <FiClipboard /> Copy
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRun(doc);
                        }}
                        className="p-1 rounded bg-purple-600 hover:bg-purple-700 text-white/70 text-xs"
                        disabled={loadingRun === doc.title}
                      >
                        {loadingRun === doc.title ? "Running..." : "Run"}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {filteredDocs.length === 0 && (
            <p className="text-white/50 col-span-full text-center py-4">
              No results found for "{search}".
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
