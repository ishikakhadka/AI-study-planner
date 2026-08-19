import { useState } from "react";
import { NavLink } from "react-router";

import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  Users,
  User,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

import "../../../../CSS/dashboard.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const getLinkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <>
      {/* Mobile Header */}
      <div className="sidebar-mobile-header">
        <div className="sidebar-mobile-logo">
          <div className="logo-icon">
            <Sparkles size={18} />
          </div>

          <div>
            <h2>StudyPilot</h2>
            <span>Study smarter</span>
          </div>
        </div>

        <button className="sidebar-menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && <div className="sidebar-mobile-overlay" onClick={closeMenu} />}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "mobile-sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <h2>StudyPilot</h2>
            <span>Study smarter</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-section-title">MENU</p>

          <NavLink to="/dashboard" className={getLinkClass} onClick={closeMenu}>
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/study-plan"
            className={getLinkClass}
            onClick={closeMenu}>
            <CalendarDays size={19} />
            <span>Study Plans</span>
          </NavLink>

          <NavLink to="/tasks" className={getLinkClass} onClick={closeMenu}>
            <CheckSquare size={19} />
            <span>Tasks</span>
          </NavLink>

          <NavLink to="/friends" className={getLinkClass} onClick={closeMenu}>
            <Users size={19} />
            <span>Friends</span>
          </NavLink>

          <p className="sidebar-section-title sidebar-section-space">ACCOUNT</p>

          <NavLink to="/profile" className={getLinkClass} onClick={closeMenu}>
            <User size={19} />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/settings" className={getLinkClass} onClick={closeMenu}>
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-link logout">
            <LogOut size={19} />
            <span>Logout</span>
          </button>

          <div className="sidebar-footer">© 2026 StudyPilot</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
