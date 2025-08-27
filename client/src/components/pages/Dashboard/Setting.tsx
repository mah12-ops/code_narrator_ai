
import { useApp } from "./context/AppContext";
import { FiKey, FiSettings } from "react-icons/fi";

export default function SettingsPage() {
  const { settings, setSettings } = useApp();

  return (
    <div className="bg-gray-100 rounded-2xl p-6 shadow border border-white/10 max-w-4xl">
      <h2 className="text-xl font-bold mb-4"><FiSettings /> Settings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-semibold mb-3">General</h3>

          <label className="block text-sm mb-1">API Base URL</label>
          <input value={settings.apiBaseUrl} onChange={(e) => setSettings((s) => ({ ...s, apiBaseUrl: e.target.value }))} placeholder="http://localhost:8080" className="w-full bg-gray-200 shadow-lg border border-white/10 text-gray-500 rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-emerald-500" />

          <label className="block text-sm mb-1">Theme</label>
          <div className="flex gap-2">
            <button onClick={() => setSettings((s:any) => ({ ...s, theme: "dark" }))} className={`px-3 py-2 rounded ${settings.theme === "dark" ? "ring-2 bg-purple-300 " : "bg-white/5"}`}>Dark</button>
            <button onClick={() => setSettings((s:any) => ({ ...s, theme: "light" }))} className={`px-3 py-2 rounded ${settings.theme === "light" ? "ring-2 bg-purple-300 " : "bg-white/5"}`}>Light</button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><FiKey /> Provider</h3>
          <p className="text-xs text-gray-500 mb-2">(Optional) store provider keys locally for development</p>
          <input value={settings.providerKey || ""} onChange={(e) => setSettings((s) => ({ ...s, providerKey: e.target.value }))} placeholder="e.g. sk-..." className="w-full bg-gray-200 shadow-lg border border-white/10 rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-emerald-500" />
          <button onClick={() => alert("Saved locally")} className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700">Save</button>
        </div>
      </div>
    </div>
  );
}
