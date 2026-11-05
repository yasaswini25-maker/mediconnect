import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import VideoConsultationModal from "../../components/features/VideoConsultationModal";
import PrescriptionModal from "../../components/features/PrescriptionModal";
import Modal from "../../components/common/Modal";
import {
  Calendar,
  Clock,
  Video,
  Building,
  Search,
  CheckCircle2,
  XCircle,
  FilePlus2,
  User,
  Filter,
  MessageSquare
} from "lucide-react";

export function DoctorAppointments() {
  const { user } = useAuth();
  const { doctors, appointments, patients, updateAppointmentStatus, initiateCall } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const docApts = appointments.filter(
    (a) => a.doctorId === currentDoctor.id || a.doctorName === currentDoctor.name
  );

  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [videoModalApt, setVideoModalApt] = useState(null);
  const [rxTargetPatient, setRxTargetPatient] = useState(null);

  // Notes Modal state for marking completed
  const [completeTargetApt, setCompleteTargetApt] = useState(null);
  const [consultNotes, setConsultNotes] = useState("");

  const filteredApts = useMemo(() => {
    return docApts.filter((apt) => {
      const matchesTab = activeTab === "All" || apt.status === activeTab;
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        apt.patientName.toLowerCase().includes(q) ||
        apt.reason.toLowerCase().includes(q) ||
        apt.date.includes(q);
      return matchesTab && matchesSearch;
    });
  }, [docApts, activeTab, searchTerm]);

  const handleOpenCompleteModal = (apt) => {
    setCompleteTargetApt(apt);
    setConsultNotes(apt.notes || "Patient examined. Normal vital signs reported. Follow-up advised.");
  };

  const handleSaveComplete = (e) => {
    e.preventDefault();
    if (!completeTargetApt) return;
    updateAppointmentStatus(completeTargetApt.id, "Completed", consultNotes);
    setCompleteTargetApt(null);
  };

  const tabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

  return (
    <div className="doctor-appointments-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Patient Appointments & Clinical Schedule</h2>
          <p>Approve incoming consultation requests, start telemedicine calls, and complete sessions</p>
        </div>
      </div>

      {/* Tabs and Search */}
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
                  ? docApts.length
                  : docApts.filter((a) => a.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search by patient name, reason, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table of Appointments */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Schedule & Token</th>
                <th>Mode</th>
                <th>Clinical Reason</th>
                <th>Status</th>
                <th className="text-right">Clinical Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    No appointments matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredApts.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div>
                        <strong>{apt.patientName}</strong>
                        <small className="block text-muted">{apt.patientPhone || apt.patientEmail}</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{apt.date} at {apt.time}</strong>
                        <small className="block text-teal font-semibold">Token #{apt.queueNumber}</small>
                      </div>
                    </td>
                    <td>
                      <span className="doc-specialty-pill">{apt.type}</span>
                    </td>
                    <td>
                      <span className="text-sm">{apt.reason}</span>
                    </td>
                    <td>
                      <span className={`status-badge badge-${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="d-flex justify-end gap-2">
                        {apt.status === "Pending" && (
                          <>
                            <button
                              className="button button-primary button-xs"
                              onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}
                            >
                              Approve
                            </button>
                            <button
                              className="button button-outline button-xs button-danger"
                              onClick={() => updateAppointmentStatus(apt.id, "Cancelled", "Declined by physician")}
                            >
                              Decline
                            </button>
                          </>
                        )}

                        {apt.status === "Confirmed" && (
                          <>
                            {apt.type === "Online" && (
                              <button
                                className="button button-primary button-xs"
                                onClick={() => {
                                  setVideoModalApt(apt);
                                  initiateCall({ appointment: apt, doctor: currentDoctor });
                                }}
                              >
                                <Video size={13} /> Call
                              </button>
                            )}
                            <button
                              className="button button-outline button-xs"
                              onClick={() => handleOpenCompleteModal(apt)}
                            >
                              Complete
                            </button>
                            <button
                              className="button button-outline button-xs"
                              onClick={() => setRxTargetPatient(apt)}
                            >
                              <FilePlus2 size={13} /> Rx
                            </button>
                          </>
                        )}

                        {apt.status === "Completed" && (
                          <span className="text-xs text-muted font-medium">Session Closed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consultation Complete & Notes Modal */}
      <Modal
        isOpen={Boolean(completeTargetApt)}
        onClose={() => setCompleteTargetApt(null)}
        title="Conclude Consultation Session"
        subtitle={`Record final clinical diagnosis & consultation summary for ${completeTargetApt?.patientName}`}
      >
        <form onSubmit={handleSaveComplete}>
          <div className="form-group">
            <label>Physician Clinical Notes & Observations</label>
            <textarea
              rows={4}
              required
              placeholder="Record vitals, diagnosis, and post-consultation recommendations..."
              value={consultNotes}
              onChange={(e) => setConsultNotes(e.target.value)}
            />
          </div>

          <div className="modal-footer mt-4">
            <button
              type="button"
              className="button button-outline"
              onClick={() => setCompleteTargetApt(null)}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              <CheckCircle2 size={16} /> Finalize & Mark Completed
            </button>
          </div>
        </form>
      </Modal>

      {/* Video Call Modal */}
      <VideoConsultationModal
        isOpen={Boolean(videoModalApt)}
        onClose={() => setVideoModalApt(null)}
        appointment={videoModalApt}
        currentUserRole="doctor"
      />

      {/* Prescription Modal */}
      <PrescriptionModal
        isOpen={Boolean(rxTargetPatient)}
        onClose={() => setRxTargetPatient(null)}
        isCreateMode={true}
        doctor={currentDoctor}
        patients={patients}
      />
    </div>
  );
}

export default DoctorAppointments;
