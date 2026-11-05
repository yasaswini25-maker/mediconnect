import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useLanguage } from "../../context/LanguageContext";
import { HEALTHCARE_IMAGES } from "../../config/images";
import BookingModal from "../../components/features/BookingModal";
import Hero3DVisual from "../../components/features/Hero3DVisual";
import {
  HeartPulse,
  Search,
  Calendar,
  Video,
  FileText,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Activity,
  PlusCircle,
  HelpCircle,
  Sparkles
} from "lucide-react";

export function Home() {
  const { user } = useAuth();
  const { doctors } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [bookingDoc, setBookingDoc] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);

  const featuredDoctors = doctors.slice(0, 8);

  const services = [
    {
      title: "Cardiology",
      desc: "Specialized diagnostics, ECGs, and preventative cardiac health programs.",
      icon: HeartPulse,
      specialty: "Cardiology"
    },
    {
      title: "Telemedicine",
      desc: "Instant encrypted video consultations with verified doctors from your home.",
      icon: Video,
      specialty: "General Medicine"
    },
    {
      title: "Pediatrics",
      desc: "Compassionate developmental screening, nutrition, and child wellness.",
      icon: Users,
      specialty: "Pediatrics"
    },
    {
      title: "Dermatology",
      desc: "Advanced laser care, acne treatment, and clinical dermatosurgery.",
      icon: Activity,
      specialty: "Dermatology"
    },
    {
      title: "Orthopedics",
      desc: "Joint replacement, fracture recovery, and athletic rehabilitation.",
      icon: Award,
      specialty: "Orthopedics"
    },
    {
      title: "Neurology",
      desc: "Neurophysiology, chronic migraine care, and neurological diagnostics.",
      icon: ShieldCheck,
      specialty: "Neurology"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Search & Discover",
      desc: "Browse verified specialists by clinical department, experience, patient ratings, and fee."
    },
    {
      num: "02",
      title: "Select Slot & Mode",
      desc: "Pick your preferred date and time. Choose between Online Video Consultation or In-Person visit."
    },
    {
      num: "03",
      title: "Live Queue Tracking",
      desc: "Receive your digital token. Monitor real-time wait times and know exactly when it's your turn."
    },
    {
      num: "04",
      title: "Digital Care & Rx",
      desc: "Access stamped electronic prescriptions, lab reports, and doctor follow-up notes in one vault."
    }
  ];

  const faqs = [
    {
      q: "How does the Live Queue Management system work?",
      a: "When you book an appointment, MediConnect automatically assigns you a token number. The patient dashboard tracks the doctor's current serving number in real time, calculating estimated wait times so you never wait unnecessarily."
    },
    {
      q: "Can I attend consultations completely online?",
      a: "Yes! MediConnect provides a built-in HD video consultation suite with camera, microphone, screen sharing for lab reports, and live clinical messaging."
    },
    {
      q: "How do I download and print my prescriptions?",
      a: "Once your doctor issues an electronic prescription, it is instantly available under your Prescriptions tab. You can view the formal medical layout with Rx symbol and doctor's signature, and print or save it as a PDF."
    },
    {
      q: "Can I test MediConnect without creating a new email?",
      a: "Absolutely! Go to the Login page and click any of the 1-Click Demo Login buttons for Patient, Doctor, or Hospital Admin to test the complete platform."
    }
  ];

  return (
    <div className="landing-page-root">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-text-content">
              <div className="hero-badge">
                <span className="live-pulse-dot" />
                <span>{t("heroBadge")}</span>
              </div>

              <h1 className="hero-headline">
                {t("heroTitlePart1")} <br />
                <span className="hero-gradient-text">{t("heroTitlePart2")}</span>
              </h1>

              <p className="hero-description">
                {t("heroSubtitle")}
              </p>

              <div className="hero-cta-group">
                <Link to="/doctors" className="button button-primary hero-btn-main">
                  <Search size={18} /> {t("heroFindDoctor")}
                </Link>
                <button
                  className="button button-outline hero-btn-sub"
                  onClick={() => setBookingDoc(doctors[0])}
                >
                  <Calendar size={18} /> {t("heroBookAppointment")}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="hero-trust-bar">
                <div className="trust-stat">
                  <strong>500+</strong>
                  <small>{t("heroVerifiedDocs")}</small>
                </div>
                <div className="trust-divider" />
                <div className="trust-stat">
                  <strong>10,000+</strong>
                  <small>{t("heroHappyPatients")}</small>
                </div>
                <div className="trust-divider" />
                <div className="trust-stat">
                  <strong>24/7</strong>
                  <small>{t("heroTelehealth")}</small>
                </div>
                <div className="trust-divider" />
                <div className="trust-stat">
                  <strong>4.9 ★</strong>
                  <small>{t("heroAvgRating")}</small>
                </div>
              </div>
            </div>

            {/* Hero 3D Interactive Visual Stage */}
            <div className="hero-visual-col">
              <Hero3DVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">COMPREHENSIVE CLINICAL CARE</span>
            <h2>Our Specialized Medical Services</h2>
            <p>From routine primary wellness to complex multi-disciplinary surgical interventions, our clinical network has you covered.</p>
          </div>

          <div className="services-grid-3">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="service-card">
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <Link
                    to={`/doctors?specialty=${encodeURIComponent(srv.specialty)}`}
                    className="service-link"
                  >
                    Explore Specialists <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-5">
            <Link to="/services" className="button button-outline">
              View All Hospital Departments & Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="section-padding bg-soft">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">SEAMLESS PATIENT JOURNEY</span>
            <h2>How MediConnect Simplifies Healthcare</h2>
            <p>Experience hassle-free medical care in 4 easy steps from search to post-consultation care.</p>
          </div>

          <div className="steps-process-grid">
            {steps.map((st, i) => (
              <div key={i} className="step-process-card">
                <span className="step-number-tag">{st.num}</span>
                <h4>{st.title}</h4>
                <p>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED DOCTORS ================= */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="section-header-between">
            <div>
              <span className="section-eyebrow">WORLD-CLASS SPECIALISTS</span>
              <h2>Meet Our Featured Physicians</h2>
              <p>Top-rated clinicians committed to evidence-based, compassionate patient outcomes.</p>
            </div>
            <Link to="/doctors" className="button button-outline hide-on-mobile">
              View All Doctors →
            </Link>
          </div>

          <div className="featured-doctors-grid">
            {featuredDoctors.map((doc) => (
              <div key={doc.id} className="landing-doctor-card">
                <div className="doc-photo-wrapper">
                  <img src={doc.image} alt={doc.name} className="doc-photo" />
                  <span className="doc-mode-badge">{doc.modes.join(" & ")}</span>
                </div>
                <div className="doc-card-body">
                  <div className="doc-rating-row">
                    <span className="doc-specialty-pill">{doc.specialty}</span>
                    <span className="doc-stars">
                      <Star size={14} className="star-gold filled" /> {doc.rating} ({doc.reviewsCount})
                    </span>
                  </div>
                  <h4>{doc.name}</h4>
                  <p className="doc-title-text">{doc.title}</p>
                  <small className="doc-hospital-text">{doc.hospital}</small>

                  <div className="doc-card-footer">
                    <div className="doc-fee">
                      <small>Consultation</small>
                      <strong>${doc.fee}</strong>
                    </div>
                    <div className="doc-card-actions">
                      <Link to={`/doctors/${doc.id}`} className="button button-outline button-xs">
                        Profile
                      </Link>
                      <button
                        className="button button-primary button-xs"
                        onClick={() => setBookingDoc(doc)}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TELEMEDICINE SPOTLIGHT ================= */}
      <section className="telehealth-spotlight-section">
        <div className="landing-container">
          <div className="spotlight-grid">
            <div className="spotlight-text">
              <span className="spotlight-tag">24/7 VIRTUAL CLINIC</span>
              <h2>Quality Healthcare from the Comfort of Your Home</h2>
              <p>
                No need to travel or sit in crowded waiting rooms. Connect with certified doctors via secure, HIPAA-compliant HD video consultation on your phone, tablet, or desktop.
              </p>

              <div className="spotlight-benefits-list">
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-teal" />
                  <span>Encrypted peer-to-peer video & audio channels</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-teal" />
                  <span>Real-time digital prescriptions sent directly to your account</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-teal" />
                  <span>Screen sharing for lab reports and medical scan reviews</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-teal" />
                  <span>Online queue tracking with estimated appointment start time</span>
                </div>
              </div>

              <div className="spotlight-cta">
                <Link to="/patient/consultations" className="button button-primary">
                  <Video size={17} /> Experience Telehealth Demo
                </Link>
              </div>
            </div>

            <div className="spotlight-visual">
              <img
                src={HEALTHCARE_IMAGES.consultationRoom}
                alt="Telemedicine session"
                className="spotlight-img"
              />
              <div className="spotlight-stat-float">
                <Activity size={24} className="text-teal" />
                <div>
                  <strong>99.4%</strong>
                  <p>Patient Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section-padding bg-soft">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">PATIENT EXPERIENCES</span>
            <h2>Loved by Over 10,000+ Patients</h2>
            <p>Real stories from individuals and families who rely on MediConnect for their everyday healthcare needs.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-gold filled" />
                ))}
              </div>
              <p className="testimonial-quote">
                "The Live Queue feature alone saved me 2 hours! I could track my token number from home and arrived just 5 minutes before Dr. Sarah Johnson called my name."
              </p>
              <div className="testimonial-author">
                <img src={HEALTHCARE_IMAGES.patient1} alt="Patient" className="author-avatar" />
                <div>
                  <strong>Alex Reynolds</strong>
                  <small>Cardiology Patient • Springfield</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-gold filled" />
                ))}
              </div>
              <p className="testimonial-quote">
                "Attending video consultations while traveling for work was seamless. Dr. Chen sent my updated prescription immediately to my portal, which I printed easily."
              </p>
              <div className="testimonial-author">
                <img src={HEALTHCARE_IMAGES.patient3} alt="Patient" className="author-avatar" />
                <div>
                  <strong>Sophia Martinez</strong>
                  <small>Neurology Patient • Santa Monica</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-gold filled" />
                ))}
              </div>
              <p className="testimonial-quote">
                "The administrative control and scheduling clarity is unprecedented. As a physician, managing outpatient flow and issuing digital prescriptions has never been smoother."
              </p>
              <div className="testimonial-author">
                <img src={HEALTHCARE_IMAGES.doctor4} alt="Doctor" className="author-avatar" />
                <div>
                  <strong>Dr. Michael Chen</strong>
                  <small>Chief of Neurophysiology</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="section-padding bg-surface">
        <div className="landing-container max-w-800">
          <div className="section-header-center">
            <span className="section-eyebrow">COMMON QUESTIONS</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about navigating MediConnect, scheduling visits, and using digital records.</p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${faqOpen === i ? "open" : ""}`}>
                <button className="faq-question-btn" onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{faqOpen === i ? "−" : "+"}</span>
                </button>
                {faqOpen === i && (
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="landing-cta-banner">
        <div className="landing-container text-center">
          <h2>Ready to Transform Your Healthcare Experience?</h2>
          <p>Join thousands of patients and leading medical professionals today on MediConnect.</p>
          <div className="cta-banner-buttons">
            <Link to="/signup" className="button button-primary">
              Create Free Account
            </Link>
            <Link to="/login" className="button button-outline">
              Test One-Click Demo Mode
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={Boolean(bookingDoc)}
        onClose={() => setBookingDoc(null)}
        selectedDoctor={bookingDoc}
      />
    </div>
  );
}

export default Home;
