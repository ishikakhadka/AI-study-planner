import { UserKey } from "lucide-react";
import { NAV_ELEMENTS } from "../../lib/constants";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <nav className="navbar-links ">
          <div
            style={{
              display: "flex",
            }}>
            <img src="/logo.png" alt="Logo" width="90px" />
            <p className="name-main">
              <span className="study">Study</span>
              <span className="pilot">Pilot</span>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "5px",
            }}>
            {NAV_ELEMENTS.map((item) => (
              <a key={item.href} href={item.href} className="nav-element">
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <button className="login-btn" onClick={() => navigate("/login")}>
              <span>Login</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
