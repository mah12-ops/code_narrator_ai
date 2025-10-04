// src/pages/SettingsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiKey,
  FiSettings,
  FiUser,
  FiSave,
  FiLock,
  FiLogOut,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiLayout,
} from "react-icons/fi";
import { useApp } from "./context/AppContext";
import { toast } from "sonner";

export type Settings = {
  apiBaseUrl: string;
  theme: "dark" | "light";
  aiModel?: string;
  compactMode?: boolean;
  providerKey?: string;
};

const glow =
  "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(70%_70%_at_20%_20%,rgba(20,184,166,0.15),rgba(0,0,0,0))]";

export default function SettingsPage() {
  const { settings, setSettings, setUser } = useApp();
  const navigate = useNavigate();

  const [providerKeyVisible, setProviderKeyVisible] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const AI_MODELS = ["GPT-4", "GPT-3.5", "Qwen-7B", "Custom"];

  // Theme effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    document.documentElement.classList.toggle("light", settings.theme === "light");
    localStorage.setItem("cn_theme", settings.theme);
  }, [settings.theme]);

  const handleSaveSettings = () => {
    localStorage.setItem("cn_settings", JSON.stringify(settings));
    toast.success("✅ Settings saved successfully");
  };

  const handleCopyKey = () => {
    if (!settings.providerKey) return toast.error("No API key to copy");
    navigator.clipboard.writeText(settings.providerKey);
    toast.success("🔑 API key copied");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    toast.success("👋 Logged out");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      toast.error("⚠️ Please fill both fields");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      toast.success("🔒 Password changed successfully");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 space-y-8 max-w-5xl mx-auto overflow-y-auto"
    >
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-2">
        <FiSettings className="text-accent text-2xl" />
        <h1 className="text-3xl font-extrabold text-white">Settings</h1>
      </div>
      <p className="text-white/60 text-sm">
        Manage your account, preferences, and application configuration.
      </p>

      {/* General Settings */}
      <section
        className={`relative bg-[#0b0b0d]/70 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 overflow-hidden ${glow}`}
      >
        <h2 className="text-xl font-bold mb-6 text-white/90 flex items-center gap-2">
          <FiSettings /> General
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {/* API Base URL */}
            <label className="block text-sm text-white/60 mb-1">API Base URL</label>
            <input
              value={settings.apiBaseUrl}
              onChange={(e) => setSettings((s) => ({ ...s, apiBaseUrl: e.target.value }))}
              placeholder="http://localhost:8080"
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent mb-4"
            />

            {/* Theme */}
            <label className="block text-sm text-white/60 mb-1">Theme</label>
            <div className="flex flex-col gap-2 mb-4">
              {["dark", "light"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSettings((s) => ({ ...s, theme: t as "dark" | "light" }))}
                  className={`px-4 py-2 rounded-full text-sm transition font-medium ${
                    settings.theme === t
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {t === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              ))}
            </div>

            {/* AI Model */}
            <label className="block text-sm text-white/60 mb-1">AI Model</label>
            <select
              value={settings.aiModel || AI_MODELS[0]}
              onChange={(e) => setSettings((s) => ({ ...s, aiModel: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent mb-4"
            >
              {AI_MODELS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            {/* Compact Mode */}
            <label className="flex items-center gap-2 mb-6 text-white/70">
              <FiLayout /> Compact Mode
              <input
                type="checkbox"
                checked={settings.compactMode || false}
                onChange={(e) => setSettings((s) => ({ ...s, compactMode: e.target.checked }))}
                className="ml-auto w-5 h-5 accent-accent"
              />
            </label>

            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center gap-2 hover:opacity-90 transition"
            >
              <FiSave /> Save Settings
            </button>
          </div>

          {/* Provider Key */}
          <div>
            <label className="block text-sm text-white/60 mb-1 flex items-center gap-2">
              <FiKey /> API Provider Key (Optional)
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type={providerKeyVisible ? "text" : "password"}
                value={settings.providerKey || ""}
                onChange={(e) => setSettings((s) => ({ ...s, providerKey: e.target.value }))}
                placeholder="e.g. sk-..."
                className="flex-1 bg-white/5 border border-white/10 text-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={() => setProviderKeyVisible((v) => !v)}
                className="px-3 py-1.5 bg-white/5 rounded-lg text-white/80 hover:bg-white/10"
              >
                {providerKeyVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              <button
                onClick={handleCopyKey}
                className="px-3 py-1.5 bg-white/5 rounded-lg text-white/80 hover:bg-white/10"
              >
                <FiCopy />
              </button>
            </div>
            <small className="text-xs text-gray-400">Keys are stored locally only.</small>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        className={`relative bg-[#0b0b0d]/70 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 overflow-hidden ${glow}`}
      >
        <h2 className="text-xl font-bold mb-6 text-white/90 flex items-center gap-2">
          <FiLock /> Security & Profile
        </h2>

        <div className="flex flex-col gap-3 max-w-xs">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 rounded-full bg-accent hover:bg-teal-600 text-white font-medium flex items-center justify-center gap-2 text-sm shadow-sm transition"
          >
            <FiLock size={16} /> Change Password
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium flex items-center justify-center gap-2 text-sm shadow-sm transition"
          >
            <FiLogOut size={16} /> Logout
          </button>
          <button
            onClick={() => navigate("/dashboard/edit-profile")}
            className="px-4 py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium flex items-center justify-center gap-2 text-sm shadow-sm transition"
          >
            <FiUser size={16} /> Edit Profile
          </button>
        </div>
      </section>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0b0b0d] rounded-2xl p-6 w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-bold text-white">Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={saving}
                className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold flex items-center gap-2 disabled:opacity-60 transition text-sm"
              >
                {saving ? "Saving..." : "Change Password"}
                <FiSave />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
