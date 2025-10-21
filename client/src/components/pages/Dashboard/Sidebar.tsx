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
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("cn_sidebar_collapsed");
    return saved ? saved === "true" : false;
  });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("cn_sidebar_collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isCollapsed = isMobile || (collapsed && !hovering);
  const widthClass = isCollapsed ? "w-16" : "w-72";

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed md:relative top-0 left-0 h-screen z-40 flex flex-col justify-between border-r border-white/10 bg-black backdrop-blur-xl overflow-hidden ${widthClass} ${glow}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/40 bg-black shadow-[0_0_25px_rgba(168,85,247,0.35)]">
          <Zap className="h-5 w-5 text-purple-300" />
        </div>
        {!isCollapsed && (
          <div>
            <h2 className="truncate text-lg text-white font-extrabold tracking-tight">
              Code <span className="text-purple-400">Narrator</span>
            </h2>
            <p className="truncate text-xs text-white/70">AI-powered clarity</p>
          </div>
        )}
        {!isMobile && (
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2">
        <ul className="list-none space-y-1">
          {nav.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path} className="relative group">
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

                {/* Tooltip for collapsed mobile sidebar */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 hidden group-hover:inline-block bg-black/80 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap border border-white/10">
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 text-xs text-white/40">
        {isCollapsed ? (
          <div className="text-center">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">v1.0</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>© {new Date().getFullYear()} Code Narrator</span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">v1.0</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
