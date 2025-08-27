
import { useApp } from "./context/AppContext";
import { FiUser } from "react-icons/fi";

export default function Topbar() {
  const { user } = useApp();

  return (
    <header className="bg-gray-950/70 border-b border-white/10 px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold">CodeNarrator</div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-white/80">Welcome</div>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
          <FiUser />
          <span className="text-sm">{user ? user.name : "Guest User"}</span>
        </div>
      </div>
    </header>
  );
}
