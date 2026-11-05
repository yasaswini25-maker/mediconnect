import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import VideoConsultationModal from "../../components/features/VideoConsultationModal";
import BookingModal from "../../components/features/BookingModal";
import {
  Video,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PlusCircle,
  PhoneCall,
  Activity
} from "lucide-react";

export function PatientConsultations() {
  const { user } = useAuth();
  const { appointments, doctors } = useApp();

  const [activeVideoApt, setActiveVideoApt] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Online appointments only
  const onlineApts = appointments.filter(
    (a) =>
      (a.patientEmail?.toLowerCase() === user?.email?.toLowerCase() || a.patientId === user?.id) &&
      a.type === "Online"
  );

  return (
    <div className="patient-consultations-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Online Telemedicine Consultations</h2>
          <p>Attend encrypted HD video sessions with your doctors from anywhere</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => setBookingOpen(true)}
        >
          <PlusCircle size={16} /> Schedule Video Consultation
        </button>
      </div>

      {/* Telehealth Preparation Checklist Card */}
      <div className="telehealth-prep-card mc-card mt-3">
        <div className="prep-header">
          <div className="prep-icon-wrap">
            <ShieldCheck size={24} className="text-teal" />
          </div>
          <div>
            <h4>Telehealth Session Best Practices</h4>
            <p>Ensure a smooth, professional clinical consultation by checking these 4 items:</p>
          </div>
        </div>

        <div className="prep-items-grid mt-3">
          <div className="prep-item">
            <CheckCircle2 size={16} className="text-teal" />
            <span>Connect from a private, well-lit room</span>
          </div>
          <div className="prep-item">
            <CheckCircle2 size={16} className="text-teal" />
            <span>Ensure stable Wi-Fi or broadband connection</span>
          </div>
          <div className="prep-item">
            <CheckCircle2 size={16} className="text-teal" />
            <span>Have recent blood pressure or temperature logs ready</span>
          </div>
          <div className="prep-item">
            <CheckCircle2 size={16} className="text-teal" />
            <span>Allow camera & microphone browser permissions</span>
          </div>
        </div>
      </div>

      {/* Online Consultations List */}
      <div className="mc-card mt-4">
        <div className="dash-section-header mb-3">
          <h3>Your Virtual Consultations ({onlineApts.length})</h3>
          <span className="text-xs text-muted font-medium">HIPAA Encrypted WebRTC Session</span>
        </div>

        {onlineApts.length === 0 ? (
          <div className="empty-state-card text-center p-5">
            <Video size={42} className="text-muted mx-auto mb-2" />
            <h4>No Online Consultations Scheduled</h4>
            <p className="text-muted">You do not have any virtual telemedicine sessions active right now.</p>
            <button
              className="button button-primary mt-3"
              onClick={() => setBookingOpen(true)}
            >
              Book an Online Telehealth Slot
            </button>
          </div>
        ) : (
          <div className="online-apts-grid">
            {onlineApts.map((apt) => (
              <div key={apt.id} className="online-apt-card">
                <div className="online-card-top">
                  <div className="d-flex align-center gap-3">
                    <img
                      src={apt.doctorImage}
                      alt={apt.doctorName}
                      className="online-doc-avatar"
                    />
                    <div>
                      <h4>{apt.doctorName}</h4>
                      <span className="doc-specialty-pill">{apt.doctorSpecialty}</span>
                    </div>
                  </div>
                  <span className={`status-badge badge-${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="online-card-schedule mt-3">
                  <div className="sched-item">
                    <Calendar size={14} className="text-teal" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="sched-item">
                    <Clock size={14} className="text-teal" />
                    <span>{apt.time}</span>
                  </div>
                  <div className="sched-item">
                    <strong>Token #{apt.queueNumber}</strong>
                  </div>
                </div>

                <p className="online-card-reason mt-2">
                  <strong>Reason:</strong> {apt.reason}
                </p>

                {apt.meetingRoomId && (
                  <div className="meeting-room-id-box mt-2">
                    <small>Encrypted Room ID:</small>
                    <code>{apt.meetingRoomId}</code>
                  </div>
                )}

                <div className="online-card-footer mt-4">
                  {apt.status === "Confirmed" ? (
                    <button
                      className="button button-primary full-width"
                      onClick={() => setActiveVideoApt(apt)}
                    >
                      <Video size={16} /> Enter Video Consultation
                    </button>
                  ) : apt.status === "Pending" ? (
                    <div className="notice-banner banner-info full-width text-center">
                      Awaiting physician confirmation
                    </div>
                  ) : (
                    <span className="text-xs text-muted block text-center full-width">
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
        isOpen={Boolean(activeVideoApt)}
        onClose={() => setActiveVideoApt(null)}
        appointment={activeVideoApt}
        currentUserRole="patient"
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}

export default PatientConsultations;
