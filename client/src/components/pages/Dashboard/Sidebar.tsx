import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bolt,
  History,
  Settings,
  BookOpen,
  Keyboard,
  ChevronLeft,
  ChevronRight,
  Zap,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { name: "Try Narrator", path: "/dashboard/try-narrator", icon: Bolt },
  { name: "History", path: "/dashboard/history", icon: History },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
  { name: "Docs", path: "/dashboard/docs", icon: BookOpen },
  { name: "Shortcuts", path: "/dashboard/shortcuts", icon: Keyboard },
];

const glow =
  "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(70%_70%_at_20%_20%,rgba(168,85,247,0.15),rgba(0,0,0,0))]";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem("cn_sidebar_collapsed") === "true"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("cn_sidebar_collapsed", String(collapsed));
  }, [collapsed]);

  const isCollapsed = collapsed;
  const widthClass = isCollapsed ? "w-20" : "w-72";

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{
          x: mobileOpen || window.innerWidth >= 768 ? 0 : -300,
          opacity: 1,
        }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 top-0 h-screen z-50 flex flex-col justify-between border-r border-white/10 bg-black backdrop-blur-xl overflow-hidden ${widthClass} ${glow} md:flex`}
      >
        {/* Branding */}
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/40 bg-black shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            <Zap className="h-5 w-5 text-purple-300" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="truncate text-lg text-white font-extrabold tracking-tight">
                Code <span className="text-purple-400">Narrator</span>
              </h2>
              <p className="truncate text-xs text-white/100">AI-powered clarity</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          <ul className="list-none space-y-2">
            {nav.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "flex items-center rounded-xl px-2 py-3 no-underline transition-all",
                        isCollapsed ? "justify-center" : "gap-3",
                        "border border-transparent hover:border-white/10 hover:bg-white/5",
                        isActive || active
                          ? "bg-gradient-to-r from-purple-600/80 to-emerald-600/80 text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] border-white/10"
                          : "text-white/70",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 text-xs text-white/40">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <span>© {new Date().getFullYear()} Code Narrator</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">v1.0</span>
            </div>
          ) : (
            <div className="text-center">
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">v1.0</span>
            </div>
          )}
        </div>

        {/* Overlay for mobile */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
