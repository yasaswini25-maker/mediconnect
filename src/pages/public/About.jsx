import { Link } from "react-router-dom";
import { HEALTHCARE_IMAGES } from "../../config/images";
import {
  ShieldCheck,
  HeartPulse,
  Award,
  Users,
  Building,
  Target,
  Sparkles,
  PhoneCall
} from "lucide-react";

export function About() {
  const leadership = [
    {
      name: "Dr. Arthur Sterling",
      role: "Chief Medical Officer & Administrator",
      qualifications: "MD, Harvard Medical School • 22 yrs clinical management",
      image: HEALTHCARE_IMAGES.adminUser
    },
    {
      name: "Dr. Sarah Johnson",
      role: "Head of Cardiology & Telehealth Director",
      qualifications: "MD, FACC • Massachusetts General Hospital Fellowship",
      image: HEALTHCARE_IMAGES.doctor1
    },
    {
      name: "Dr. Michael Chen",
      role: "Director of Neurosciences Institute",
      qualifications: "MD, PhD, Stanford University • Mayo Clinic Fellowship",
      image: HEALTHCARE_IMAGES.doctor4
    },
    {
      name: "Dr. Emily Williams",
      role: "Lead Clinical Dermatologist",
      qualifications: "MD, FAAD, Columbia University Vagelos College",
      image: HEALTHCARE_IMAGES.doctor3
    }
  ];

  return (
    <div className="about-page-root">
      {/* Banner */}
      <section className="about-hero-banner">
        <div className="landing-container text-center">
          <span className="section-eyebrow">OUR MISSION & PURPOSE</span>
          <h1>Empowering Doctors. Simplifying Healthcare. Connecting Patients.</h1>
          <p className="about-hero-sub">
            MediConnect was engineered from the ground up to eradicate healthcare fragmentation. We bridge outpatient hospital visits, live queue tracking, telemedicine, and digital health records into one cohesive digital ecosystem.
          </p>
        </div>
      </section>

      {/* Hospital Network Overview */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="section-eyebrow">THE MEDICONNECT ECOSYSTEM</span>
              <h2>A Modern Digital Pavilion Built For Human Health</h2>
              <p>
                Founded by physicians and digital health architects, MediConnect eliminates the hours patients waste in waiting rooms. Through our <strong>Live Outpatient Queue Tracker</strong>, individuals monitor doctor consultation tokens from home, arriving precisely when their turn approaches.
              </p>
              <p className="mt-3">
                For clinicians and hospital departments, MediConnect provides an integrated practice cockpit—managing appointments, electronic health records, video telemedicine, and tamper-evident digital prescriptions with ease.
              </p>

              <div className="about-highlights-grid mt-4">
                <div className="highlight-box">
                  <HeartPulse size={20} className="text-teal" />
                  <div>
                    <strong>Patient-First Design</strong>
                    <small>Transparent pricing & zero surprise bills</small>
                  </div>
                </div>
                <div className="highlight-box">
                  <ShieldCheck size={20} className="text-teal" />
                  <div>
                    <strong>HIPAA Compliant</strong>
                    <small>Strict electronic health records security</small>
                  </div>
                </div>
                <div className="highlight-box">
                  <Building size={20} className="text-teal" />
                  <div>
                    <strong>Multi-Specialty Hub</strong>
                    <small>8 core medical & surgical departments</small>
                  </div>
                </div>
                <div className="highlight-box">
                  <Award size={20} className="text-teal" />
                  <div>
                    <strong>Verified Credentials</strong>
                    <small>100% board-certified medical staff</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-story-image">
              <img
                src={HEALTHCARE_IMAGES.medicalTeam}
                alt="MediConnect Clinical Team"
                className="about-main-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-soft">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">GUIDING PRINCIPLES</span>
            <h2>Our Core Clinical Values</h2>
            <p>Every line of code and clinical consultation is held to the highest standard of modern medical ethics.</p>
          </div>

          <div className="services-grid-3">
            <div className="service-card">
              <div className="service-icon-box">
                <Target size={24} />
              </div>
              <h3>Clinical Precision</h3>
              <p>Combining rigorous medical evidence with digital patient tracking to minimize misdiagnosis and maximize recovery rates.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <Users size={24} />
              </div>
              <h3>Radical Accessibility</h3>
              <p>Ensuring specialized medical consultations are accessible to everyone through high-definition virtual telehealth.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <Sparkles size={24} />
              </div>
              <h3>Empathy & Dignity</h3>
              <p>Treating every patient with compassionate listening, transparent communication, and respect for their time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">CLINICAL LEADERSHIP</span>
            <h2>Executive Medical Board</h2>
            <p>Distinguished healthcare practitioners and medical researchers driving clinical excellence at MediConnect.</p>
          </div>

          <div className="featured-doctors-grid">
            {leadership.map((leader, i) => (
              <div key={i} className="landing-doctor-card">
                <div className="doc-photo-wrapper">
                  <img src={leader.image} alt={leader.name} className="doc-photo" />
                </div>
                <div className="doc-card-body">
                  <h4>{leader.name}</h4>
                  <p className="doc-title-text text-teal font-semibold">{leader.role}</p>
                  <small className="doc-hospital-text">{leader.qualifications}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta-banner">
        <div className="landing-container text-center">
          <h2>Experience the Future of Digital Healthcare</h2>
          <p>Join MediConnect today as a patient or partner hospital physician.</p>
          <div className="cta-banner-buttons">
            <Link to="/doctors" className="button button-primary">
              Book a Consultation
            </Link>
            <Link to="/contact" className="button button-outline">
              Contact Hospital Reception
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
