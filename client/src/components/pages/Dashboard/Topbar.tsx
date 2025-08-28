import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Search, Bell, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const titleMap: Record<string, string> = {
  "/dashboard/try-narrator": "Try Narrator",
  "/dashboard/history": "History",
  "/dashboard/settings": "Settings",
  "/dashboard/docs": "Docs",
  "/dashboard/shortcuts": "Shortcuts",
};

interface UserData {
  name: string;
  profileImage: string | null;
}

const Topbar: React.FC = () => {
  const { pathname } = useLocation();
  const title = titleMap[pathname] ?? "Dashboard";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // store JWT in localStorage
        if (!token) return;
        const res = await axios.get<UserData>("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!profileMenuRef.current?.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          <h1 className="text-xl font-semibold tracking-wide text-white">
            {title}
          </h1>
          <p className="text-xs text-white/70">Code Narrator • AI-powered explanations</p>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
              size={16}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-72 rounded-xl border border-white/10 bg-white/5 px-9 py-2 text-sm text-white outline-none ring-purple-500/50 focus:border-white/20 focus:ring-2"
            />
          </div>

          {/* Notifications */}
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

          {/* Profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu((s) => !s)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center text-xs">
                  ?
                </div>
              )}
              <span className="hidden sm:inline">{user?.name ?? "Account"}</span>
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
