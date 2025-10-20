// src/components/Topbar.tsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Search, Bell, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "./context/AppContext"; // adjust path if needed

const titleMap: Record<string, string> = {
  "/dashboard/try-narrator": "Try Narrator",
  "/dashboard/history": "History",
  "/dashboard/settings": "Settings",
  "/dashboard/docs": "Docs",
  "/dashboard/shortcuts": "Shortcuts",
};
 
const Topbar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, fetchUser, settings } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");

  const title = titleMap[pathname] ?? "Dashboard";

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

 // Fetch user on mount
useEffect(() => {
  fetchUser();
}, [fetchUser]);

// Auto-refresh user every 5 minutes
useEffect(() => {
  const interval = setInterval(() => {
    fetchUser();
  }, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, [fetchUser]);


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getImageUrl = (img?: string | null) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return img.startsWith("/")
      ? `${settings.apiBaseUrl}${img}`
      : `${settings.apiBaseUrl}/${img}`;
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-semibold tracking-wide text-white">{title}</h1>
          <p className="text-xs text-white/60">Code Narrator • AI-powered explanations</p>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
           <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search explanations…"
  className="w-36 sm:w-64 md:w-72 rounded-xl border border-white/10 bg-white/5 px-9 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/30"
/>

          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Bell className="text-white/80" size={18} />
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-black/90 shadow-xl overflow-hidden z-50"
                >
                  <div className="p-4 text-white/80 text-sm">No new notifications</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu((s) => !s)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              {user?.profileImage ? (
                <img
                  src ={getImageUrl(user.profileImage) ?? undefined}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-sm text-white/80">
                  {user?.name?.[0] ?? "G"}
                </div>
              )}
              <div className="hidden sm:flex sm:flex-col sm:items-start">
                <span className="text-sm text-white/90">{user?.name ?? "Guest"}</span>
                <span className="text-xs text-white/50">{user?.email ?? ""}</span>
              </div>
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black/90 shadow-xl overflow-hidden z-50"
                >
                  <Link
                    to="/dashboard/edit-profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <UserIcon size={14} /> Edit Profile
                  </Link>
                  <div className="h-px bg-white/5" />
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
