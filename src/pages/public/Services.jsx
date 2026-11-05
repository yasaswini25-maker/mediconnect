import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import BookingModal from "../../components/features/BookingModal";
import {
  HeartPulse,
  Brain,
  Sparkles,
  Stethoscope,
  Baby,
  Bone,
  Smile,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Calendar,
  PhoneCall
} from "lucide-react";

export function Services() {
  const { departments, doctors } = useApp();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDeptDoctor, setSelectedDeptDoctor] = useState(null);

  const getDeptIcon = (name) => {
    switch (name) {
      case "Cardiology": return <HeartPulse size={26} />;
      case "Neurology": return <Brain size={26} />;
      case "Dermatology": return <Sparkles size={26} />;
      case "General Medicine": return <Stethoscope size={26} />;
      case "Pediatrics": return <Baby size={26} />;
      case "Orthopedics": return <Bone size={26} />;
      case "Dentistry": return <Smile size={26} />;
      default: return <ShieldAlert size={26} />;
    }
  };

  const handleBookDept = (deptName) => {
    const doc = doctors.find((d) => d.department === deptName && d.status === "Active") || doctors[0];
    setSelectedDeptDoctor(doc);
    setBookingModalOpen(true);
  };

  return (
    <div className="services-page-root">
      {/* Banner */}
      <section className="about-hero-banner">
        <div className="landing-container text-center">
          <span className="section-eyebrow">SPECIALIZED CLINICAL CARE</span>
          <h1>Comprehensive Hospital Medical Services</h1>
          <p className="about-hero-sub">
            Explore MediConnect's multi-disciplinary healthcare departments. Connect with dedicated specialists for routine checkups, specialized diagnostic scans, or scheduled virtual consultations.
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="services-detail-grid">
            {departments.map((dept) => (
              <div key={dept.id} className="dept-detail-card">
                <div className="dept-card-top">
                  <div className="dept-icon-wrapper" style={{ color: dept.color, background: `${dept.color}15` }}>
                    {getDeptIcon(dept.name)}
                  </div>
                  <span className="dept-code-tag">{dept.code}</span>
                </div>

                <h3>{dept.name}</h3>
                <p className="dept-desc">{dept.description}</p>

                <div className="dept-meta-info">
                  <div className="dept-meta-row">
                    <span>Head of Dept:</span>
                    <strong>{dept.headOfDepartment}</strong>
                  </div>
                  <div className="dept-meta-row">
                    <span>Active Specialists:</span>
                    <strong>{dept.doctorsCount} Physicians</strong>
                  </div>
                  <div className="dept-meta-row">
                    <span>Location:</span>
                    <strong>{dept.wardLocation}</strong>
                  </div>
                  <div className="dept-meta-row">
                    <span>Contact Line:</span>
                    <strong>{dept.phone}</strong>
                  </div>
                </div>

                <div className="dept-card-actions">
                  <Link
                    to={`/doctors?specialty=${encodeURIComponent(dept.name)}`}
                    className="button button-outline button-sm full-width"
                  >
                    View Specialists →
                  </Link>
                  <button
                    className="button button-primary button-sm full-width"
                    onClick={() => handleBookDept(dept.name)}
                  >
                    <Calendar size={14} /> Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Care & Diagnostic Facilities */}
      <section className="section-padding bg-soft">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">SUPPORTING CLINICAL INFRASTRUCTURE</span>
            <h2>Integrated Diagnostic & Urgent Care Facilities</h2>
            <p>High-resolution pathology, digital radiology, and round-the-clock emergency triage support.</p>
          </div>

          <div className="services-grid-3">
            <div className="service-card">
              <div className="service-icon-box">
                <HeartPulse size={24} />
              </div>
              <h3>24/7 Rapid Triage Center</h3>
              <p>Direct emergency access with dedicated trauma rooms, rapid acute cardiac response, and round-the-clock critical care physicians.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <Stethoscope size={24} />
              </div>
              <h3>Full Digital Laboratory</h3>
              <p>Automated clinical biochemistry, hematology panels, and PCR diagnostics. Reports are synchronized directly to your Patient EHR vault within hours.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <Brain size={24} />
              </div>
              <h3>Telehealth Command Desk</h3>
              <p>Continuous virtual care monitoring for post-operative recovery, chronic hypertension follow-ups, and pediatric triage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedDoctor={selectedDeptDoctor}
      />
    </div>
  );
}

export default Services;
