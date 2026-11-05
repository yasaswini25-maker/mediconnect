import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import LiveQueueCard from "../../components/features/LiveQueueCard";
import VideoConsultationModal from "../../components/features/VideoConsultationModal";
import PrescriptionModal from "../../components/features/PrescriptionModal";
import {
  Users,
  Calendar,
  Clock,
  Video,
  FilePlus2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  Activity,
  PlusCircle,
  Stethoscope,
  TrendingUp,
  ArrowRight
} from "lucide-react";

export function DoctorDashboard() {
  const { user } = useAuth();
  const { doctors, appointments, prescriptions, patients, updateAppointmentStatus, initiateCall } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const docApts = appointments.filter(
    (a) => a.doctorId === currentDoctor.id || a.doctorName === currentDoctor.name
  );

  const [activeVideoApt, setActiveVideoApt] = useState(null);
  const [createRxOpen, setCreateRxOpen] = useState(false);

  const totalPatients = new Set(docApts.map((a) => a.patientEmail)).size || 42;
  const todayApts = docApts.filter((a) => a.status === "Confirmed" || a.status === "Pending");
  const upcomingConsults = docApts.filter((a) => a.status === "Confirmed").length;
  const completedConsults = docApts.filter((a) => a.status === "Completed").length;

  return (
    <div className="doctor-dashboard-view">
      {/* Welcome Banner */}
      <div className="dash-welcome-banner doctor-banner">
        <div className="welcome-banner-text">
          <span className="section-eyebrow">CLINICAL PROVIDER COCKPIT</span>
          <h1>Welcome, {currentDoctor.name}</h1>
          <p>
            {currentDoctor.title} • {currentDoctor.hospital} ({currentDoctor.room})
          </p>
        </div>

        <div className="welcome-banner-actions">
          <button
            className="button button-primary"
            onClick={() => setCreateRxOpen(true)}
          >
            <PlusCircle size={16} /> Create Prescription
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="dashboard-grid-stats mt-4">
        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-teal">
            <Users size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Total Patients</small>
            <h3>{totalPatients}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-emerald">
            <Calendar size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Active Appointments</small>
            <h3>{todayApts.length}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-navy">
            <Video size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Upcoming / Scheduled</small>
            <h3>{upcomingConsults}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-amber">
            <CheckCircle2 size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Completed Consultations</small>
            <h3>{completedConsults}</h3>
          </div>
        </div>
      </div>

      {/* Live Queue Controller (Special Feature) */}
      <LiveQueueCard doctor={currentDoctor} isDoctorView={true} />

      {/* Two Column Section: Today's Appointments & Patient Reviews */}
      <div className="dash-two-column-grid">
        {/* Today's Appointments Schedule */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Scheduled Patients</h3>
              <p>Outpatient requests & consultations</p>
            </div>
            <Link to="/doctor/appointments" className="text-teal font-semibold text-sm">
              Manage All ({docApts.length}) →
            </Link>
          </div>

          <div className="mini-doctor-apts-list">
            {docApts.slice(0, 4).map((apt) => (
              <div key={apt.id} className="mini-doc-apt-item">
                <div className="d-flex justify-between align-start mb-2">
                  <div>
                    <strong>{apt.patientName}</strong>
                    <small className="block text-muted">{apt.reason}</small>
                  </div>
                  <span className={`status-badge badge-${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="apt-item-meta-bar">
                  <span><Clock size={13} /> {apt.date} at {apt.time}</span>
                  <span><strong>Token #{apt.queueNumber}</strong></span>
                  <span className="text-teal">{apt.type}</span>
                </div>

                <div className="apt-item-actions-row mt-3">
                  {apt.status === "Pending" ? (
                    <>
                      <button
                        className="button button-primary button-xs"
                        onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}
                      >
                        Approve Request
                      </button>
                      <button
                        className="button button-outline button-xs button-danger"
                        onClick={() => updateAppointmentStatus(apt.id, "Cancelled", "Slot unavailable")}
                      >
                        Decline
                      </button>
                    </>
                  ) : apt.status === "Confirmed" ? (
                    <>
                      {apt.type === "Online" && (
                        <button
                          className="button button-primary button-xs"
                          onClick={() => {
                            setActiveVideoApt(apt);
                            initiateCall({ appointment: apt, doctor: currentDoctor });
                          }}
                        >
                          <Video size={13} /> Start Video Call
                        </button>
                      )}
                      <button
                        className="button button-outline button-xs"
                        onClick={() => updateAppointmentStatus(apt.id, "Completed")}
                      >
                        Mark Completed
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-muted font-medium">Session Concluded</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Rating & Reviews */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Patient Satisfaction</h3>
              <p>Ratings and verified patient reviews</p>
            </div>
            <span className="rating-counter-badge">
              <Star size={14} className="star-gold filled" /> {currentDoctor.rating} / 5.0
            </span>
          </div>

          <div className="doctor-rating-summary-box">
            <div className="rating-huge-number">{currentDoctor.rating}</div>
            <div className="stars-row mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="star-gold filled" />
              ))}
            </div>
            <small className="text-muted block">
              Based on {currentDoctor.reviewsCount} verified outpatient consultations
            </small>
          </div>

          <div className="recent-reviews-snippet mt-4">
            <div className="mini-review-quote">
              <p>"Dr. Johnson provided clear advice on my hypertension meds and listened with genuine care. The queue tracker was so helpful."</p>
              <small>— Alex Reynolds • Verified Patient</small>
            </div>
            <div className="mini-review-quote mt-2">
              <p>"Excellent clinical guidance via virtual telemedicine call. Prescription was ready immediately."</p>
              <small>— Sophia Martinez • Verified Patient</small>
            </div>
          </div>
        </div>
      </div>

      {/* Video Consultation Modal */}
      <VideoConsultationModal
        isOpen={Boolean(activeVideoApt)}
        onClose={() => setActiveVideoApt(null)}
        appointment={activeVideoApt}
        currentUserRole="doctor"
      />

      {/* Create Prescription Modal */}
      <PrescriptionModal
        isOpen={createRxOpen}
        onClose={() => setCreateRxOpen(false)}
        isCreateMode={true}
        doctor={currentDoctor}
        patients={patients}
      />
    </div>
  );
}

export default DoctorDashboard;
