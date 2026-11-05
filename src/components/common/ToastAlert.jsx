import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Calendar,
  X,
  Info
} from "lucide-react";

export function ToastAlert() {
  const { alerts, dismissAlert } = useApp();

  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={18} className="text-emerald" />;
      case "call":
        return <PhoneCall size={18} className="text-teal animate-bounce" />;
      case "appointment":
        return <Calendar size={18} className="text-teal" />;
      case "warning":
        return <AlertCircle size={18} className="text-amber" />;
      default:
        return <Bell size={18} className="text-teal" />;
    }
  };

  return (
    <div className="toast-alerts-container" aria-live="polite">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`toast-alert-card alert-type-${alert.type || "info"} animate-slide-in`}
        >
          <div className="toast-alert-icon-wrap">
            {getAlertIcon(alert.type)}
          </div>

          <div className="toast-alert-content">
            <h5 className="toast-alert-title">{alert.title}</h5>
            <p className="toast-alert-message">{alert.message}</p>
            {alert.timestamp && (
              <small className="toast-alert-time">{alert.timestamp}</small>
            )}
          </div>

          <button
            type="button"
            className="toast-alert-close"
            onClick={() => dismissAlert(alert.id)}
            aria-label="Dismiss alert"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastAlert;
