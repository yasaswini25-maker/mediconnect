import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  Clock,
  FilePlus2,
  Activity,
  CheckCheck,
  Check,
  ArrowRight
} from "lucide-react";

export function PatientNotifications() {
  const { user } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filterType, setFilterType] = useState("all");

  const patientNotifs = notifications.filter(
    (n) =>
      n.targetRole === "patient" ||
      (n.targetEmail && n.targetEmail.toLowerCase() === user?.email?.toLowerCase())
  );

  const filtered = patientNotifs.filter((n) => {
    if (filterType === "unread") return !n.read;
    if (filterType === "appointment") return n.type === "appointment";
    if (filterType === "queue") return n.type === "queue";
    if (filterType === "prescription") return n.type === "prescription";
    return true;
  });

  const unreadCount = patientNotifs.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "appointment": return <Calendar size={18} className="text-teal" />;
      case "queue": return <Clock size={18} className="text-amber" />;
      case "prescription": return <FilePlus2 size={18} className="text-mint" />;
      default: return <Activity size={18} className="text-navy" />;
    }
  };

  return (
    <div className="patient-notifications-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Notification Center</h2>
          <p>Stay updated on appointment confirmations, live queue updates, and digital prescriptions</p>
        </div>
        {unreadCount > 0 && (
          <button
            className="button button-outline button-sm"
            onClick={() => markAllNotificationsRead("patient")}
          >
            <CheckCheck size={15} /> Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="tabs-pill-row">
          {[
            { label: "All Alerts", id: "all" },
            { label: "Unread", id: "unread" },
            { label: "Appointments", id: "appointment" },
            { label: "Queue Updates", id: "queue" },
            { label: "Prescriptions", id: "prescription" }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab-pill-btn ${filterType === tab.id ? "active" : ""}`}
              onClick={() => setFilterType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Stack */}
      <div className="notifications-list-stack mc-card mt-4">
        {filtered.length === 0 ? (
          <div className="empty-state-card text-center p-5">
            <Bell size={42} className="text-muted mx-auto mb-2" />
            <h4>No Notifications in this Category</h4>
            <p className="text-muted">You are completely up-to-date with your clinical notifications.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`full-notif-item ${item.read ? "read" : "unread"}`}
              onClick={() => markNotificationRead(item.id)}
            >
              <div className="notif-circle-icon">{getIcon(item.type)}</div>
              <div className="notif-full-body">
                <div className="notif-title-row">
                  <h4>{item.title}</h4>
                  <span className="notif-time-badge">{item.timestamp}</span>
                </div>
                <p className="notif-message-text">{item.message}</p>
                <div className="notif-actions-bottom mt-2">
                  {item.link && (
                    <Link to={item.link} className="notif-cta-link">
                      Go to Screen <ArrowRight size={13} />
                    </Link>
                  )}
                  {!item.read && (
                    <span className="unread-dot-badge">New Alert</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientNotifications;
