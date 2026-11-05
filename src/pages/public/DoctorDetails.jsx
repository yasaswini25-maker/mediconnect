import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import BookingModal from "../../components/features/BookingModal";
import ReviewModal from "../../components/features/ReviewModal";
import {
  Star,
  Building,
  Calendar,
  Clock,
  Video,
  ShieldCheck,
  Award,
  GraduationCap,
  MessageSquarePlus,
  ArrowLeft,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

export function DoctorDetails() {
  const { id } = useParams();
  const { doctors } = useApp();
  const navigate = useNavigate();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  const [reviewsList, setReviewsList] = useState([
    {
      author: "Alex Reynolds",
      date: "Oct 24, 2026",
      rating: 5,
      tags: ["Clear Explanations", "Punctual", "Compassionate"],
      text: "Dr. Johnson took time to review my cardiovascular history thoroughly. The advice on managing my blood pressure with diet adjustments alongside medication was exceptional."
    },
    {
      author: "Maria Santos",
      date: "Oct 19, 2026",
      rating: 5,
      tags: ["Thorough Consultation", "Minimal Wait Time"],
      text: "Outstanding physician! Zero wait time with the MediConnect digital queue tracker. Extremely reassuring bedside manner."
    },
    {
      author: "Sophia Martinez",
      date: "Oct 12, 2026",
      rating: 5,
      tags: ["Thorough Consultation", "Minimal Wait Time"],
      text: "The online video consultation was crystal clear. My digital prescription arrived in my portal immediately after our call. Highly recommended!"
    },
    {
      author: "David Vance",
      date: "Sep 28, 2026",
      rating: 4,
      tags: ["Great Bedside Manner", "Clear Explanations"],
      text: "Very knowledgeable doctor with reassuring advice. The clinic queue moved smoothly and on time."
    }
  ]);

  const handleReviewAdded = (newReview) => {
    setReviewsList([
      {
        author: newReview.patientName || "Verified Patient",
        date: "Just now",
        rating: newReview.rating,
        tags: newReview.tags || ["Clear Explanations"],
        text: newReview.comment
      },
      ...reviewsList
    ]);
  };

  return (
    <div className="doc-details-root">
      {/* Top Breadcrumb Header */}
      <section className="doc-details-top-banner">
        <div className="landing-container">
          <Link to="/doctors" className="back-link mb-3">
            <ArrowLeft size={16} /> Back to Doctor Directory
          </Link>

          <div className="doc-header-card">
            <div className="doc-header-photo-wrap">
              <img src={doctor.image} alt={doctor.name} className="doc-header-photo" />
              <span className="doc-verified-badge">
                <ShieldCheck size={14} /> Verified Specialist
              </span>
            </div>

            <div className="doc-header-info">
              <div className="d-flex align-center gap-2 mb-1">
                <span className="doc-specialty-pill">{doctor.specialty}</span>
                <span className="doc-stars-badge">
                  <Star size={14} className="star-gold filled" /> {doctor.rating} ({doctor.reviewsCount} reviews)
                </span>
              </div>

              <h1>{doctor.name}</h1>
              <p className="doc-header-title">{doctor.title}</p>
              <p className="doc-header-qual">{doctor.qualifications}</p>

              <div className="doc-header-meta mt-3">
                <div className="header-meta-item">
                  <Building size={16} className="text-teal" />
                  <span>{doctor.hospital} ({doctor.room})</span>
                </div>
                <div className="header-meta-item">
                  <Clock size={16} className="text-teal" />
                  <span>{doctor.experience}+ Years Clinical Experience</span>
                </div>
                <div className="header-meta-item">
                  <Video size={16} className="text-teal" />
                  <span>{doctor.modes.join(" & ")} Consultations</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="doc-header-action-box">
              <div className="header-fee-display">
                <small>Consultation Fee</small>
                <strong>${doctor.fee}</strong>
              </div>

              <div className="header-token-display">
                <span className="pulse-dot" />
                <span>Today's Serving: Token #{doctor.currentServingToken || 1}</span>
              </div>

              <button
                className="button button-primary full-width"
                onClick={() => setBookingOpen(true)}
              >
                <Calendar size={16} /> Book Appointment
              </button>

              <button
                className="button button-outline button-sm full-width mt-2"
                onClick={() => setReviewOpen(true)}
              >
                <MessageSquarePlus size={15} /> Rate & Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs & Sections */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="doc-details-content-grid">
            {/* Left Column: Bio, Education, Working Hours */}
            <div className="doc-details-main-col">
              {/* About & Clinical Philosophy */}
              <div className="doc-section-card">
                <h3>About Dr. {doctor.name.split(" ").slice(-1)[0]}</h3>
                <p className="doc-full-bio">{doctor.about}</p>
              </div>

              {/* Education & Fellowships */}
              <div className="doc-section-card">
                <div className="d-flex align-center gap-2 mb-3">
                  <GraduationCap size={22} className="text-teal" />
                  <h3>Education & Medical Training</h3>
                </div>

                <div className="education-timeline">
                  {doctor.education?.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">
                        <strong>{item}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Availability */}
              <div className="doc-section-card">
                <div className="d-flex align-center gap-2 mb-3">
                  <Clock size={22} className="text-teal" />
                  <h3>Weekly Consultation Hours</h3>
                </div>

                <div className="availability-summary-box">
                  <div className="avail-meta-row">
                    <span>Clinical Days:</span>
                    <strong>{doctor.availability?.days?.join(", ") || "Mon, Wed, Fri"}</strong>
                  </div>
                  <div className="avail-meta-row">
                    <span>Hours:</span>
                    <strong>{doctor.availability?.hours || "09:00 AM - 05:00 PM"}</strong>
                  </div>
                  <div className="avail-meta-row">
                    <span>Break Interval:</span>
                    <strong>{doctor.availability?.breakTime || "01:00 PM - 02:00 PM"}</strong>
                  </div>
                </div>

                <div className="slots-preview-row mt-3">
                  <span className="text-sm font-semibold mb-2 block">Standard Appointment Slots:</span>
                  <div className="slots-grid">
                    {doctor.availability?.slots?.map((slot, i) => (
                      <span key={i} className="slot-pill-static">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Patient Reviews */}
              <div className="doc-section-card">
                <div className="d-flex justify-between align-center mb-4">
                  <div>
                    <h3>Patient Feedback & Reviews</h3>
                    <small className="text-muted">
                      Overall Rating: {doctor.rating} / 5.0 based on {doctor.reviewsCount} verified patient visits
                    </small>
                  </div>
                  <button
                    className="button button-outline button-sm"
                    onClick={() => setReviewOpen(true)}
                  >
                    <MessageSquarePlus size={15} /> Write a Review
                  </button>
                </div>

                {/* Rating Distribution Histogram */}
                <div className="rating-overview-grid mb-4">
                  <div className="rating-big-score-box">
                    <span className="big-rating-num">{doctor.rating}</span>
                    <div className="stars-row-small mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} className={doctor.rating >= s ? "star-gold filled" : "star-empty"} />
                      ))}
                    </div>
                    <small className="text-muted">{doctor.reviewsCount} Total Reviews</small>
                  </div>

                  <div className="rating-bars-stack">
                    {[
                      { stars: 5, pct: 88, count: Math.round(doctor.reviewsCount * 0.88) },
                      { stars: 4, pct: 9, count: Math.round(doctor.reviewsCount * 0.09) },
                      { stars: 3, pct: 2, count: Math.round(doctor.reviewsCount * 0.02) },
                      { stars: 2, pct: 1, count: Math.round(doctor.reviewsCount * 0.01) },
                      { stars: 1, pct: 0, count: 0 }
                    ].map((row) => (
                      <div key={row.stars} className="rating-bar-row">
                        <span className="bar-star-label">{row.stars} ★</span>
                        <div className="rating-bar-track">
                          <div className="rating-bar-fill" style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="bar-count-label">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reviews-list-stack">
                  {reviewsList.map((rev, i) => (
                    <div key={i} className="single-review-card">
                      <div className="review-top-row">
                        <div>
                          <strong>{rev.author}</strong>
                          <span className="review-date-text">{rev.date}</span>
                        </div>
                        <div className="stars-row-small">
                          {[...Array(rev.rating || 5)].map((_, idx) => (
                            <Star key={idx} size={14} className="star-gold filled" />
                          ))}
                        </div>
                      </div>

                      <div className="review-tags-small-row">
                        {rev.tags?.map((t, ti) => (
                          <span key={ti} className="review-tag-badge">
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="review-text-content">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Hospital Information & Contact */}
            <div className="doc-details-side-col">
              <div className="side-facility-card">
                <h4>Hospital Location</h4>
                <div className="facility-item mt-3">
                  <Building size={18} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>{doctor.hospital}</strong>
                    <p>{doctor.room}</p>
                    <small>450 Lexington Ave, New York, NY</small>
                  </div>
                </div>

                <div className="facility-item mt-3">
                  <PhoneCall size={18} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Direct Extension</strong>
                    <p>{doctor.phone}</p>
                  </div>
                </div>

                <div className="booking-cta-sidebar-box mt-4">
                  <p>Ready to meet with {doctor.name}?</p>
                  <button
                    className="button button-primary full-width"
                    onClick={() => setBookingOpen(true)}
                  >
                    <Calendar size={15} /> Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedDoctor={doctor}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        doctor={doctor}
        onReviewSubmitted={handleReviewAdded}
      />
    </div>
  );
}

export default DoctorDetails;
