import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, Bell, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const titleMap: Record<string, string> = {
  "/dashboard/try-narrator": "Try Narrator",
  "/dashboard/history": "History",
  "/dashboard/settings": "Settings",
  "/dashboard/docs": "Docs",
  "/dashboard/shortcuts": "Shortcuts",
  "/dashboard/edit-profile": "Edit Profile",
};

const Topbar: React.FC = () => {
  const { pathname } = useLocation();
  const title = titleMap[pathname] ?? "Dashboard";

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // User data from backend
  const [username, setUsername] = useState("User");
  const [avatar, setAvatar] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user on mount
  useEffect(() => {
    axios.get("/api/auth/me").then((res) => {
      setUsername(res.data.name);
      setAvatar(res.data.avatar);
    }).catch(() => {
      console.log("Failed to fetch user data");
    });
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout"); // optional backend logout
    window.location.href = "/login";
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-20 border-b border-white/10 bg-black backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-semibold tracking-wide text-white">{title}</h1>
          <p className="text-xs text-white/70">Code Narrator • AI-powered explanations</p>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* 🔎 Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-72 rounded-xl border border-white/10 bg-white/5 px-9 py-2 text-sm text-white outline-none ring-purple-500/50 focus:border-white/20 focus:ring-2"
            />
          </div>

          {/* 🔔 Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Bell className="text-white/80" size={18} />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-black/90 p-3 shadow-xl">
                <p className="text-sm text-white/70">🔔 No new notifications</p>
              </div>
            )}
          </div>

          {/* 👤 Profile */}
          <div className="relative profile-menu">
            <button
              onClick={() => setShowProfileMenu((s) => !s)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              {avatar ? (
                <img src={avatar} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
              ) : (
                <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center text-xs">?</div>
              )}
              <span className="hidden sm:inline">{username}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-black/90 shadow-xl overflow-hidden">
                <Link
                  to="/dashboard/edit-profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  <User size={14} /> Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
