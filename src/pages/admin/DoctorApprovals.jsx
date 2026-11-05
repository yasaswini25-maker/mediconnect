import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  UserCheck,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  Building,
  Mail,
  Phone,
  Award,
  AlertCircle
} from "lucide-react";

export function DoctorApprovals() {
  const { doctors, verifyDoctor } = useApp();

  const [decisionFeedback, setDecisionFeedback] = useState("");

  const pendingDoctors = doctors.filter(
    (d) => d.status === "Pending" || d.verificationStatus === "Pending Verification"
  );

  const handleDecision = (doctorId, decision) => {
    verifyDoctor(doctorId, decision);
    setDecisionFeedback(`Physician credentials have been marked as ${decision === "Approve" ? "Approved & Verified" : "Declined"}.`);
    setTimeout(() => setDecisionFeedback(""), 3000);
  };

  return (
    <div className="doctor-approvals-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Physician Credential Verification Queue</h2>
          <p>Review medical licenses, board certifications, and verify qualifications for new doctors</p>
        </div>
        <span className="rating-counter-badge bg-amber">
          {pendingDoctors.length} Pending Review
        </span>
      </div>

      {decisionFeedback && (
        <div className="notice-banner banner-success mt-3">
          <CheckCircle2 size={18} /> {decisionFeedback}
        </div>
      )}

      {/* Approvals Stack */}
      <div className="approvals-cards-stack mt-4">
        {pendingDoctors.length === 0 ? (
          <div className="empty-state-card text-center p-5 mc-card">
            <ShieldCheck size={48} className="text-emerald mx-auto mb-2" />
            <h4>All Doctor Applications Reviewed</h4>
            <p className="text-muted">There are no pending physician registration requests awaiting verification.</p>
          </div>
        ) : (
          pendingDoctors.map((doc) => (
            <div key={doc.id} className="approval-item-card mc-card">
              <div className="approval-card-top">
                <div className="d-flex align-center gap-3">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="approval-doc-avatar"
                  />
                  <div>
                    <h3 className="font-bold text-secondary">{doc.name}</h3>
                    <span className="doc-specialty-pill">{doc.specialty}</span>
                    <small className="block text-muted mt-1">{doc.title}</small>
                  </div>
                </div>

                <span className="status-badge badge-pending">
                  <ShieldAlert size={13} /> Pending Verification
                </span>
              </div>

              {/* Credentials & Vetting Details */}
              <div className="approval-details-grid mt-3">
                <div className="approval-detail-tile">
                  <small>Medical Qualifications & Degree:</small>
                  <strong>{doc.qualifications}</strong>
                </div>

                <div className="approval-detail-tile">
                  <small>Clinical Experience:</small>
                  <strong>{doc.experience}+ Years Practice</strong>
                </div>

                <div className="approval-detail-tile">
                  <small>Contact Email:</small>
                  <strong>{doc.email}</strong>
                </div>

                <div className="approval-detail-tile">
                  <small>Proposed Consultation Fee:</small>
                  <strong>${doc.fee} / consultation</strong>
                </div>
              </div>

              <div className="approval-about-box mt-3">
                <small className="text-xs font-semibold text-muted block mb-1">Submitted Clinical Statement:</small>
                <p className="text-sm text-secondary">{doc.about}</p>
              </div>

              <div className="approval-actions-bar mt-4">
                <div className="text-xs text-muted">
                  Application ID: <code>{doc.id}</code> • Compliance Check: Stage 1 Cleared
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="button button-outline button-danger button-sm"
                    onClick={() => handleDecision(doc.id, "Reject")}
                  >
                    <XCircle size={15} /> Decline Registration
                  </button>
                  <button
                    className="button button-primary button-sm"
                    onClick={() => handleDecision(doc.id, "Approve")}
                  >
                    <CheckCircle2 size={15} /> Approve Credentials & Activate
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DoctorApprovals;
