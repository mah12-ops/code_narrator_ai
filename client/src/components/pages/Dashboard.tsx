import { Outlet } from "react-router-dom";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Main content scrolls */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          {/* Nested dashboard routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
