import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useLanguage } from "../../context/LanguageContext";
import NotificationBell from "./NotificationBell";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import {
  HeartPulse,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Stethoscope,
  Sparkles
} from "lucide-react";

export function Navbar() {
  const { user, logout, loginAsDemo } = useAuth();
  const { triggerAlert } = useApp();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    if (triggerAlert) {
      triggerAlert({
        title: "Signed Out",
        message: "You have been successfully signed out of MediConnect.",
        type: "info"
      });
    }
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "doctor") return "/doctor/dashboard";
    return "/patient/dashboard";
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <span className="role-tag role-admin">Administrator</span>;
      case "doctor":
        return <span className="role-tag role-doctor">Physician</span>;
      default:
        return <span className="role-tag role-patient">Patient</span>;
    }
  };

  return (
    <header className="main-navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-symbol">
            <HeartPulse size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-text">
            <span>Medi</span>
            <span className="brand-accent">Connect</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {t("navHome")}
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {t("navDoctors")}
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {t("navServices")}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {t("navAbout")}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {t("navContact")}
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Multi-Language Selector */}
          <LanguageSelector showLabel={false} />

          {/* Theme Mode Switcher */}
          <ThemeToggle showLabel={false} />

          {user ? (
            <div className="auth-user-controls">
              {/* Notification Bell */}
              <NotificationBell />

              {/* Direct Dashboard Link */}
              <Link to={getDashboardPath()} className="quick-dash-btn">
                <LayoutDashboard size={16} />
                <span className="hide-on-mobile">{t("navDashboard")}</span>
              </Link>

              {/* Direct Always-Visible Logout Button */}
              <button
                type="button"
                className="nav-logout-direct-btn"
                onClick={handleLogout}
                title="Sign out of MediConnect"
                aria-label="Sign out"
              >
                <LogOut size={15} />
                <span className="hide-on-mobile">{t("navLogout")}</span>
              </button>

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container">
                <button
                  className="profile-pill-trigger"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="User menu"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={user.name}
                    className="avatar-img-sm"
                  />
                  <div className="profile-pill-info hide-on-mobile">
                    <span className="user-firstname">{user.name?.split(" ")[0]}</span>
                    {getRoleBadge(user.role)}
                  </div>
                  <ChevronDown size={14} className="profile-chevron" />
                </button>

                {profileDropdownOpen && (
                  <div className="profile-popover-menu">
                    <div className="popover-user-card">
                      <img
                        src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                        alt={user.name}
                        className="avatar-img-md"
                      />
                      <div className="popover-user-details">
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                        <div className="mt-1">{getRoleBadge(user.role)}</div>
                      </div>
                    </div>

                    <div className="popover-divider" />

                    <Link
                      to={getDashboardPath()}
                      className="popover-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      to={`/${user.role}/profile`}
                      className="popover-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User size={16} />
                      <span>Profile & Settings</span>
                    </Link>

                    <div className="popover-divider" />

                    {/* Theme Mode Toggle Row */}
                    <div className="popover-theme-row">
                      <span className="theme-row-label">Appearance:</span>
                      <ThemeToggle showLabel={true} />
                    </div>

                    <div className="popover-divider" />

                    {/* Quick Demo Switcher */}
                    <div className="demo-switch-section">
                      <span className="demo-switch-title">Quick Demo Role Switch:</span>
                      <div className="demo-switch-buttons">
                        <button
                          type="button"
                          className={`demo-chip ${user.role === "patient" ? "active" : ""}`}
                          onClick={() => {
                            loginAsDemo("patient");
                            setProfileDropdownOpen(false);
                            navigate("/patient/dashboard");
                          }}
                        >
                          Patient
                        </button>
                        <button
                          type="button"
                          className={`demo-chip ${user.role === "doctor" ? "active" : ""}`}
                          onClick={() => {
                            loginAsDemo("doctor");
                            setProfileDropdownOpen(false);
                            navigate("/doctor/dashboard");
                          }}
                        >
                          Doctor
                        </button>
                        <button
                          type="button"
                          className={`demo-chip ${user.role === "admin" ? "active" : ""}`}
                          onClick={() => {
                            loginAsDemo("admin");
                            setProfileDropdownOpen(false);
                            navigate("/admin/dashboard");
                          }}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="popover-divider" />

                    <button className="popover-item logout-item" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="guest-nav-actions">
              <Link to="/login" className="nav-login-btn">
                {t("navLogin")}
              </Link>
              <Link to="/signup" className="nav-signup-btn">
                <Sparkles size={15} />
                {t("navSignup")}
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-utility-bar">
            <LanguageSelector showLabel={true} />
            <ThemeToggle showLabel={true} />
          </div>

          <nav className="mobile-nav-list">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t("navHome")}</Link>
            <Link to="/doctors" onClick={() => setMobileMenuOpen(false)}>{t("navDoctors")}</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>{t("navServices")}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>{t("navAbout")}</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t("navContact")}</Link>

            {user ? (
              <>
                <div className="mobile-divider" />
                <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)} className="mobile-highlight">
                  Go to {user.role.toUpperCase()} Dashboard →
                </Link>
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} /> {t("navLogout")} ({user.name})
                </button>
              </>
            ) : (
              <div className="mobile-auth-row">
                <Link to="/login" className="button button-outline full-width" onClick={() => setMobileMenuOpen(false)}>
                  {t("navLogin")}
                </Link>
                <Link to="/signup" className="button button-primary full-width" onClick={() => setMobileMenuOpen(false)}>
                  {t("navSignup")}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
