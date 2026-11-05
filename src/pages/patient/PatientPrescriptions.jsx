import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import pdfService from "../../services/pdfService";
import PrescriptionModal from "../../components/features/PrescriptionModal";
import {
  FilePlus2,
  Printer,
  Calendar,
  Stethoscope,
  Building,
  Search,
  Eye,
  CheckCircle2,
  Download
} from "lucide-react";

export function PatientPrescriptions() {
  const { user } = useAuth();
  const { prescriptions, triggerAlert } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [activePrescription, setActivePrescription] = useState(null);

  const patientPrescriptions = prescriptions.filter(
    (p) =>
      p.patientEmail?.toLowerCase() === user?.email?.toLowerCase() ||
      p.patientId === user?.id ||
      p.patientId === "pat-1"
  );

  const filteredRx = patientPrescriptions.filter((rx) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      rx.prescriptionNumber.toLowerCase().includes(q) ||
      rx.doctorName.toLowerCase().includes(q) ||
      rx.diagnosis.toLowerCase().includes(q) ||
      rx.medicines?.some((m) => m.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="patient-prescriptions-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Digital Prescriptions & Medication Schedules</h2>
          <p>Access electronically signed prescriptions with dosage directions and print-ready copies</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="search-input-wrap full-width">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search prescriptions by Rx number, medicine name, diagnosis, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Prescriptions Grid / Cards */}
      <div className="prescriptions-cards-grid mt-4">
        {filteredRx.length === 0 ? (
          <div className="empty-state-card text-center p-5 mc-card full-width">
            <FilePlus2 size={42} className="text-muted mx-auto mb-2" />
            <h4>No Digital Prescriptions Found</h4>
            <p className="text-muted">Prescriptions issued during your consultations will appear here automatically.</p>
          </div>
        ) : (
          filteredRx.map((rx) => (
            <div key={rx.id} className="rx-card-item mc-card">
              <div className="rx-card-top-header">
                <div className="rx-badge-group">
                  <span className="rx-symbol-small">℞</span>
                  <div>
                    <h4 className="rx-num-title">{rx.prescriptionNumber}</h4>
                    <small className="text-muted">Issued: {rx.date}</small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="button button-outline button-xs"
                    onClick={() => setActivePrescription(rx)}
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    className="button button-primary button-xs record-download-btn-gradient"
                    onClick={() => {
                      pdfService.downloadPrescription(rx);
                      triggerAlert({
                        title: "Prescription Downloaded",
                        message: `${rx.prescriptionNumber}.pdf saved to your downloads.`,
                        type: "success"
                      });
                    }}
                    title="Download official digital prescription PDF"
                  >
                    <Download size={13} /> PDF
                  </button>
                </div>
              </div>

              <div className="rx-card-body-info mt-3">
                <div className="rx-doc-stamp mb-2">
                  <Stethoscope size={14} className="text-teal" />
                  <span>{rx.doctorName} ({rx.doctorSpecialty})</span>
                </div>

                <div className="rx-diagnosis-snippet">
                  <strong>Diagnosis:</strong>
                  <p>{rx.diagnosis}</p>
                </div>

                {rx.vitals && (
                  <div className="rx-vitals-mini mt-2">
                    <span>BP: {rx.vitals.bloodPressure || "120/80"}</span>
                    <span>• HR: {rx.vitals.heartRate || "74 bpm"}</span>
                  </div>
                )}

                <div className="rx-meds-summary-box mt-3">
                  <span className="text-xs font-semibold text-secondary block mb-1">
                    Medications ({rx.medicines?.length || 0}):
                  </span>
                  <ul className="rx-meds-bullet-list">
                    {rx.medicines?.map((m, idx) => (
                      <li key={idx} className="rx-med-item">
                        <strong>{m.name}</strong> — {m.dosage} ({m.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rx-card-footer-action mt-4">
                <button
                  className="button button-primary button-sm full-width"
                  onClick={() => setActivePrescription(rx)}
                >
                  <Eye size={15} /> View Full Electronic Prescription
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prescription View Modal */}
      <PrescriptionModal
        isOpen={Boolean(activePrescription)}
        onClose={() => setActivePrescription(null)}
        prescription={activePrescription}
      />
    </div>
  );
}

export default PatientPrescriptions;
