import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import LiveQueueCard from "../../components/features/LiveQueueCard";
import VideoConsultationModal from "../../components/features/VideoConsultationModal";
import PrescriptionModal from "../../components/features/PrescriptionModal";
import BookingModal from "../../components/features/BookingModal";
import {
  Calendar,
  Clock,
  Video,
  FileText,
  FilePlus2,
  Users,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Star,
  Activity,
  HeartPulse,
  Printer
} from "lucide-react";

export function PatientDashboard() {
  const { user } = useAuth();
  const { appointments, prescriptions, records, doctors } = useApp();

  // Modals state
  const [activeVideoApt, setActiveVideoApt] = useState(null);
  const [activeRx, setActiveRx] = useState(null);
  const [bookingDoc, setBookingDoc] = useState(null);

  // Filter patient's appointments
  const patientApts = appointments.filter(
    (a) => a.patientEmail?.toLowerCase() === user?.email?.toLowerCase() || a.patientId === user?.id
  );

  const upcomingApt = patientApts.find(
    (a) => (a.status === "Confirmed" || a.status === "Pending") && a.date >= new Date().toISOString().split("T")[0]
  ) || patientApts[0];

  const totalCount = patientApts.length;
  const upcomingCount = patientApts.filter((a) => a.status === "Confirmed").length;
  const completedCount = patientApts.filter((a) => a.status === "Completed").length;
  const pendingCount = patientApts.filter((a) => a.status === "Pending").length;

  const patientPrescriptions = prescriptions.filter(
    (p) => p.patientEmail?.toLowerCase() === user?.email?.toLowerCase() || p.patientId === user?.id
  );

  const recommendedDoctors = doctors.filter((d) => d.status === "Active" && d.rating >= 4.8).slice(0, 3);

  return (
    <div className="patient-dashboard-view">
      {/* Welcome Banner */}
      <div className="dash-welcome-banner">
        <div className="welcome-banner-text">
          <span className="section-eyebrow">PATIENT DASHBOARD</span>
          <h1>Good Morning, {user?.name || "Alex Reynolds"}</h1>
          <p>
            Here is your daily medical overview. You have{" "}
            <strong>{upcomingCount} upcoming consultation{upcomingCount !== 1 ? "s" : ""}</strong> scheduled.
          </p>
        </div>

        <div className="welcome-banner-actions">
          <button
            className="button button-primary"
            onClick={() => setBookingDoc(doctors[0])}
          >
            <PlusCircle size={16} /> Book New Appointment
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="dashboard-grid-stats mt-4">
        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-teal">
            <Calendar size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Total Appointments</small>
            <h3>{totalCount}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-emerald">
            <CheckCircle2 size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Upcoming / Confirmed</small>
            <h3>{upcomingCount}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-navy">
            <Activity size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Completed Consults</small>
            <h3>{completedCount}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-amber">
            <Clock size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Pending Approval</small>
            <h3>{pendingCount}</h3>
          </div>
        </div>
      </div>

      {/* Live Queue Tracker Card (Special Feature) */}
      {upcomingApt && (
        <LiveQueueCard appointment={upcomingApt} doctor={doctors.find((d) => d.id === upcomingApt.doctorId)} />
      )}

      {/* Two Column Grid: Upcoming Appointment & Prescriptions */}
      <div className="dash-two-column-grid">
        {/* Next Scheduled Appointment Spotlight */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Next Scheduled Appointment</h3>
              <p>Your upcoming clinical consultation</p>
            </div>
            <Link to="/patient/appointments" className="text-teal font-semibold text-sm">
              View All ({patientApts.length}) →
            </Link>
          </div>

          {upcomingApt ? (
            <div className="upcoming-highlight-card">
              <div className="highlight-doc-header">
                <img
                  src={upcomingApt.doctorImage}
                  alt={upcomingApt.doctorName}
                  className="highlight-doc-avatar"
                />
                <div className="highlight-doc-info">
                  <h4>{upcomingApt.doctorName}</h4>
                  <span className="doc-specialty-pill">{upcomingApt.doctorSpecialty}</span>
                  <p className="mt-1 text-sm text-muted">{upcomingApt.reason}</p>
                </div>
                <span className={`status-badge badge-${upcomingApt.status.toLowerCase()}`}>
                  {upcomingApt.status}
                </span>
              </div>

              <div className="highlight-schedule-row">
                <div className="sched-tile">
                  <Calendar size={15} className="text-teal" />
                  <span>{upcomingApt.date}</span>
                </div>
                <div className="sched-tile">
                  <Clock size={15} className="text-teal" />
                  <span>{upcomingApt.time}</span>
                </div>
                <div className="sched-tile">
                  {upcomingApt.type === "Online" ? <Video size={15} className="text-teal" /> : <HeartPulse size={15} className="text-teal" />}
                  <span>{upcomingApt.type} Consultation</span>
                </div>
                <div className="sched-tile">
                  <strong>Token #{upcomingApt.queueNumber}</strong>
                </div>
              </div>

              <div className="highlight-cta-row">
                {upcomingApt.type === "Online" ? (
                  <button
                    className="button button-primary button-sm"
                    onClick={() => setActiveVideoApt(upcomingApt)}
                  >
                    <Video size={15} /> Enter Virtual Consultation Room
                  </button>
                ) : (
                  <span className="text-sm font-semibold text-secondary">
                    In-Person: Room 402, North Pavilion
                  </span>
                )}
                <Link to="/patient/appointments" className="button button-outline button-sm">
                  Manage or Reschedule
                </Link>
              </div>
            </div>
          ) : (
            <div className="empty-state-card text-center p-4">
              <Calendar size={32} className="text-muted mx-auto mb-2" />
              <p>No upcoming appointments found.</p>
              <button
                className="button button-primary button-sm mt-3"
                onClick={() => setBookingDoc(doctors[0])}
              >
                Schedule Consultation Now
              </button>
            </div>
          )}
        </div>

        {/* Recent Digital Prescriptions */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Recent Prescriptions</h3>
              <p>Electronically verified medical Rx</p>
            </div>
            <Link to="/patient/prescriptions" className="text-teal font-semibold text-sm">
              View All ({patientPrescriptions.length}) →
            </Link>
          </div>

          <div className="mini-rx-list">
            {patientPrescriptions.slice(0, 2).map((rx) => (
              <div key={rx.id} className="mini-rx-item">
                <div className="rx-item-icon">
                  <FilePlus2 size={20} className="text-teal" />
                </div>
                <div className="rx-item-info">
                  <strong>{rx.prescriptionNumber}</strong>
                  <p>{rx.diagnosis}</p>
                  <small>
                    Issued by {rx.doctorName} on {rx.date}
                  </small>
                </div>
                <button
                  className="button button-outline button-xs"
                  onClick={() => setActiveRx(rx)}
                >
                  <Printer size={13} /> View Rx
                </button>
              </div>
            ))}
          </div>

          <div className="dash-rx-footer-note mt-3">
            <small>
              Prescriptions can be printed or exported as verified medical PDFs.
            </small>
          </div>
        </div>
      </div>

      {/* Recommended Doctors Row */}
      <div className="mc-card mt-4">
        <div className="dash-section-header">
          <div>
            <h3>Recommended Specialists</h3>
            <p>Matched by high patient ratings, prompt availability, and clinical specialty</p>
          </div>
          <Link to="/doctors" className="button button-outline button-xs">
            Browse All Specialists →
          </Link>
        </div>

        <div className="recommended-doctors-grid">
          {recommendedDoctors.map((doc) => (
            <div key={doc.id} className="rec-doctor-card">
              <img src={doc.image} alt={doc.name} className="rec-doc-img" />
              <div className="rec-doc-info">
                <div className="d-flex align-center gap-2 mb-1">
                  <span className="doc-specialty-pill">{doc.specialty}</span>
                  <span className="doc-stars-badge">
                    <Star size={12} className="star-gold filled" /> {doc.rating}
                  </span>
                </div>
                <h4>{doc.name}</h4>
                <small className="text-muted">{doc.hospital}</small>
                <div className="rec-doc-bottom mt-2">
                  <span className="rec-doc-fee">${doc.fee} / visit</span>
                  <button
                    className="button button-primary button-xs"
                    onClick={() => setBookingDoc(doc)}
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <VideoConsultationModal
        isOpen={Boolean(activeVideoApt)}
        onClose={() => setActiveVideoApt(null)}
        appointment={activeVideoApt}
        currentUserRole="patient"
      />

      <PrescriptionModal
        isOpen={Boolean(activeRx)}
        onClose={() => setActiveRx(null)}
        prescription={activeRx}
      />

      <BookingModal
        isOpen={Boolean(bookingDoc)}
        onClose={() => setBookingDoc(null)}
        selectedDoctor={bookingDoc}
      />
    </div>
  );
}

export default PatientDashboard;
