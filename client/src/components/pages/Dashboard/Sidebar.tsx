import { NavLink } from "react-router-dom";
import { FaHistory, FaCog, FaBook, FaBolt, FaKeyboard } from "react-icons/fa";

const Sidebar = () => {
  const navItems = [
    { name: "Try Narrator", path: "/dashboard/try-narrator", icon: <FaBolt /> },
    { name: "History", path: "/dashboard/history", icon: <FaHistory /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    { name: "Docs", path: "/dashboard/docs", icon: <FaBook /> },
    { name: "Shortcuts", path: "/dashboard/shortcuts", icon: <FaKeyboard /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-primary text-white" : "hover:bg-gray-200"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
