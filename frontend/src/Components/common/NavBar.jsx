import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { NAV_ELEMENTS } from "../../lib/constants";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

          <button
            className="login-btn"
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}>
            Login
          </button>
        </div>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
