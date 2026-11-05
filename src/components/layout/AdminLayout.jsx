import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationBell from "../common/NotificationBell";
import LanguageSelector from "../common/LanguageSelector";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { Menu, ShieldCheck, Activity, UserPlus, LogOut } from "lucide-react";

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { triggerAlert } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (triggerAlert) {
      triggerAlert({
        title: "Admin Signed Out",
        message: "You have safely logged out of Hospital Administration.",
        type: "info"
      });
    }
    navigate("/login");
  };

  return (
    <div className="dashboard-layout-root">
      <Sidebar role="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main-area">
        {/* Top Header Bar */}
        <header className="dashboard-topbar admin-topbar">
          <div className="topbar-left">
            <button
              className="topbar-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>
            <div className="topbar-welcome">
              <span className="topbar-portal-badge admin-badge">
                <ShieldCheck size={13} /> Hospital Operations & Admin
              </span>
              <h2>Hospital Administration Command Center</h2>
            </div>
          </div>

          <div className="topbar-right">
            <div className="admin-status-indicator hide-on-mobile">
              <Activity size={14} className="text-emerald" />
              <span>All Systems Operational</span>
            </div>

            <Link to="/admin/doctors" className="button button-outline button-sm hide-on-mobile">
              <UserPlus size={15} /> Add Doctor
            </Link>

            <NotificationBell />

            <LanguageSelector showLabel={false} />

            <div className="topbar-profile-link" title="Hospital Administrator">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"}
                alt={user?.name}
                className="topbar-avatar"
              />
            </div>

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

export default AdminLayout;
