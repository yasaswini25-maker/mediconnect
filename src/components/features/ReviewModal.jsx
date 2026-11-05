import { useState } from "react";
import { Star, CheckCircle2, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function ReviewModal({ isOpen, onClose, doctor, onReviewSubmitted }) {
  const { submitReview } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState(["Clear Explanations", "Punctual"]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !doctor) return null;

  const availableTags = [
    "Punctual",
    "Thorough Consultation",
    "Clear Explanations",
    "Compassionate",
    "Great Bedside Manner",
    "Minimal Wait Time"
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewPayload = {
      rating,
      comment: comment || "Excellent and thorough consultation experience. Very knowledgeable doctor.",
      tags: selectedTags
    };

    submitReview(doctor.id, reviewPayload);

    if (onReviewSubmitted) {
      onReviewSubmitted(reviewPayload);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: "520px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Rate Your Consultation</h3>
            <p className="modal-subtitle">Share your experience with {doctor.name}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {submitted ? (
            <div className="notice-banner banner-success">
              <CheckCircle2 size={18} /> Thank you! Your review has been recorded.
            </div>
          ) : (
            <>
              {/* Doctor Mini Card */}
              <div className="review-doctor-preview">
                <img src={doctor.image} alt={doctor.name} className="review-doc-thumb" />
                <div>
                  <strong>{doctor.name}</strong>
                  <p>{doctor.specialty} • {doctor.hospital}</p>
                </div>
              </div>

              {/* Star Selector */}
              <div className="star-rating-selector">
                <label className="text-center block mb-2 font-medium">Overall Rating</label>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={32}
                        className={
                          (hoverRating || rating) >= star ? "star-gold filled" : "star-empty"
                        }
                      />
                    </button>
                  ))}
                </div>
                <span className="rating-desc-text">
                  {rating === 5 && "Exceptional Experience (5/5)"}
                  {rating === 4 && "Very Good (4/5)"}
                  {rating === 3 && "Average (3/5)"}
                  {rating === 2 && "Below Expectations (2/5)"}
                  {rating === 1 && "Poor (1/5)"}
                </span>
              </div>

              {/* Tags */}
              <div className="review-tags-section">
                <label className="block mb-2 font-medium text-sm">Highlights of your visit</label>
                <div className="review-tags-list">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`review-tag-chip ${selectedTags.includes(tag) ? "selected" : ""}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback text */}
              <div className="form-group mt-3">
                <label>Detailed Feedback (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="How was the doctor's communication, diagnosis, and overall care?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="modal-footer mt-4">
                <button type="button" className="button button-outline" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="button button-primary">
                  Submit Review
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
