import { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Stethoscope,
  HeartPulse
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export function PrescriptionModal({
  isOpen,
  onClose,
  prescription,
  isCreateMode = false,
  doctor,
  patients = []
}) {
  const { createPrescription } = useApp();

  // Create Mode state
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "pat-1");
  const [diagnosis, setDiagnosis] = useState("");
  const [bp, setBp] = useState("120/80 mmHg");
  const [heartRate, setHeartRate] = useState("72 bpm");
  const [weight, setWeight] = useState("70 kg");
  const [temp, setTemp] = useState("98.6 °F");
  const [generalAdvice, setGeneralAdvice] = useState(
    "Drink plenty of fluids, avoid strenuous activity for 48 hours, and follow the medication schedule strictly."
  );
  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "Twice daily after meals",
      duration: "7 days",
      instructions: "Take with warm water."
    }
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "Once daily with meal",
        duration: "14 days",
        instructions: ""
      }
    ]);
  };

  const handleRemoveMedicine = (idx) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleMedChange = (idx, field, val) => {
    const updated = [...medicines];
    updated[idx][field] = val;
    setMedicines(updated);
  };

  const handleSavePrescription = (e) => {
    e.preventDefault();
    const pat = patients.find((p) => p.id === selectedPatientId) || {
      name: "Alex Reynolds",
      age: 38,
      gender: "Male",
      email: "patient@mediconnect.com"
    };

    createPrescription({
      patientId: pat.id,
      patientName: pat.name,
      patientAge: pat.age || 38,
      patientGender: pat.gender || "Male",
      patientEmail: pat.email,
      doctorId: doctor?.id || "doc-1",
      doctorName: doctor?.name || "Dr. Sarah Johnson",
      doctorSpecialty: doctor?.specialty || "Cardiology",
      doctorHospital: doctor?.hospital || "MediConnect Central Medical Pavilion",
      diagnosis: diagnosis || "Acute consultation review",
      vitals: {
        bloodPressure: bp,
        heartRate: heartRate,
        weight: weight,
        temperature: temp
      },
      medicines: medicines.filter((m) => m.name.trim() !== ""),
      generalAdvice
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  // View Mode for Existing Prescription
  if (!isCreateMode && prescription) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="prescription-view-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Bar */}
          <div className="rx-action-bar no-print">
            <span className="rx-preview-badge">Official Digital Medical Document</span>
            <div className="rx-actions-right">
              <button className="button button-outline button-sm" onClick={handlePrint}>
                <Printer size={15} /> Print / Save PDF
              </button>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Document Area */}
          <div className="rx-document-printable" id="printable-prescription">
            {/* Header */}
            <div className="rx-doc-header">
              <div className="rx-clinic-brand">
                <div className="rx-brand-icon">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h2>MediConnect Health System</h2>
                  <p>{prescription.doctorHospital || "Central Medical Pavilion"}</p>
                  <small>Reg. Clinical Facility: MC-NY-9021 • 24/7 Helpline: 1-800-555-CARE</small>
                </div>
              </div>

              <div className="rx-meta-box">
                <div className="rx-number">{prescription.prescriptionNumber}</div>
                <div className="rx-date">Date: {prescription.date}</div>
              </div>
            </div>

            <div className="rx-divider" />

            {/* Doctor & Patient Info */}
            <div className="rx-parties-grid">
              <div className="rx-party-col">
                <span className="party-title">PRESCRIBING PHYSICIAN</span>
                <h4>{prescription.doctorName}</h4>
                <p>{prescription.doctorSpecialty}</p>
                <small>License ID: MC-MD-448921</small>
              </div>

              <div className="rx-party-col">
                <span className="party-title">PATIENT INFORMATION</span>
                <h4>{prescription.patientName}</h4>
                <p>
                  Age: {prescription.patientAge || 38} yrs • Gender:{" "}
                  {prescription.patientGender || "Male"}
                </p>
                <small>Patient Record ID: {prescription.patientId}</small>
              </div>
            </div>

            {/* Vitals Bar */}
            {prescription.vitals && (
              <div className="rx-vitals-bar">
                <div className="rx-vital-item">
                  <small>Blood Pressure:</small>
                  <strong>{prescription.vitals.bloodPressure || "120/80 mmHg"}</strong>
                </div>
                <div className="rx-vital-item">
                  <small>Heart Rate:</small>
                  <strong>{prescription.vitals.heartRate || "74 bpm"}</strong>
                </div>
                <div className="rx-vital-item">
                  <small>Body Weight:</small>
                  <strong>{prescription.vitals.weight || "79 kg"}</strong>
                </div>
                <div className="rx-vital-item">
                  <small>Temp:</small>
                  <strong>{prescription.vitals.temperature || "98.6 °F"}</strong>
                </div>
              </div>
            )}

            {/* Diagnosis */}
            <div className="rx-diagnosis-block">
              <strong>Clinical Diagnosis:</strong>
              <p>{prescription.diagnosis}</p>
            </div>

            {/* Prescription Symbol & Medicines Table */}
            <div className="rx-medicines-section">
              <div className="rx-symbol">℞</div>

              <table className="rx-table">
                <thead>
                  <tr>
                    <th>Medication & Formulation</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.medicines?.map((med, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{med.name}</strong>
                      </td>
                      <td>{med.dosage}</td>
                      <td>{med.frequency}</td>
                      <td>{med.duration}</td>
                      <td><small>{med.instructions}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Advice & Instructions */}
            {prescription.generalAdvice && (
              <div className="rx-advice-box">
                <strong>Dietary & Clinical Advice:</strong>
                <p>{prescription.generalAdvice}</p>
              </div>
            )}

            {/* Signature Area */}
            <div className="rx-signature-footer">
              <div className="rx-qr-placeholder">
                <div className="fake-qr-code">
                  <span>VERIFIED ELECTRONIC RX</span>
                </div>
                <small>Scan to verify authenticity with MediConnect EHR</small>
              </div>

              <div className="rx-physician-sign">
                <div className="signature-handwritten">
                  {prescription.doctorName}
                </div>
                <div className="signature-line" />
                <p>Digital Physician Signature</p>
                <small>Signed securely via MediConnect Provider Vault</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Mode Form for Doctor
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: "720px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Create Digital Prescription</h3>
            <p className="modal-subtitle">Generate an official electronically signed Rx for patient</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSavePrescription} className="modal-body">
          {savedSuccess && (
            <div className="notice-banner banner-success mb-3">
              <CheckCircle2 size={16} /> Prescription generated and synced to patient records!
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-group">
              <label>Select Patient</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                required
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.gender || "Patient"}, {p.bloodGroup || "O+"})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Clinical Diagnosis</label>
              <input
                type="text"
                placeholder="e.g. Mild Hypertension, Acute Pharyngitis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="vitals-input-row">
            <div className="vital-field">
              <label>Blood Pressure</label>
              <input value={bp} onChange={(e) => setBp(e.target.value)} placeholder="120/80" />
            </div>
            <div className="vital-field">
              <label>Heart Rate</label>
              <input value={heartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="72 bpm" />
            </div>
            <div className="vital-field">
              <label>Weight</label>
              <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70 kg" />
            </div>
            <div className="vital-field">
              <label>Temperature</label>
              <input value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="98.6 °F" />
            </div>
          </div>

          <div className="mt-4 mb-2 d-flex-between">
            <label className="font-semibold text-navy">Prescribed Medications</label>
            <button
              type="button"
              className="button button-outline button-xs"
              onClick={handleAddMedicine}
            >
              <Plus size={14} /> Add Medicine
            </button>
          </div>

          <div className="medicines-repeater">
            {medicines.map((med, idx) => (
              <div key={idx} className="medicine-repeater-row">
                <div className="med-col-name">
                  <input
                    type="text"
                    placeholder="Medicine Name (e.g. Amoxicillin)"
                    value={med.name}
                    onChange={(e) => handleMedChange(idx, "name", e.target.value)}
                    required
                  />
                </div>
                <div className="med-col-dosage">
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 500mg)"
                    value={med.dosage}
                    onChange={(e) => handleMedChange(idx, "dosage", e.target.value)}
                    required
                  />
                </div>
                <div className="med-col-freq">
                  <input
                    type="text"
                    placeholder="Frequency (e.g. 2x Daily)"
                    value={med.frequency}
                    onChange={(e) => handleMedChange(idx, "frequency", e.target.value)}
                  />
                </div>
                <div className="med-col-duration">
                  <input
                    type="text"
                    placeholder="Duration (e.g. 7 days)"
                    value={med.duration}
                    onChange={(e) => handleMedChange(idx, "duration", e.target.value)}
                  />
                </div>
                {medicines.length > 1 && (
                  <button
                    type="button"
                    className="med-col-remove"
                    onClick={() => handleRemoveMedicine(idx)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group mt-3">
            <label>General Advice & Instructions</label>
            <textarea
              rows={2}
              value={generalAdvice}
              onChange={(e) => setGeneralAdvice(e.target.value)}
              placeholder="Lifestyle recommendations, hydration, diet, cautionary notes..."
            />
          </div>

          <div className="modal-footer mt-4">
            <button type="button" className="button button-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              Issue Digital Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrescriptionModal;
