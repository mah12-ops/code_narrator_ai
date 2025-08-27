
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

const titleMap: Record<string, string> = {
  "/dashboard/try-narrator": "Try Narrator",
  "/dashboard/history": "History",
  "/dashboard/settings": "Settings",
  "/dashboard/docs": "Docs",
  "/dashboard/shortcuts": "Shortcuts",
};

const Topbar: React.FC = () => {
  const { pathname } = useLocation();
  const title = titleMap[pathname] ?? "Dashboard";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0b]/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        {/* Page Title */}
          <div>
          <h1 className="text-xl font-semibold tracking-wide text-white">
            {title}
          </h1>
          <p className="text-xs text-white/50">
            Code Narrator • AI-powered explanations
          </p>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
            <input
              placeholder="Search…"
              className="w-72 rounded-xl border border-white/10 bg-white/5 px-9 py-2 text-sm outline-none ring-purple-500/50 focus:border-white/20 focus:ring-2"
            />
          </div>

          <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10">
            <Bell className="text-white/80" size={18} />
          </button>

          <Link
            to="/dashboard/settings"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 no-underline hover:bg-white/10"
          >
            <User size={16} />
            <span className="hidden sm:inline">Account</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;

