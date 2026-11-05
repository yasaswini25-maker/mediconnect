import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import BookingModal from "../../components/features/BookingModal";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Video,
  Building,
  Award,
  Sparkles,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Check
} from "lucide-react";

export function FindDoctors() {
  const { doctors, departments } = useApp();
  const [searchParams] = useSearchParams();
  const initialSpecialty = searchParams.get("specialty") || "All";

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedMode, setSelectedMode] = useState("All"); // All, Online, In-Person
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("recommended"); // recommended, rating, experience, fee-low, fee-high
  const [smartMatchOnly, setSmartMatchOnly] = useState(false);

  // Booking Modal
  const [bookingDoctor, setBookingDoctor] = useState(null);

  // Filtered & Sorted List
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        // Only show Active and Verified doctors in public directory
        if (doc.status !== "Active") return false;

        // Search text match (Name, Specialty, Hospital, Qualifications)
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          doc.name.toLowerCase().includes(query) ||
          doc.specialty.toLowerCase().includes(query) ||
          doc.hospital?.toLowerCase().includes(query) ||
          doc.qualifications?.toLowerCase().includes(query);

        // Specialty filter
        const matchesSpecialty =
          selectedSpecialty === "All" ||
          doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase() ||
          doc.department.toLowerCase() === selectedSpecialty.toLowerCase();

        // Mode filter
        const matchesMode =
          selectedMode === "All" ||
          doc.modes.includes(selectedMode);

        // Rating filter
        const matchesRating = doc.rating >= parseFloat(minRating);

        // Smart match filter (Rating >= 4.8 & has both modes or online)
        const matchesSmart = !smartMatchOnly || (doc.rating >= 4.8 && doc.experience >= 10);

        return matchesSearch && matchesSpecialty && matchesMode && matchesRating && matchesSmart;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "experience") return b.experience - a.experience;
        if (sortBy === "fee-low") return a.fee - b.fee;
        if (sortBy === "fee-high") return b.fee - a.fee;
        // Default recommended
        return b.rating * b.experience - a.rating * a.experience;
      });
  }, [doctors, searchTerm, selectedSpecialty, selectedMode, minRating, sortBy, smartMatchOnly]);

  const specialtiesList = [
    "All",
    ...new Set(departments.map((d) => d.name))
  ];

  return (
    <div className="find-doctors-root">
      {/* Search Header Banner */}
      <section className="find-doctors-header">
        <div className="landing-container">
          <div className="text-center max-w-800 mx-auto">
            <span className="section-eyebrow">VERIFIED MEDICAL SPECIALISTS</span>
            <h1>Find Trusted Doctors & Book Consultations</h1>
            <p className="about-hero-sub">
              Discover board-certified physicians, compare experience and patient reviews, and book instant outpatient appointments or online virtual consultations.
            </p>

            {/* Smart Search Bar */}
            <div className="doctor-search-box-large">
              <Search size={22} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search by doctor name, clinical specialty, or symptoms (e.g. Heart, Skin, Pediatric)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="search-clear-btn" onClick={() => setSearchTerm("")}>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory & Filter Grid */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="directory-layout-grid">
            {/* Left Filter Sidebar */}
            <aside className="directory-filters-sidebar">
              <div className="filters-card">
                <div className="filters-header">
                  <div className="d-flex align-center gap-2">
                    <Filter size={18} className="text-teal" />
                    <h4>Filter Doctors</h4>
                  </div>
                  <button
                    className="reset-filters-btn"
                    onClick={() => {
                      setSelectedSpecialty("All");
                      setSelectedMode("All");
                      setMinRating("0");
                      setSearchTerm("");
                      setSmartMatchOnly(false);
                    }}
                  >
                    Reset
                  </button>
                </div>

                {/* Smart Recommendation Switch */}
                <div className="filter-group-smart">
                  <label className="smart-match-toggle">
                    <input
                      type="checkbox"
                      checked={smartMatchOnly}
                      onChange={(e) => setSmartMatchOnly(e.target.checked)}
                    />
                    <div className="smart-match-text">
                      <span className="smart-badge">
                        <Sparkles size={13} /> SMART MATCH
                      </span>
                      <strong>Top Rated Specialists</strong>
                      <small>Rating ≥ 4.8 & 10+ yrs experience</small>
                    </div>
                  </label>
                </div>

                {/* Specialty / Department */}
                <div className="filter-group">
                  <label className="filter-label">Clinical Department</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="filter-select"
                  >
                    {specialtiesList.map((spec, i) => (
                      <option key={i} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Consultation Mode */}
                <div className="filter-group">
                  <label className="filter-label">Consultation Mode</label>
                  <div className="filter-chips-col">
                    {["All", "In-Person", "Online"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        className={`filter-chip-row ${selectedMode === mode ? "active" : ""}`}
                        onClick={() => setSelectedMode(mode)}
                      >
                        {mode === "Online" && <Video size={14} />}
                        {mode === "In-Person" && <Building size={14} />}
                        <span>{mode === "All" ? "All Formats" : mode}</span>
                        {selectedMode === mode && <Check size={14} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minimum Star Rating */}
                <div className="filter-group">
                  <label className="filter-label">Patient Rating</label>
                  <div className="rating-filter-options">
                    {[
                      { label: "Any Rating", val: "0" },
                      { label: "4.5 & Above", val: "4.5" },
                      { label: "4.8 & Above (Exceptional)", val: "4.8" }
                    ].map((opt) => (
                      <label key={opt.val} className="radio-filter-item">
                        <input
                          type="radio"
                          name="ratingFilter"
                          value={opt.val}
                          checked={minRating === opt.val}
                          onChange={(e) => setMinRating(e.target.value)}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Doctors Listing */}
            <main className="directory-results-main">
              {/* Results Topbar */}
              <div className="results-topbar">
                <div className="results-count">
                  <h3>
                    Available Physicians <span>({filteredDoctors.length})</span>
                  </h3>
                  <small>
                    Showing verified clinicians available for scheduling
                  </small>
                </div>

                <div className="results-sort">
                  <label>Sort by:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="recommended">Best Match / Recommended</option>
                    <option value="rating">Highest Patient Rating</option>
                    <option value="experience">Years of Experience</option>
                    <option value="fee-low">Fee: Low to High</option>
                    <option value="fee-high">Fee: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Doctors Cards List */}
              {filteredDoctors.length === 0 ? (
                <div className="no-doctors-found">
                  <Search size={40} className="text-muted mb-2" />
                  <h4>No doctors matched your criteria</h4>
                  <p>Try clearing some filters or searching with a different specialty keyword.</p>
                  <button
                    className="button button-outline mt-3"
                    onClick={() => {
                      setSelectedSpecialty("All");
                      setSelectedMode("All");
                      setMinRating("0");
                      setSearchTerm("");
                      setSmartMatchOnly(false);
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="doctor-cards-vertical-list">
                  {filteredDoctors.map((doc) => (
                    <div key={doc.id} className="doc-directory-card">
                      <div className="doc-card-left-photo">
                        <img src={doc.image} alt={doc.name} className="directory-doc-img" />
                        <span className="doc-experience-tag">
                          {doc.experience}+ yrs exp
                        </span>
                      </div>

                      <div className="doc-card-middle-info">
                        <div className="d-flex align-center gap-2 mb-1">
                          <span className="doc-specialty-pill">{doc.specialty}</span>
                          <span className="doc-stars-badge">
                            <Star size={13} className="star-gold filled" /> {doc.rating} ({doc.reviewsCount} reviews)
                          </span>
                        </div>

                        <h3 className="doc-name-heading">
                          <Link to={`/doctors/${doc.id}`}>{doc.name}</Link>
                        </h3>

                        <p className="doc-title-text">{doc.title}</p>
                        <p className="doc-qual-text">{doc.qualifications}</p>

                        <div className="doc-meta-tags-row mt-2">
                          <span className="doc-facility-tag">
                            <Building size={13} /> {doc.hospital} ({doc.room})
                          </span>
                          <span className="doc-modes-tag">
                            <Video size={13} /> {doc.modes.join(" & ")}
                          </span>
                        </div>

                        <p className="doc-about-excerpt mt-2">
                          {doc.about}
                        </p>
                      </div>

                      <div className="doc-card-right-cta">
                        <div className="doc-consult-fee-box">
                          <span className="fee-label">Consultation Fee</span>
                          <span className="fee-amount">${doc.fee}</span>
                          <small className="fee-note">No pre-payment booking fee</small>
                        </div>

                        <div className="doc-live-token-hint">
                          <span className="pulse-dot" />
                          <span>Now Serving: Token #{doc.currentServingToken || 1}</span>
                        </div>

                        <div className="doc-cta-buttons-stack">
                          <button
                            className="button button-primary full-width"
                            onClick={() => setBookingDoctor(doc)}
                          >
                            <Calendar size={15} /> Book Appointment
                          </button>
                          <Link
                            to={`/doctors/${doc.id}`}
                            className="button button-outline button-sm full-width"
                          >
                            View Full Credentials →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={Boolean(bookingDoctor)}
        onClose={() => setBookingDoctor(null)}
        selectedDoctor={bookingDoctor}
      />
    </div>
  );
}

export default FindDoctors;
