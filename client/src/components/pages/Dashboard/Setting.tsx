import { useApp } from "./context/AppContext";
import { FiKey, FiSettings, FiUser, FiSave } from "react-icons/fi";
import { motion } from "framer-motion";

const glow =
  "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(70%_70%_at_20%_20%,rgba(168,85,247,0.15),rgba(0,0,0,0))]";

export default function SettingsPage() {
  const { settings, setSettings } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-6"
    >
      {/* General Settings */}
      <div
        className={`relative bg-[#0b0b0d]/70 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 overflow-hidden ${glow}`}
      >
        <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 text-purple-400">
          <FiSettings /> Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* General */}
          <div className="bg-black/30 p-4 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-4 text-white/80">⚙️ General</h3>

            <label className="block text-sm mb-1 text-white/60">
              API Base URL
            </label>
            <input
              value={settings.apiBaseUrl}
              onChange={(e) =>
                setSettings((s) => ({ ...s, apiBaseUrl: e.target.value }))
              }
              placeholder="http://localhost:8080"
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-sm mb-2 text-white/60">Theme</label>
            <div className="flex gap-3">
              <button
                onClick={() => setSettings((s: any) => ({ ...s, theme: "dark" }))}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  settings.theme === "dark"
                    ? "bg-gradient-to-r from-purple-600 to-emerald-600 text-white shadow-md"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => setSettings((s: any) => ({ ...s, theme: "light" }))}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  settings.theme === "light"
                    ? "bg-gradient-to-r from-purple-600 to-emerald-600 text-white shadow-md"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                ☀️ Light
              </button>
            </div>
          </div>

          {/* API Provider */}
          <div className="bg-black/30 p-4 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-white/80">
              <FiKey /> API Provider
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              (Optional) Store provider keys locally for development.
            </p>
            <input
              value={settings.providerKey || ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, providerKey: e.target.value }))
              }
              placeholder="e.g. sk-..."
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => alert("Saved locally")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition"
            >
              <FiSave /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div
        className={`relative bg-[#0b0b0d]/70 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 overflow-hidden ${glow}`}
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-white/80">
          <FiUser /> Account
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1 text-white/60">Name</label>
            <input
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white/60">Email</label>
            <input
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button className="mt-4 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-purple-600 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
          <FiSave /> Update Profile
        </button>
      </div>
    </motion.div>
  );
}
