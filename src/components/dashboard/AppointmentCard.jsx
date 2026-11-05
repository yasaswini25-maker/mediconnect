import { Calendar, Clock, Video, Building } from "lucide-react";

export function AppointmentCard({ appointment, onJoin, onReschedule, onCancel }) {
  if (!appointment) return null;

  return (
    <div className="apt-item-card mc-card">
      <div className="apt-item-grid">
        <div className="apt-doc-col">
          <img
            src={appointment.doctorImage}
            alt={appointment.doctorName}
            className="apt-doc-avatar"
          />
          <div>
            <h4>{appointment.doctorName}</h4>
            <span className="doc-specialty-pill">{appointment.doctorSpecialty}</span>
            <p className="apt-reason-text mt-1">{appointment.reason}</p>
          </div>
        </div>

        <div className="apt-details-col">
          <div className="apt-meta-line">
            <Calendar size={15} className="text-teal" />
            <strong>{appointment.date}</strong>
          </div>
          <div className="apt-meta-line">
            <Clock size={15} className="text-teal" />
            <span>{appointment.time}</span>
          </div>
          <div className="apt-meta-line">
            {appointment.type === "Online" ? (
              <Video size={15} className="text-teal" />
            ) : (
              <Building size={15} className="text-teal" />
            )}
            <span>{appointment.type}</span>
          </div>
        </div>

        <div className="apt-queue-col">
          <div className="token-badge-block">
            <small>Token</small>
            <strong>#{appointment.queueNumber}</strong>
          </div>
          <span className={`status-badge badge-${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>
        </div>

        <div className="apt-actions-col">
          {appointment.status === "Confirmed" && appointment.type === "Online" && onJoin && (
            <button
              className="button button-primary button-sm"
              onClick={() => onJoin(appointment)}
            >
              <Video size={14} /> Join
            </button>
          )}
          {onReschedule && appointment.status !== "Completed" && (
            <button
              className="button button-outline button-sm"
              onClick={() => onReschedule(appointment)}
            >
              Reschedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
