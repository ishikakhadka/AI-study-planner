import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreatePlan from "../Components/components/Dashboard/CreatePlan";
import AddFriend from "../Components/components/Dashboard/AddFriends";
import "../../CSS/dashboard.css";
import Quote from "../Components/components/Dashboard/Quote";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return (
    <div className="dashboard-main">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-label">YOUR DASHBOARD</p>

            <h1> Welcome back, {capitalize(userName)}!</h1>

            <p>Let's make today productive and closer to your goals.</p>
          </div>
          <div>
            <Quote />
          </div>
        </div>

        <div className="dashboard-top">
          <CreatePlan />
          <AddFriend />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
