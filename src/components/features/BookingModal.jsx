import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  User
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import smsService from "../../services/smsService";

export function BookingModal({ isOpen, onClose, selectedDoctor = null }) {
  const { doctors, bookAppointment } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [doctorId, setDoctorId] = useState(selectedDoctor?.id || doctors[0]?.id || "doc-1");
  const [consultType, setConsultType] = useState("Online");
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const [reason, setReason] = useState("");
  const [successBooking, setSuccessBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const currentDoctor = doctors.find((d) => d.id === (selectedDoctor?.id || doctorId)) || doctors[0];
  const availableSlots = currentDoctor?.availability?.slots || [
    "09:00 AM",
    "09:45 AM",
    "10:30 AM",
    "11:15 AM",
    "02:00 PM",
    "02:45 PM",
    "03:30 PM",
    "04:15 PM"
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!user) {
      setErrorMsg("Please log in or create an account to confirm your appointment.");
      return;
    }

    try {
      const apt = bookAppointment({
        doctorId: currentDoctor.id,
        date,
        time: selectedSlot,
        type: consultType,
        reason: reason || "Routine Consultation",
        fee: currentDoctor.fee
      });

      // Dispatch real-time SMS to user's registered phone
      smsService.sendAppointmentSms({
        phone: user.phone || "+1 (555) 712-4433",
        patientName: user.name,
        doctorName: currentDoctor.name,
        date,
        time: selectedSlot,
        tokenNumber: apt.queueNumber,
        waitMinutes: apt.estimatedWaitMinutes
      });

      setSuccessBooking(apt);
    } catch (err) {
      setErrorMsg(err.message || "Failed to book appointment.");
    }
  };

  const handleFinish = () => {
    setSuccessBooking(null);
    onClose();
    navigate("/patient/appointments");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: "620px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Schedule Clinical Consultation</h3>
            <p className="modal-subtitle">Instant appointment booking with verified specialist</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {successBooking ? (
          <div className="modal-body booking-success-body">
            <div className="booking-success-icon-wrap">
              <CheckCircle2 size={56} className="text-teal" />
            </div>
            <h3>Appointment Confirmed!</h3>
            <p className="success-tagline">
              Your consultation with <strong>{successBooking.doctorName}</strong> has been secured.
            </p>

            <div className="booking-receipt-card">
              <div className="receipt-row">
                <span>Date & Time:</span>
                <strong>{successBooking.date} at {successBooking.time}</strong>
              </div>
              <div className="receipt-row">
                <span>Consultation Mode:</span>
                <strong>{successBooking.type === "Online" ? "Online Video Call" : "In-Person Clinic"}</strong>
              </div>
              <div className="receipt-row">
                <span>Your Token Number:</span>
                <strong className="text-teal">#{successBooking.queueNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>Consultation Fee:</span>
                <strong>${successBooking.fee} (Pre-authorized)</strong>
              </div>
            </div>

            <div className="booking-success-actions mt-4">
              <button className="button button-primary full-width" onClick={handleFinish}>
                View in My Appointments →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="modal-body">
            {errorMsg && (
              <div className="notice-banner banner-danger mb-3">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}

            {/* Doctor Picker if not pre-locked */}
            {!selectedDoctor && (
              <div className="form-group">
                <label>Select Specialist</label>
                <select
                  value={doctorId}
                  onChange={(e) => {
                    setDoctorId(e.target.value);
                    setSelectedSlot(availableSlots[0]);
                  }}
                >
                  {doctors
                    .filter((d) => d.status === "Active")
                    .map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.specialty} (${doc.fee})
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Doctor Summary Preview */}
            <div className="booking-doc-preview">
              <img
                src={currentDoctor?.image}
                alt={currentDoctor?.name}
                className="booking-doc-avatar"
              />
              <div className="booking-doc-meta">
                <h4>{currentDoctor?.name}</h4>
                <p className="text-teal font-medium">{currentDoctor?.specialty}</p>
                <small>{currentDoctor?.hospital} • Fee: ${currentDoctor?.fee}</small>
              </div>
            </div>

            {/* Consultation Mode Selector */}
            <div className="form-group mt-3">
              <label>Consultation Mode</label>
              <div className="mode-toggle-grid">
                <button
                  type="button"
                  className={`mode-tile ${consultType === "Online" ? "active" : ""}`}
                  onClick={() => setConsultType("Online")}
                >
                  <Video size={20} />
                  <div>
                    <strong>Online Telehealth</strong>
                    <small>Encrypted video consultation</small>
                  </div>
                </button>

                <button
                  type="button"
                  className={`mode-tile ${consultType === "In-Person" ? "active" : ""}`}
                  onClick={() => setConsultType("In-Person")}
                >
                  <Building size={20} />
                  <div>
                    <strong>In-Person Visit</strong>
                    <small>{currentDoctor?.room || "Hospital Pavilion"}</small>
                  </div>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="form-group mt-3">
              <label>Select Date</label>
              <div className="input-with-icon">
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="form-group mt-3">
              <label>Available Consultation Slots</label>
              <div className="slots-grid">
                {availableSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`slot-chip ${selectedSlot === slot ? "selected" : ""}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <Clock size={12} /> {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason for visit */}
            <div className="form-group mt-3">
              <label>Reason for Visit / Symptoms</label>
              <input
                type="text"
                placeholder="e.g. Regular blood pressure checkup, joint stiffness..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div className="modal-footer mt-4">
              <button type="button" className="button button-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Confirm & Book (${currentDoctor?.fee})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
