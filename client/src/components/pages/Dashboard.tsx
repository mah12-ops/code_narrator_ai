import { Outlet } from "react-router-dom";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar (hidden on small screens, shown on md+) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
