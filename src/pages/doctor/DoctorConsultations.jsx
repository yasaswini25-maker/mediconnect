import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import VideoConsultationModal from "../../components/features/VideoConsultationModal";
import {
  Video,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle
} from "lucide-react";

export function DoctorConsultations() {
  const { user } = useAuth();
  const { doctors, appointments, initiateCall } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const onlineApts = appointments.filter(
    (a) =>
      (a.doctorId === currentDoctor.id || a.doctorName === currentDoctor.name) &&
      a.type === "Online"
  );

  const [activeSessionApt, setActiveSessionApt] = useState(null);

  return (
    <div className="doctor-consultations-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Virtual Telehealth Clinical Suite</h2>
          <p>Launch high-definition encrypted video consultations with outpatient patients</p>
        </div>
      </div>

      {/* Virtual Waiting Room Status */}
      <div className="mc-card mt-3">
        <div className="dash-section-header mb-3">
          <div className="d-flex align-center gap-2">
            <span className="live-pulse-dot" />
            <h3>Virtual Patient Waiting Room</h3>
          </div>
          <span className="text-xs text-muted font-semibold">WebRTC Peer Connection Ready</span>
        </div>

        {onlineApts.length === 0 ? (
          <div className="empty-state-card text-center p-5">
            <Video size={42} className="text-muted mx-auto mb-2" />
            <h4>No Online Consultations in Queue</h4>
            <p className="text-muted">Patients who book virtual video appointments will appear in this waiting queue.</p>
          </div>
        ) : (
          <div className="online-doctor-grid">
            {onlineApts.map((apt) => (
              <div key={apt.id} className="online-doctor-apt-card">
                <div className="d-flex justify-between align-start">
                  <div>
                    <h4 className="font-semibold text-secondary">{apt.patientName}</h4>
                    <small className="block text-muted">{apt.patientPhone || apt.patientEmail}</small>
                  </div>
                  <span className={`status-badge badge-${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="apt-item-meta-bar mt-2">
                  <span><Calendar size={13} /> {apt.date} at {apt.time}</span>
                  <span className="text-teal font-semibold">Token #{apt.queueNumber}</span>
                </div>

                <p className="text-xs text-muted mt-2">
                  <strong>Reason:</strong> {apt.reason}
                </p>

                {apt.meetingRoomId && (
                  <div className="meeting-room-id-box mt-2">
                    <small>Encrypted Room ID:</small>
                    <code>{apt.meetingRoomId}</code>
                  </div>
                )}

                <div className="mt-3">
                  {apt.status === "Confirmed" ? (
                    <button
                      className="button button-primary full-width button-sm"
                      onClick={() => {
                        setActiveSessionApt(apt);
                        initiateCall({ appointment: apt, doctor: currentDoctor });
                      }}
                    >
                      <Video size={14} /> Launch Consultation Room
                    </button>
                  ) : apt.status === "Pending" ? (
                    <span className="text-xs text-amber block text-center font-semibold">
                      Please confirm appointment in Appointments tab
                    </span>
                  ) : (
                    <span className="text-xs text-muted block text-center">
                      Consultation Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoConsultationModal
        isOpen={Boolean(activeSessionApt)}
        onClose={() => setActiveSessionApt(null)}
        appointment={activeSessionApt}
        currentUserRole="doctor"
      />
    </div>
  );
}

export default DoctorConsultations;
