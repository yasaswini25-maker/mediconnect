import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import PrescriptionModal from "../../components/features/PrescriptionModal";
import {
  FilePlus2,
  Printer,
  PlusCircle,
  Search,
  Eye,
  CheckCircle2,
  Calendar,
  User
} from "lucide-react";

export function DoctorPrescriptions() {
  const { user } = useAuth();
  const { doctors, prescriptions, patients } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const docPrescriptions = prescriptions.filter(
    (p) => p.doctorId === currentDoctor.id || p.doctorName === currentDoctor.name
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewingRx, setViewingRx] = useState(null);

  const filtered = docPrescriptions.filter((rx) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      rx.prescriptionNumber.toLowerCase().includes(q) ||
      rx.patientName.toLowerCase().includes(q) ||
      rx.diagnosis.toLowerCase().includes(q)
    );
  });

  return (
    <div className="doctor-prescriptions-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Electronic Prescriptions Ledger</h2>
          <p>Issue, verify, and digitally archive clinical prescriptions for your patients</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => setCreateModalOpen(true)}
        >
          <PlusCircle size={16} /> New Prescription
        </button>
      </div>

      {/* Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="search-input-wrap full-width">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search by Rx number, patient name, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Rx Document #</th>
                <th>Patient Details</th>
                <th>Date Issued</th>
                <th>Diagnosis Summary</th>
                <th>Prescribed Medicines</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    No prescriptions found. Click "New Prescription" to issue an Rx.
                  </td>
                </tr>
              ) : (
                filtered.map((rx) => (
                  <tr key={rx.id}>
                    <td>
                      <strong className="text-teal font-mono">{rx.prescriptionNumber}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{rx.patientName}</strong>
                        <small className="block text-muted">{rx.patientAge || 38} yrs • {rx.patientGender || "Patient"}</small>
                      </div>
                    </td>
                    <td>
                      <span>{rx.date}</span>
                    </td>
                    <td>
                      <span className="text-sm font-medium">{rx.diagnosis}</span>
                    </td>
                    <td>
                      <span className="doc-specialty-pill">
                        {rx.medicines?.length || 0} Medications
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="d-flex justify-end gap-2">
                        <button
                          className="button button-outline button-xs"
                          onClick={() => setViewingRx(rx)}
                        >
                          <Printer size={13} /> Print / View Rx
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <PrescriptionModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        isCreateMode={true}
        doctor={currentDoctor}
        patients={patients}
      />

      {/* View Modal */}
      <PrescriptionModal
        isOpen={Boolean(viewingRx)}
        onClose={() => setViewingRx(null)}
        prescription={viewingRx}
      />
    </div>
  );
}

export default DoctorPrescriptions;
