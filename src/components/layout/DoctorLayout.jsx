import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationBell from "../common/NotificationBell";
import LanguageSelector from "../common/LanguageSelector";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { Menu, Stethoscope, Clock, PlusCircle, LogOut } from "lucide-react";

export function DoctorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { triggerAlert } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (triggerAlert) {
      triggerAlert({
        title: "Doctor Signed Out",
        message: "You have safely concluded your clinical provider session.",
        type: "info"
      });
    }
    navigate("/login");
  };

  return (
    <div className="dashboard-layout-root">
      <Sidebar role="doctor" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main-area">
        {/* Top Header Bar */}
        <header className="dashboard-topbar doctor-topbar">
          <div className="topbar-left">
            <button
              className="topbar-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>
            <div className="topbar-welcome">
              <span className="topbar-portal-badge doctor-badge">
                <Stethoscope size={13} /> Clinical Practice Portal
              </span>
              <h2>{user?.name || "Dr. Johnson"}</h2>
            </div>
          </div>

          <div className="topbar-right">
            <div className="doctor-status-indicator hide-on-mobile">
              <span className="live-pulse-dot" />
              <span>On Duty (Outpatient Clinic)</span>
            </div>

            <Link to="/doctor/prescriptions" className="button button-primary button-sm hide-on-mobile">
              <PlusCircle size={15} /> New Prescription
            </Link>

            <NotificationBell />

            <LanguageSelector showLabel={false} />

            <Link to="/doctor/profile" className="topbar-profile-link" title="Doctor Clinical Profile">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"}
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

export default DoctorLayout;
