import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Search, Bell, User as UserIcon, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "./context/AppContext";

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
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const title = titleMap[pathname] ?? "Dashboard";

  useEffect(() => {
    const fetchData = async () => await fetchUser();
    fetchData();
  }, [fetchUser]);

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
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Title */}
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-semibold text-white truncate">{title}</h1>
          <p className="text-xs text-white/60">Code Narrator • AI-powered explanations</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search Icon (mobile only) */}
          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() => setShowSearch(true)}
          >
            <Search className="text-white/80" size={16} />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:block relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search explanations…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-9 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <Bell className="text-white/80" size={16} />
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-black/90 shadow-xl overflow-hidden z-50"
                >
                  <div className="p-4 text-white/80 text-sm">No new notifications</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu((s) => !s)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm text-white/80 hover:bg-white/10 transition"
            >
              {user?.profileImage ? (
                <img
                  src={getImageUrl(user.profileImage) ?? undefined}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-white/10 grid place-items-center text-sm">
                  {user?.name?.[0] ?? "G"}
                </div>
              )}
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
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
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center px-6"
          >
            <div className="relative w-full">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search explanations…"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-white outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                onClick={() => setShowSearch(false)}
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Topbar;
