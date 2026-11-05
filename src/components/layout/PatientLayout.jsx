import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationBell from "../common/NotificationBell";
import LanguageSelector from "../common/LanguageSelector";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { Menu, Search, Calendar, Video, Clock, LogOut } from "lucide-react";

export function PatientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { triggerAlert } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (triggerAlert) {
      triggerAlert({
        title: "Signed Out",
        message: "You have been safely signed out.",
        type: "info"
      });
    }
    navigate("/login");
  };

  return (
    <div className="dashboard-layout-root">
      <Sidebar role="patient" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main-area">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="topbar-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>
            <div className="topbar-welcome">
              <span className="topbar-portal-badge">Patient Care Portal</span>
              <h2>Welcome back, {user?.name?.split(" ")[0] || "Patient"}</h2>
            </div>
          </div>

          <div className="topbar-right">
            <div className="quick-actions-bar hide-on-mobile">
              <Link to="/doctors" className="topbar-quick-link">
                <Search size={15} /> Find Doctor
              </Link>
              <Link to="/patient/consultations" className="topbar-quick-link">
                <Video size={15} /> Telehealth
              </Link>
            </div>

            <NotificationBell />

            <LanguageSelector showLabel={false} />

            <Link to="/patient/profile" className="topbar-profile-link" title="View Patient Profile">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                alt={user?.name}
                className="topbar-avatar"
              />
            </Link>

            {/* Direct Prominent Sign Out Button */}
            <button
              type="button"
              className="topbar-logout-btn"
              onClick={handleLogout}
              title="Sign Out of MediConnect"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
              <span className="hide-on-mobile">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="dashboard-content-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}

export default PatientLayout;
