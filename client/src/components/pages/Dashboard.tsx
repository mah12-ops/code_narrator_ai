import { Outlet } from "react-router-dom";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";


const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-50">
          {/* Render nested dashboard routes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
