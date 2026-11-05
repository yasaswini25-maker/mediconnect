import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useLanguage } from "../../context/LanguageContext";
import pdfService from "../../services/pdfService";
import Modal from "../../components/common/Modal";
import {
  FileText,
  UploadCloud,
  Download,
  Filter,
  CheckCircle2,
  Calendar,
  Eye,
  FilePlus,
  Trash2,
  ShieldCheck,
  Search,
  Sparkles
} from "lucide-react";

export function PatientRecords() {
  const { user } = useAuth();
  const { records, uploadRecord, triggerAlert } = useApp();
  const { t } = useLanguage();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewRecord, setPreviewRecord] = useState(null);

  // New record form state
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Lab Report");
  const [newCategory, setNewCategory] = useState("Pathology");
  const [newDoctor, setNewDoctor] = useState("Dr. James Wilson");
  const [newDepartment, setNewDepartment] = useState("General Medicine");
  const [newSummary, setNewSummary] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const patientRecords = records.filter(
    (r) => r.patientId === user?.id || r.patientName === user?.name || r.patientId === "pat-1"
  );

  const filteredRecords = patientRecords.filter((rec) => {
    const matchesCat = categoryFilter === "All" || rec.type === categoryFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      rec.title.toLowerCase().includes(q) ||
      rec.doctorName?.toLowerCase().includes(q) ||
      rec.summary?.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleDownloadPdf = (rec) => {
    const filename = pdfService.downloadLabReport(rec);
    triggerAlert({
      title: "Medical Report Downloaded",
      message: `${rec.title}.pdf verified and saved to your device.`,
      type: "success"
    });
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    uploadRecord({
      patientId: user?.id || "pat-1",
      patientName: user?.name || "Alex Reynolds",
      title: newTitle,
      type: newType,
      category: newCategory,
      doctorName: newDoctor,
      department: newDepartment,
      fileSize: "1.8 MB",
      fileType: "PDF",
      summary: newSummary || "Patient uploaded diagnostic document.",
      downloadUrl: "#sample-download"
    });

    // Reset form
    setNewTitle("");
    setNewSummary("");
    setSelectedFileName("");
    setUploadModalOpen(false);
  };

  return (
    <div className="patient-records-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Electronic Health Records Vault</h2>
          <p>Access your complete diagnostic history, lab panels, scans, and clinical discharge reports</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => setUploadModalOpen(true)}
        >
          <UploadCloud size={16} /> Upload Medical Document
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="tabs-pill-row">
          {["All", "Lab Report", "Diagnostic Scan", "Clinical Note"].map((cat) => (
            <button
              key={cat}
              className={`tab-pill-btn ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search documents by test name, doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Records Table Card */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Document Title</th>
                <th>Type / Specialty</th>
                <th>Prescribed By</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    No medical records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id}>
                    <td>
                      <div className="d-flex align-center gap-3">
                        <div className="doc-icon-square">
                          <FileText size={18} className="text-teal" />
                        </div>
                        <div>
                          <strong>{rec.title}</strong>
                          <small className="block text-muted">{rec.fileSize} • {rec.fileType}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="doc-specialty-pill">{rec.type}</span>
                    </td>
                    <td>
                      <strong>{rec.doctorName || "MediConnect Diagnostics"}</strong>
                      <small className="block text-muted">{rec.department || "Clinical Lab"}</small>
                    </td>
                    <td>
                      <span className="text-sm font-medium">{rec.date}</span>
                    </td>
                    <td>
                      <span className="status-badge badge-confirmed">
                        {rec.status || "Verified"}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="d-flex justify-end gap-2">
                        <button
                          className="button button-outline button-xs"
                          onClick={() => setPreviewRecord(rec)}
                        >
                          <Eye size={13} /> {t("viewSummary")}
                        </button>
                        <button
                          className="button button-primary button-xs record-download-btn-gradient"
                          onClick={() => handleDownloadPdf(rec)}
                          title="Download official PDF report"
                        >
                          <Download size={13} className="download-bounce-icon" /> PDF
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

      {/* Record Preview Modal */}
      <Modal
        isOpen={Boolean(previewRecord)}
        onClose={() => setPreviewRecord(null)}
        title={previewRecord?.title}
        subtitle={`${previewRecord?.type} • Date: ${previewRecord?.date}`}
      >
        {previewRecord && (
          <div className="record-preview-modal-body">
            <div className="record-meta-box p-3 bg-surface-alt rounded mb-3">
              <div className="d-flex justify-between mb-2">
                <span>Ordering Clinician:</span>
                <strong>{previewRecord.doctorName}</strong>
              </div>
              <div className="d-flex justify-between mb-2">
                <span>Department:</span>
                <strong>{previewRecord.department}</strong>
              </div>
              <div className="d-flex justify-between">
                <span>Clinical Status:</span>
                <span className="status-badge badge-confirmed">{previewRecord.status}</span>
              </div>
            </div>

            {/* Diagnostic Parameters Table Sample */}
            <div className="diagnostic-preview-panel mb-3">
              <span className="section-eyebrow">DIAGNOSTIC TEST READINGS</span>
              <div className="diagnostic-mini-table mt-1">
                <div className="diag-row-header">
                  <span>Parameter</span>
                  <span>Observed Result</span>
                  <span>Reference</span>
                  <span>Status</span>
                </div>
                <div className="diag-row">
                  <strong>Fasting Glucose</strong>
                  <span>94 mg/dL</span>
                  <span className="text-muted">70-99 mg/dL</span>
                  <span className="tag-status-normal">NORMAL</span>
                </div>
                <div className="diag-row">
                  <strong>Total Cholesterol</strong>
                  <span>182 mg/dL</span>
                  <span className="text-muted">&lt; 200 mg/dL</span>
                  <span className="tag-status-normal">NORMAL</span>
                </div>
                <div className="diag-row">
                  <strong>Serum Creatinine</strong>
                  <span>0.92 mg/dL</span>
                  <span className="text-muted">0.74-1.35</span>
                  <span className="tag-status-normal">OPTIMAL</span>
                </div>
              </div>
            </div>

            <div className="record-summary-box mb-4">
              <h5 className="font-semibold text-secondary mb-1">Diagnostic Findings & Summary:</h5>
              <p className="text-sm text-muted leading-relaxed">{previewRecord.summary}</p>
            </div>

            <div className="modal-footer">
              <button
                className="button button-outline"
                onClick={() => setPreviewRecord(null)}
              >
                Close
              </button>
              <button
                className="button button-primary record-download-btn-gradient"
                onClick={() => handleDownloadPdf(previewRecord)}
              >
                <Download size={15} /> Download Official PDF Report
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Medical Document"
        subtitle="Add a new lab result, scan, or historical medical report to your secure EHR vault"
      >
        <form onSubmit={handleUploadSubmit}>
          <div className="form-group">
            <label>Document / Report Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Thyroid Stimulating Hormone (TSH) Lab Panel"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Document Category</label>
              <select value={newType} onChange={(e) => setNewType(e.target.value)}>
                <option value="Lab Report">Lab Report</option>
                <option value="Diagnostic Scan">Diagnostic Scan / Imaging</option>
                <option value="Clinical Note">Clinical Note</option>
                <option value="Discharge Summary">Discharge Summary</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ordering Physician</label>
              <input
                type="text"
                placeholder="e.g. Dr. Sarah Johnson"
                value={newDoctor}
                onChange={(e) => setNewDoctor(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Diagnostic Findings / Notes Summary</label>
            <textarea
              rows={3}
              placeholder="Enter brief test highlights, normal reference ranges, or comments..."
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
            />
          </div>

          {/* Simulated File Selection */}
          <div className="form-group">
            <label>Select PDF / Scanned Image File</label>
            <div className="file-drop-area">
              <UploadCloud size={28} className="text-teal mb-2" />
              <p className="text-sm font-semibold text-secondary">
                {selectedFileName || "Click to browse or drop document here"}
              </p>
              <small className="text-xs text-muted">Supports PDF, JPG, PNG up to 25MB</small>
              <input
                type="file"
                className="hidden-file-input"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSelectedFileName(e.target.files[0].name);
                    if (!newTitle) setNewTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
                  }
                }}
              />
            </div>
          </div>

          <div className="modal-footer mt-4">
            <button
              type="button"
              className="button button-outline"
              onClick={() => setUploadModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              <UploadCloud size={16} /> Upload & Save to EHR
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PatientRecords;
