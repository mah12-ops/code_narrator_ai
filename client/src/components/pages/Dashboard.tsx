import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-gray-200 transition-all duration-300 flex flex-col ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1
            className={`text-lg font-bold tracking-wide text-white transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Narrator AI
          </h1>
          <button
            className="text-gray-200 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-2 flex-1">
          {[
            { to: "/dashboard/try-narrator", label: "🎙️ Try Narrator" },
            { to: "/dashboard/history", label: "📜 History" },
            { to: "/dashboard/settings", label: "⚙️ Settings" },
            { to: "/dashboard/docs", label: "📖 Docs" },
            { to: "/dashboard/shortcuts", label: "⌨️ Shortcuts" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {isOpen ? label : label.split(" ")[0]} {/* Show only icon if collapsed */}
            </NavLink>
          ))}
        </nav>

        {/* Footer/User */}
        <div className="p-4 border-t border-gray-700 flex items-center gap-2">
          <FiUser size={20} />
          {isOpen && <span className="text-sm">My Account</span>}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
