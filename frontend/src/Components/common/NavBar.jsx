import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { NAV_ELEMENTS } from "../../lib/constants";
import toast from "react-hot-toast";
import ProfileIcon from "./ProfileIcon";

const NavBar = () => {
  const logOut = () => {
    localStorage.clear();
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loggedUser = localStorage.getItem("user");
    if (accessToken) {
      setIsAuthenticated(true);
    }
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, [navigate]);
  return (
    <div className="nav">
      <nav className="navbar-links">
        <div className="logo-section">
          <img src="/logo.png" alt="Logo" width="90px" />
          <p className="name-main">
            <span className="study">Study</span>
            <span className="pilot">Pilot</span>
          </p>
        </div>

        <div className={`nav-menu ${open ? "active" : ""}`}>
          {NAV_ELEMENTS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="nav-element"
              onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          {!isAuthenticated ? (
            <button
              className="login-btn"
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}>
              Login
            </button>
          ) : (
            // <button className="login-btn" onClick={logOut}>
            //   Logout
            // </button>
            <ProfileIcon username={user} />
          )}
        </div>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
