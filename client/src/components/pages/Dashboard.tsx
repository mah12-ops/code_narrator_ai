import { Outlet } from "react-router-dom";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";


const Dashboard = () => {
  return (
    <div className="flex bg-black  h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 bg-black p-6">
          {/* Render nested dashboard routes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
