import {
  HiUser,
  HiInformationCircle,
  HiCog,
  HiAdjustments,
  HiHome,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="layout-header">
      <h3>📋 TODO List 4000</h3>
      <div className="header-btn-container">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiHome />
          <span className="hide-mobile">Home</span>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiUser />
          <span className="hide-mobile">Login</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiCog />
          <span className="hide-mobile">Dashboard</span>
        </NavLink>

        <NavLink
          to="/themes"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiAdjustments />
          <span className="hide-mobile">Theme</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiInformationCircle />
          <span className="hide-mobile">About</span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
