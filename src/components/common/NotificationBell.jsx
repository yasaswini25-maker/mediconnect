import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Clock, Calendar, FileText, Activity } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

export function NotificationBell() {
  const { user } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter notifications relevant to current user
  const userNotifications = notifications.filter((n) => {
    if (!user) return false;
    if (n.targetEmail && n.targetEmail.toLowerCase() === user.email.toLowerCase()) return true;
    if (n.targetRole && n.targetRole === user.role) return true;
    return false;
  });

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar size={16} className="text-teal" />;
      case "prescription":
        return <FileText size={16} className="text-mint" />;
      case "queue":
        return <Clock size={16} className="text-orange" />;
      default:
        return <Activity size={16} className="text-navy" />;
    }
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button
        className="bell-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notifications-popover">
          <div className="notif-popover-header">
            <div>
              <h4>Notifications</h4>
              <span className="notif-count-text">
                {unreadCount} unread alert{unreadCount !== 1 ? "s" : ""}
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                className="mark-all-read-btn"
                onClick={() => markAllNotificationsRead(user?.role)}
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          <div className="notif-list">
            {userNotifications.length === 0 ? (
              <div className="notif-empty">
                <Bell size={32} className="empty-bell-icon" />
                <p>No notifications yet</p>
                <small>You're all caught up with your healthcare updates!</small>
              </div>
            ) : (
              userNotifications.slice(0, 5).map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-item ${notif.read ? "read" : "unread"}`}
                  onClick={() => markNotificationRead(notif.id)}
                >
                  <div className="notif-icon-wrap">{getIcon(notif.type)}</div>
                  <div className="notif-body">
                    <div className="notif-title-row">
                      <strong>{notif.title}</strong>
                      <span className="notif-time">{notif.timestamp}</span>
                    </div>
                    <p className="notif-msg">{notif.message}</p>
                    {notif.link && (
                      <Link
                        to={notif.link}
                        className="notif-link-action"
                        onClick={() => setIsOpen(false)}
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {userNotifications.length > 5 && (
            <div className="notif-popover-footer">
              <Link
                to={`/${user?.role}/notifications`}
                onClick={() => setIsOpen(false)}
              >
                View all notifications ({userNotifications.length})
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
