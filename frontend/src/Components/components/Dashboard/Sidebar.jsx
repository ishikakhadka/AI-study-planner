import { useState } from "react";
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

          <a href="#" className="sidebar-link active" onClick={closeMenu}>
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </a>

          <a href="#" className="sidebar-link" onClick={closeMenu}>
            <CalendarDays size={19} />
            <span>Study Plans</span>
          </a>

          <a href="#" className="sidebar-link" onClick={closeMenu}>
            <CheckSquare size={19} />
            <span>Tasks</span>
          </a>

          <a href="#" className="sidebar-link" onClick={closeMenu}>
            <Users size={19} />
            <span>Friends</span>
          </a>

          <p className="sidebar-section-title sidebar-section-space">ACCOUNT</p>

          <a href="#" className="sidebar-link" onClick={closeMenu}>
            <User size={19} />
            <span>Profile</span>
          </a>

          <a href="#" className="sidebar-link" onClick={closeMenu}>
            <Settings size={19} />
            <span>Settings</span>
          </a>
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
