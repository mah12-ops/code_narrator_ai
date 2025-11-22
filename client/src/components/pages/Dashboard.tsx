import { Outlet } from "react-router-dom";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
  <Sidebar />

  {/* Main layout */}
  <div className="flex-1 flex flex-col overflow-hidden md:ml-72">
    <Topbar />
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-black">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default Dashboard;
