import { useState } from "react";
import { Clock, Users, ArrowRight, Play, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function LiveQueueCard({ appointment, doctor, isDoctorView = false }) {
  const { updateQueueServing } = useApp();
  const [updating, setUpdating] = useState(false);

  // If used for doctor view
  const currentToken = doctor?.currentServingToken || appointment?.currentServing || 1;
  const patientToken = appointment?.queueNumber || 4;
  const difference = patientToken - currentToken;

  const handleNext = () => {
    if (!doctor) return;
    setUpdating(true);
    const nextToken = (doctor.currentServingToken || 0) + 1;
    updateQueueServing(doctor.id, nextToken);
    setTimeout(() => setUpdating(false), 300);
  };

  const handlePrevious = () => {
    if (!doctor || (doctor.currentServingToken || 0) <= 0) return;
    setUpdating(true);
    const prevToken = Math.max(0, (doctor.currentServingToken || 0) - 1);
    updateQueueServing(doctor.id, prevToken);
    setTimeout(() => setUpdating(false), 300);
  };

  let queueStatus = "In Waiting Room";
  let statusColor = "status-amber";
  let statusDesc = `Approximately ${Math.max(0, difference * 15)} mins remaining`;

  if (difference === 0) {
    queueStatus = "Now Serving Your Token!";
    statusColor = "status-emerald";
    statusDesc = "Please proceed to consultation room / join video link.";
  } else if (difference === 1) {
    queueStatus = "You Are Next In Line";
    statusColor = "status-indigo";
    statusDesc = "Please remain ready. Consultation begins shortly.";
  } else if (difference < 0) {
    queueStatus = "Token Completed";
    statusColor = "status-gray";
    statusDesc = "Consultation completed.";
  }

  if (isDoctorView) {
    return (
      <div className="live-queue-card doctor-queue-card">
        <div className="queue-card-header">
          <div className="queue-card-title-group">
            <span className="live-pulse-badge">
              <span className="pulse-dot" /> LIVE QUEUE DISPATCHER
            </span>
            <h4>Outpatient Token Controller</h4>
          </div>
          <span className="queue-room-tag">{doctor?.room || "Room 402"}</span>
        </div>

        <div className="doctor-queue-counters">
          <div className="queue-counter-box current-box">
            <span className="counter-label">Currently Serving Token</span>
            <div className="counter-large-number">#{doctor?.currentServingToken || 1}</div>
            <small className="counter-sub">Active Consultation in Progress</small>
          </div>

          <div className="queue-counter-box next-box">
            <span className="counter-label">Next in Queue</span>
            <div className="counter-large-number text-teal">
              #{(doctor?.currentServingToken || 1) + 1}
            </div>
            <small className="counter-sub">Total {doctor?.totalTokensToday || 8} Tokens Issued</small>
          </div>
        </div>

        <div className="doctor-queue-actions">
          <button
            className="button button-outline"
            onClick={handlePrevious}
            disabled={updating || (doctor?.currentServingToken || 0) <= 0}
          >
            ← Previous
          </button>
          <button
            className="button button-primary queue-call-next-btn"
            onClick={handleNext}
            disabled={updating}
          >
            <Play size={16} fill="currentColor" /> Call Next Patient (Token #{(doctor?.currentServingToken || 1) + 1})
          </button>
        </div>
      </div>
    );
  }

  // Patient view
  return (
    <div className="live-queue-card patient-queue-card">
      <div className="queue-card-header">
        <div className="queue-card-title-group">
          <span className="live-pulse-badge">
            <span className="pulse-dot" /> LIVE CLINIC QUEUE TRACKER
          </span>
          <h4>Consultation with {appointment?.doctorName || "Dr. Sarah Johnson"}</h4>
        </div>
        <span className={`queue-badge ${statusColor}`}>{queueStatus}</span>
      </div>

      <div className="patient-queue-grid">
        <div className="queue-stat-tile">
          <span className="stat-tile-label">Your Token</span>
          <span className="stat-tile-num text-teal">#{patientToken}</span>
          <small>Issued at booking</small>
        </div>

        <div className="queue-stat-tile">
          <span className="stat-tile-label">Currently Serving</span>
          <span className="stat-tile-num text-navy">#{currentToken}</span>
          <small>Doctor's active desk</small>
        </div>

        <div className="queue-stat-tile">
          <span className="stat-tile-label">Est. Waiting Time</span>
          <span className="stat-tile-num text-amber">
            {Math.max(0, difference * 15)} <small>min</small>
          </span>
          <small>Based on 15m/patient</small>
        </div>
      </div>

      <div className="queue-footer-alert">
        <Clock size={16} className="text-teal" />
        <p>{statusDesc}</p>
      </div>
    </div>
  );
}

export default LiveQueueCard;
