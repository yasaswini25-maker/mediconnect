import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import VideoConsultationModal from "../../components/features/VideoConsultationModal";
import BookingModal from "../../components/features/BookingModal";
import ReviewModal from "../../components/features/ReviewModal";
import Modal from "../../components/common/Modal";
import {
  Calendar,
  Clock,
  Video,
  Building,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  PlusCircle,
  FileText,
  Star
} from "lucide-react";

export function PatientAppointments() {
  const { user } = useAuth();
  const { doctors, appointments, cancelAppointment, rescheduleAppointment } = useApp();
  const [reviewDoc, setReviewDoc] = useState(null);

  const [activeTab, setActiveTab] = useState("All"); // All, Confirmed, Pending, Completed, Cancelled
  const [searchTerm, setSearchTerm] = useState("");
  const [videoModalApt, setVideoModalApt] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Reschedule Modal
  const [rescheduleApt, setRescheduleApt] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00 AM");

  // Cancel Modal
  const [cancelTargetApt, setCancelTargetApt] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const patientApts = appointments.filter(
    (a) => a.patientEmail?.toLowerCase() === user?.email?.toLowerCase() || a.patientId === user?.id
  );

  const filteredApts = useMemo(() => {
    return patientApts.filter((apt) => {
      const matchesTab = activeTab === "All" || apt.status === activeTab;
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        apt.doctorName.toLowerCase().includes(q) ||
        apt.doctorSpecialty.toLowerCase().includes(q) ||
        apt.reason.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [patientApts, activeTab, searchTerm]);

  const handleOpenReschedule = (apt) => {
    setRescheduleApt(apt);
    setNewDate(apt.date);
    setNewTime(apt.time);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleApt || !newDate) return;
    rescheduleAppointment(rescheduleApt.id, newDate, newTime);
    setRescheduleApt(null);
  };

  const handleConfirmCancel = () => {
    if (!cancelTargetApt) return;
    cancelAppointment(cancelTargetApt.id, cancelReason || "Cancelled by patient");
    setCancelTargetApt(null);
    setCancelReason("");
  };

  const tabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

  return (
    <div className="patient-appointments-view">
      {/* Page Header */}
      <div className="dash-section-header">
        <div>
          <h2>My Clinical Appointments</h2>
          <p>Review, reschedule, track live queue numbers, and attend video consultations</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => setBookingModalOpen(true)}
        >
          <PlusCircle size={16} /> Book New Appointment
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="tabs-pill-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-pill-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="tab-count-badge">
                {tab === "All"
                  ? patientApts.length
                  : patientApts.filter((a) => a.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Filter by doctor, specialty, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="appointments-cards-stack mt-4">
        {filteredApts.length === 0 ? (
          <div className="empty-state-card text-center p-5 mc-card">
            <Calendar size={40} className="text-muted mx-auto mb-2" />
            <h4>No appointments found under "{activeTab}"</h4>
            <p className="text-muted">You do not have any scheduled consultations matching this status.</p>
            <button
              className="button button-outline mt-3"
              onClick={() => setBookingModalOpen(true)}
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          filteredApts.map((apt) => (
            <div key={apt.id} className="apt-item-card mc-card">
              <div className="apt-item-grid">
                {/* Doctor Avatar & Meta */}
                <div className="apt-doc-col">
                  <img src={apt.doctorImage} alt={apt.doctorName} className="apt-doc-avatar" />
                  <div>
                    <h4>{apt.doctorName}</h4>
                    <span className="doc-specialty-pill">{apt.doctorSpecialty}</span>
                    <p className="apt-reason-text mt-1">{apt.reason}</p>
                  </div>
                </div>

                {/* Date & Time details */}
                <div className="apt-details-col">
                  <div className="apt-meta-line">
                    <Calendar size={15} className="text-teal" />
                    <strong>{apt.date}</strong>
                  </div>
                  <div className="apt-meta-line">
                    <Clock size={15} className="text-teal" />
                    <span>{apt.time}</span>
                  </div>
                  <div className="apt-meta-line">
                    {apt.type === "Online" ? <Video size={15} className="text-teal" /> : <Building size={15} className="text-teal" />}
                    <span>{apt.type === "Online" ? "Online Telehealth Room" : "In-Person Clinic"}</span>
                  </div>
                </div>

                {/* Queue & Status */}
                <div className="apt-queue-col">
                  <div className="token-badge-block">
                    <small>Your Token</small>
                    <strong>#{apt.queueNumber}</strong>
                  </div>
                  <div className="mt-1">
                    <span className={`status-badge badge-${apt.status.toLowerCase()}`}>
                      {apt.status}
                    </span>
                  </div>
                  {apt.status === "Confirmed" && (
                    <small className="wait-time-hint">
                      Doctor serving: #{apt.currentServing || 1}
                    </small>
                  )}
                </div>

                {/* Actions */}
                <div className="apt-actions-col">
                  {apt.status === "Confirmed" && apt.type === "Online" && (
                    <button
                      className="button button-primary button-sm"
                      onClick={() => setVideoModalApt(apt)}
                    >
                      <Video size={14} /> Join Video Call
                    </button>
                  )}

                  {apt.status !== "Completed" && apt.status !== "Cancelled" && (
                    <>
                      <button
                        className="button button-outline button-sm"
                        onClick={() => handleOpenReschedule(apt)}
                      >
                        Reschedule
                      </button>
                      <button
                        className="button button-outline button-sm button-danger"
                        onClick={() => setCancelTargetApt(apt)}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {apt.status === "Completed" && (
                    <button
                      type="button"
                      className="button button-outline button-sm text-teal"
                      onClick={() => {
                        const doc = doctors.find((d) => d.id === apt.doctorId);
                        setReviewDoc(
                          doc || {
                            id: apt.doctorId,
                            name: apt.doctorName,
                            specialty: apt.doctorSpecialty,
                            image: apt.doctorImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85",
                            hospital: "MediConnect Medical Pavilion"
                          }
                        );
                      }}
                    >
                      <Star size={14} className="star-gold filled" /> Rate Consultation
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reschedule Modal */}
      <Modal
        isOpen={Boolean(rescheduleApt)}
        onClose={() => setRescheduleApt(null)}
        title="Reschedule Appointment"
        subtitle={`Select a new date and time with ${rescheduleApt?.doctorName}`}
      >
        <form onSubmit={handleConfirmReschedule}>
          <div className="form-group">
            <label>New Consultation Date</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Preferred Time Slot</label>
            <select value={newTime} onChange={(e) => setNewTime(e.target.value)}>
              <option value="09:00 AM">09:00 AM</option>
              <option value="09:45 AM">09:45 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:15 AM">11:15 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:45 PM">02:45 PM</option>
              <option value="03:30 PM">03:30 PM</option>
            </select>
          </div>

          <div className="modal-footer mt-4">
            <button
              type="button"
              className="button button-outline"
              onClick={() => setRescheduleApt(null)}
            >
              Close
            </button>
            <button type="submit" className="button button-primary">
              Confirm Reschedule
            </button>
          </div>
        </form>
      </Modal>

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={Boolean(cancelTargetApt)}
        onClose={() => setCancelTargetApt(null)}
        title="Cancel Appointment"
        subtitle="Are you sure you want to cancel this scheduled consultation?"
      >
        <div>
          <p className="text-sm text-secondary mb-3">
            You are about to cancel your appointment with{" "}
            <strong>{cancelTargetApt?.doctorName}</strong> on{" "}
            <strong>{cancelTargetApt?.date}</strong>.
          </p>

          <div className="form-group">
            <label>Reason for Cancellation (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Schedule conflict, symptoms resolved, etc."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>

          <div className="modal-footer mt-4">
            <button
              type="button"
              className="button button-outline"
              onClick={() => setCancelTargetApt(null)}
            >
              Keep Appointment
            </button>
            <button
              type="button"
              className="button button-danger"
              onClick={handleConfirmCancel}
            >
              Yes, Cancel Appointment
            </button>
          </div>
        </div>
      </Modal>

      {/* Video Call Modal */}
      <VideoConsultationModal
        isOpen={Boolean(videoModalApt)}
        onClose={() => setVideoModalApt(null)}
        appointment={videoModalApt}
        currentUserRole="patient"
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={Boolean(reviewDoc)}
        onClose={() => setReviewDoc(null)}
        doctor={reviewDoc}
      />
    </div>
  );
}

export default PatientAppointments;
