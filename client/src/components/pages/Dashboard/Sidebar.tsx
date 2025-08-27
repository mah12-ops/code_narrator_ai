
import { Link, useLocation } from "react-router-dom";
import { FiBookOpen, FiSettings, FiClock, FiHelpCircle, FiCommand, FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onLogout: () => void;
};

const nav = [
  { to: "/", label: "Try Narrator", icon: <FiBookOpen /> },
  { to: "/history", label: "History", icon: <FiClock /> },
  { to: "/settings", label: "Settings", icon: <FiSettings /> },
  { to: "/shortcuts", label: "Shortcuts", icon: <FiCommand /> },
  { to: "/docs", label: "Docs", icon: <FiHelpCircle /> },
];

export default function Sidebar({ collapsed, setCollapsed, onLogout }: Props) {
  const loc = useLocation();
  return (
    <aside className={`flex flex-col h-screen bg-gray-950/80 backdrop-blur-xl border-r border-white/10 transition-all ${collapsed ? "w-20" : "w-64"}`}>
      <div className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-emerald-400">⚡</div>
        {!collapsed && (
          <div>
            <div className="text-lg font-semibold">CodeNarrator</div>
            <div className="text-xs text-white/50">Ship clarity, faster</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label="toggle sidebar"
          className="ml-auto text-white/60 p-1 rounded hover:bg-white/5"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className="p-2 flex-1 flex flex-col gap-2">
        {nav.map((item) => {
          const active = loc.pathname === item.to || (item.to === "/" && loc.pathname === "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm transition ${active ? "bg-emerald-600 text-white" : "hover:bg-white/5 text-white/80"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <div className="h-px my-3 bg-white/10" />
        <button onClick={onLogout} className="flex items-center gap-3 p-3 rounded-xl text-sm hover:bg-white/5 text-red-300">
          <FiLogOut /> {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      <div className="p-3 text-xs text-white/40">{!collapsed && `v1.0 • ${new Date().getFullYear()}`}</div>
    </aside>
  );
}
