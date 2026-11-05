import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/common/Modal";
import {
  Users,
  Search,
  Eye,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Calendar,
  AlertCircle
} from "lucide-react";

export function ManagePatients() {
  const { patients } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientList, setPatientList] = useState(patients);

  const filteredPatients = patientList.filter((pat) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      pat.name.toLowerCase().includes(q) ||
      pat.email.toLowerCase().includes(q) ||
      pat.phone?.includes(q) ||
      pat.bloodGroup?.toLowerCase().includes(q)
    );
  });

  const toggleStatus = (patientId) => {
    setPatientList(
      patientList.map((p) =>
        p.id === patientId
          ? { ...p, status: p.status === "Active" ? "Suspended" : "Active" }
          : p
      )
    );
  };

  return (
    <div className="manage-patients-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Patient Registry & Account Administration</h2>
          <p>Oversee registered hospital patients, medical record IDs, and account security statuses</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="search-input-wrap full-width">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search patients by name, email, phone number, or blood group..."
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
                <th>Contact Info</th>
                <th>Age / Gender</th>
                <th>Blood Group</th>
                <th>Account Status</th>
                <th className="text-right">Actions</th>
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
                        <small className="block text-muted">ID: {pat.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{pat.email}</span>
                    <small className="block text-muted">{pat.phone}</small>
                  </td>
                  <td>
                    <span>{pat.age || 38} yrs • {pat.gender || "Patient"}</span>
                  </td>
                  <td>
                    <span className="role-tag role-patient">{pat.bloodGroup || "O+"}</span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        pat.status === "Active" ? "badge-confirmed" : "badge-cancelled"
                      }`}
                    >
                      {pat.status || "Active"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex justify-end gap-2">
                      <button
                        className="button button-outline button-xs"
                        onClick={() => setSelectedPatient(pat)}
                      >
                        <Eye size={13} /> View File
                      </button>
                      <button
                        className="button button-outline button-xs"
                        onClick={() => toggleStatus(pat.id)}
                      >
                        {pat.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Modal */}
      <Modal
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title={`Patient Master File: ${selectedPatient?.name}`}
        subtitle={`System ID: ${selectedPatient?.id} • Registered Date: ${selectedPatient?.registeredDate || "2025-01-15"}`}
      >
        {selectedPatient && (
          <div className="patient-admin-file-body">
            <div className="ehr-summary-grid mb-3">
              <div className="ehr-tile">
                <small>Blood Group & Age:</small>
                <strong>{selectedPatient.bloodGroup || "O+"} • {selectedPatient.age || 38} yrs</strong>
              </div>
              <div className="ehr-tile">
                <small>Residential Address:</small>
                <strong>{selectedPatient.address || "Springfield, OR"}</strong>
              </div>
              <div className="ehr-tile">
                <small>Insurance Provider:</small>
                <strong>{selectedPatient.insurance?.provider || "Self-Pay"} ({selectedPatient.insurance?.policyNumber || "N/A"})</strong>
              </div>
            </div>

            <div className="p-3 bg-surface-alt rounded mt-3">
              <h5 className="font-semibold text-secondary mb-1">Emergency Contact:</h5>
              <p className="text-sm">
                <strong>{selectedPatient.emergencyContact?.name}</strong> ({selectedPatient.emergencyContact?.relation}) — {selectedPatient.emergencyContact?.phone}
              </p>
            </div>

            <div className="p-3 bg-surface-alt rounded mt-2">
              <h5 className="font-semibold text-secondary mb-1">Medical Flags:</h5>
              <p className="text-xs text-muted">
                Allergies: {selectedPatient.allergies?.join(", ") || "None"} • Chronic Conditions: {selectedPatient.chronicConditions?.join(", ") || "None"}
              </p>
            </div>

            <div className="modal-footer mt-4">
              <button className="button button-outline" onClick={() => setSelectedPatient(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ManagePatients;
