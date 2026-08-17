import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreatePlan from "../Components/components/Dashboard/CreatePlan";
import AddFriend from "../Components/components/Dashboard/AddFriends";
import "../../CSS/dashboard.css";
import Quote from "../Components/components/Dashboard/Quote";
import Sidebar from "../Components/components/Dashboard/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userName = localStorage.getItem("user");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="dashboard-text">
          <p className="dashboard-label">YOUR DASHBOARD</p>

          <h1>Welcome back, {capitalize(userName)}!</h1>

          <p>Let's make today productive and closer to your goals.</p>
        </div>

        <Quote />
      </div>

      <div className="dashboard-top">
        <CreatePlan />
      </div>
    </div>
  );
};
export default Dashboard;
