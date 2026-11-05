import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import PrescriptionModal from "../../components/features/PrescriptionModal";
import Modal from "../../components/common/Modal";
import {
  Users,
  Search,
  FilePlus2,
  Eye,
  Heart,
  ShieldCheck,
  Calendar,
  Phone,
  Mail,
  AlertCircle
} from "lucide-react";

export function DoctorPatients() {
  const { user } = useAuth();
  const { doctors, patients, appointments } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [rxModalPatient, setRxModalPatient] = useState(null);

  const filteredPatients = patients.filter((pat) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      pat.name.toLowerCase().includes(q) ||
      pat.email.toLowerCase().includes(q) ||
      pat.phone?.includes(q) ||
      pat.bloodGroup?.toLowerCase().includes(q)
    );
  });

  const getPatientVisits = (patEmail) => {
    return appointments.filter(
      (a) => a.patientEmail?.toLowerCase() === patEmail?.toLowerCase()
    );
  };

  return (
    <div className="doctor-patients-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Patient Management & Medical Histories</h2>
          <p>Review comprehensive clinical records, allergies, chronic conditions, and previous visits</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="search-input-wrap full-width">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search patients by name, email, phone, or blood group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Demographics</th>
                <th>Blood Group</th>
                <th>Allergies & Conditions</th>
                <th>Insurance Provider</th>
                <th className="text-right">Clinical Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((pat) => (
                <tr key={pat.id}>
                  <td>
                    <div className="d-flex align-center gap-3">
                      <img
                        src={pat.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                        alt={pat.name}
                        className="avatar-img-sm"
                      />
                      <div>
                        <strong>{pat.name}</strong>
                        <small className="block text-muted">{pat.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{pat.age || 38} yrs • {pat.gender || "Male"}</span>
                    <small className="block text-muted">{pat.phone}</small>
                  </td>
                  <td>
                    <span className="role-tag role-patient">{pat.bloodGroup || "O+"}</span>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {pat.allergies?.map((al, idx) => (
                        <span key={idx} className="badge-cancelled text-xs px-2 py-0.5 rounded">
                          {al}
                        </span>
                      ))}
                      {pat.chronicConditions?.map((cc, idx) => (
                        <span key={idx} className="badge-pending text-xs px-2 py-0.5 rounded">
                          {cc}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-semibold text-secondary">
                      {pat.insurance?.provider || "Self-Pay"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex justify-end gap-2">
                      <button
                        className="button button-outline button-xs"
                        onClick={() => setSelectedPatientHistory(pat)}
                      >
                        <Eye size={13} /> View EHR
                      </button>
                      <button
                        className="button button-primary button-xs"
                        onClick={() => setRxModalPatient(pat)}
                      >
                        <FilePlus2 size={13} /> Write Rx
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient EHR History Modal */}
      <Modal
        isOpen={Boolean(selectedPatientHistory)}
        onClose={() => setSelectedPatientHistory(null)}
        title={`Electronic Health Record: ${selectedPatientHistory?.name}`}
        subtitle={`Patient ID: ${selectedPatientHistory?.id} • Blood Group: ${selectedPatientHistory?.bloodGroup || "O+"}`}
      >
        {selectedPatientHistory && (
          <div className="patient-ehr-modal-body">
            <div className="ehr-summary-grid mb-3">
              <div className="ehr-tile">
                <small>Known Allergies:</small>
                <strong>{selectedPatientHistory.allergies?.join(", ") || "None Reported"}</strong>
              </div>
              <div className="ehr-tile">
                <small>Chronic Conditions:</small>
                <strong>{selectedPatientHistory.chronicConditions?.join(", ") || "None"}</strong>
              </div>
              <div className="ehr-tile">
                <small>Emergency Contact:</small>
                <strong>
                  {selectedPatientHistory.emergencyContact?.name} ({selectedPatientHistory.emergencyContact?.relation}) - {selectedPatientHistory.emergencyContact?.phone}
                </strong>
              </div>
            </div>

            <h5 className="font-semibold text-secondary mb-2 mt-4">Consultation & Visit History:</h5>
            <div className="past-visits-list">
              {getPatientVisits(selectedPatientHistory.email).map((v) => (
                <div key={v.id} className="visit-history-item p-3 bg-surface-alt rounded mb-2">
                  <div className="d-flex justify-between align-center">
                    <strong>{v.reason}</strong>
                    <span className={`status-badge badge-${v.status.toLowerCase()}`}>{v.status}</span>
                  </div>
                  <small className="text-muted block mt-1">
                    Date: {v.date} at {v.time} • Mode: {v.type}
                  </small>
                  {v.notes && (
                    <p className="text-xs text-secondary mt-1 bg-white p-2 rounded border">
                      <strong>Clinical Notes:</strong> {v.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-footer mt-4">
              <button
                className="button button-outline"
                onClick={() => setSelectedPatientHistory(null)}
              >
                Close Record
              </button>
              <button
                className="button button-primary"
                onClick={() => {
                  const pat = selectedPatientHistory;
                  setSelectedPatientHistory(null);
                  setRxModalPatient(pat);
                }}
              >
                <FilePlus2 size={15} /> Prescribe Medication
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Prescription Creator Modal */}
      <PrescriptionModal
        isOpen={Boolean(rxModalPatient)}
        onClose={() => setRxModalPatient(null)}
        isCreateMode={true}
        doctor={currentDoctor}
        patients={patients}
      />
    </div>
  );
}

export default DoctorPatients;
