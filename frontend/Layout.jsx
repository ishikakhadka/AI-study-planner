import { Outlet } from "react-router";
import NavBar from "./src/Components/common/NavBar";
import Sidebar from "./src/Components/components/Dashboard/Sidebar";
import "./CSS/dashboard.css";

const Layout = () => {
  return (
    <div className="dashboard-main">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
