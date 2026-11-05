import { useState } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import ThemeToggle from "../common/ThemeToggle";
import LanguageSelector from "../common/LanguageSelector";
import {
  HeartPulse,
  LayoutDashboard,
  Calendar,
  Users,
  Video,
  FileText,
  Clock,
  Bell,
  User,
  Settings,
  LogOut,
  Building2,
  UserCheck,
  BarChart3,
  Activity,
  Search,
  PlusCircle,
  FilePlus2,
  Star,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  Moon,
  Sun
} from "lucide-react";

export function Sidebar({ role = "patient", isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { triggerAlert } = useApp();
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const patientLinks = [
    { label: "Dashboard", path: "/patient/dashboard", icon: LayoutDashboard },
    { label: "Find Doctors", path: "/doctors", icon: Search },
    { label: "My Appointments", path: "/patient/appointments", icon: Calendar },
    { label: "Online Consultations", path: "/patient/consultations", icon: Video },
    { label: "Medical Records", path: "/patient/records", icon: FileText },
    { label: "Prescriptions", path: "/patient/prescriptions", icon: FilePlus2 },
    { label: "Notifications", path: "/patient/notifications", icon: Bell },
    { label: "My Profile", path: "/patient/profile", icon: User }
  ];

  const doctorLinks = [
    { label: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
    { label: "My Appointments", path: "/doctor/appointments", icon: Calendar },
    { label: "Schedule & Availability", path: "/doctor/availability", icon: Clock },
    { label: "Online Consultations", path: "/doctor/consultations", icon: Video },
    { label: "Prescriptions", path: "/doctor/prescriptions", icon: FilePlus2 },
    { label: "Doctor Profile", path: "/doctor/profile", icon: User }
  ];

  const adminLinks = [
    { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Manage Doctors", path: "/admin/doctors", icon: Users },
    { label: "Doctor Verification", path: "/admin/approvals", icon: UserCheck, badge: "Pending" },
    { label: "Manage Patients", path: "/admin/patients", icon: Users },
    { label: "Departments", path: "/admin/departments", icon: Building2 },
    { label: "Appointments", path: "/admin/appointments", icon: Calendar },
    { label: "Reports & Analytics", path: "/admin/analytics", icon: BarChart3 },
    { label: "System Activity", path: "/admin/activity", icon: Activity }
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "doctor"
      ? doctorLinks
      : patientLinks;

  const roleTitle =
    role === "admin"
      ? "Hospital Administrator"
      : role === "doctor"
      ? "Clinical Provider"
      : "Patient Care Portal";

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-mobile-backdrop" onClick={onClose} />}

      <aside className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-brand-header">
          <NavLink to="/" className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <HeartPulse size={20} />
            </div>
            <div>
              <span className="sidebar-brand-name">MediConnect</span>
              <span className="sidebar-brand-role">{roleTitle}</span>
            </div>
          </NavLink>
        </div>

        {/* Sidebar Navigation */}
        <div className="sidebar-nav-container">
          <span className="sidebar-section-title">MAIN MENU</span>
          <nav className="sidebar-nav-list">
            {links.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={onClose}
                  className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon size={19} className="nav-item-icon" />
                  <span className="nav-item-label">{item.label}</span>
                  {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                  {isActive && <ChevronRight size={14} className="active-chevron" />}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Mini Profile & Sign Out in Sidebar Footer */}
        <div className="sidebar-footer">
          {/* Rich Profile Details Popover */}
          {showProfileDetails && (
            <div className="sidebar-profile-popover animate-slide-up">
              <div className="popover-login-header">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                  alt={user?.name}
                  className="popover-avatar-lg"
                />
                <div className="popover-login-titles">
                  <span className="popover-name">{user?.name}</span>
                  <span className="popover-role-tag">
                    <ShieldCheck size={12} className="text-mint" />
                    {user?.role === "doctor" ? "Verified Doctor" : user?.role === "admin" ? "Hospital Admin" : "Registered Patient"}
                  </span>
                </div>
              </div>

              <div className="popover-details-list">
                <div className="popover-detail-item">
                  <Mail size={13} className="text-teal" />
                  <span className="detail-val">{user?.email}</span>
                </div>
                <div className="popover-detail-item">
                  <Phone size={13} className="text-teal" />
                  <span className="detail-val">{user?.phone || "+1 (555) 712-4433"}</span>
                </div>
              </div>

              <div className="popover-divider" />

              {/* Theme Mode Switcher */}
              <div className="popover-theme-row">
                <span className="theme-row-label">Appearance:</span>
                <ThemeToggle showLabel={true} />
              </div>

              {/* Language Switcher */}
              <div className="popover-theme-row">
                <span className="theme-row-label">Language:</span>
                <LanguageSelector showLabel={true} />
              </div>

              <div className="popover-divider" />

              <div className="popover-actions-row">
                <Link
                  to={`/${user?.role || "patient"}/profile`}
                  className="popover-profile-link"
                  onClick={() => setShowProfileDetails(false)}
                >
                  <User size={14} /> View Account
                </Link>
                <button
                  type="button"
                  className="popover-logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}

          <div
            className={`sidebar-user-pill ${showProfileDetails ? "active" : ""}`}
            onClick={() => setShowProfileDetails(!showProfileDetails)}
            title="Click to view login details & theme settings"
          >
            <div className="sidebar-avatar-wrap">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                alt={user?.name}
                className="sidebar-avatar"
              />
              <span className="sidebar-status-dot" />
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-username">{user?.name}</span>
              <small className="sidebar-user-role">{user?.role?.toUpperCase()}</small>
            </div>
          </div>

          <button
            className="sidebar-logout-btn"
            onClick={handleLogout}
            title="Sign out of MediConnect"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
