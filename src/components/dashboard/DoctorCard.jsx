import { Link } from "react-router-dom";
import { Star, Building, Video, Calendar } from "lucide-react";

export function DoctorCard({ doctor, onBook }) {
  if (!doctor) return null;

  return (
    <div className="landing-doctor-card">
      <div className="doc-photo-wrapper">
        <img src={doctor.image} alt={doctor.name} className="doc-photo" />
        <span className="doc-mode-badge">{doctor.modes?.join(" & ") || "In-Person"}</span>
      </div>
      <div className="doc-card-body">
        <div className="doc-rating-row">
          <span className="doc-specialty-pill">{doctor.specialty}</span>
          <span className="doc-stars">
            <Star size={14} className="star-gold filled" /> {doctor.rating} ({doctor.reviewsCount})
          </span>
        </div>
        <h4>{doctor.name}</h4>
        <p className="doc-title-text">{doctor.title}</p>
        <small className="doc-hospital-text">{doctor.hospital}</small>

        <div className="doc-card-footer">
          <div className="doc-fee">
            <small>Consultation</small>
            <strong>${doctor.fee}</strong>
          </div>
          <div className="doc-card-actions">
            <Link to={`/doctors/${doctor.id}`} className="button button-outline button-xs">
              Profile
            </Link>
            {onBook && (
              <button
                className="button button-primary button-xs"
                onClick={() => onBook(doctor)}
              >
                Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
