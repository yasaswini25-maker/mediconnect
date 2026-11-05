import { Link } from "react-router-dom";
import {
  HeartPulse,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  ExternalLink
} from "lucide-react";

export function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top-banner">
        <div className="footer-container">
          <div className="emergency-banner-inner">
            <div className="emergency-icon-wrap">
              <PhoneCall size={28} className="pulse-icon" />
            </div>
            <div className="emergency-text">
              <h4>24/7 Clinical Emergency Hotline</h4>
              <p>Experiencing acute chest pain, trauma, or severe symptoms? Connect immediately with triage.</p>
            </div>
            <a href="tel:+18005552273" className="emergency-call-btn">
              Call Hotline: 1-800-555-CARE
            </a>
          </div>
        </div>
      </div>

      <div className="footer-main-content">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Column 1: Brand & Mission */}
            <div className="footer-col brand-col">
              <Link to="/" className="footer-brand">
                <div className="brand-symbol">
                  <HeartPulse size={20} strokeWidth={2.4} />
                </div>
                <div className="brand-text">
                  <span>Medi</span>
                  <span className="brand-accent">Connect</span>
                </div>
              </Link>
              <p className="footer-tagline">
                Connecting Patients. Empowering Doctors. Simplifying Healthcare.
              </p>
              <p className="footer-mission-sub">
                A unified digital health ecosystem designed to streamline outpatient visits, telemedicine consultations, electronic prescriptions, and hospital administration.
              </p>

              <div className="footer-certifications">
                <span className="cert-badge">
                  <ShieldCheck size={14} /> HIPAA Compliant Architecture
                </span>
                <span className="cert-badge">
                  <Clock size={14} /> 24/7 Telehealth Active
                </span>
              </div>
            </div>

            {/* Column 2: Patient Services */}
            <div className="footer-col">
              <h4 className="footer-heading">Patient Services</h4>
              <ul className="footer-links-list">
                <li><Link to="/doctors">Find Verified Doctors</Link></li>
                <li><Link to="/patient/consultations">Telemedicine Consultations</Link></li>
                <li><Link to="/patient/records">Electronic Health Records</Link></li>
                <li><Link to="/patient/prescriptions">Digital Prescriptions</Link></li>
                <li><Link to="/patient/appointments">Live Queue Tracker</Link></li>
                <li><Link to="/signup">Create Patient Account</Link></li>
              </ul>
            </div>

            {/* Column 3: Medical Specialties */}
            <div className="footer-col">
              <h4 className="footer-heading">Clinical Specialties</h4>
              <ul className="footer-links-list">
                <li><Link to="/doctors?specialty=Cardiology">Cardiology & Heart Care</Link></li>
                <li><Link to="/doctors?specialty=Neurology">Clinical Neurology</Link></li>
                <li><Link to="/doctors?specialty=Pediatrics">Pediatric Medicine</Link></li>
                <li><Link to="/doctors?specialty=Dermatology">Dermatology & Skin</Link></li>
                <li><Link to="/doctors?specialty=Orthopedics">Orthopedics & Sports Medicine</Link></li>
                <li><Link to="/doctors?specialty=General+Medicine">General & Family Medicine</Link></li>
              </ul>
            </div>

            {/* Column 4: Hospital & Contact */}
            <div className="footer-col contact-col">
              <h4 className="footer-heading">Hospital Pavilion</h4>
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span>MediConnect Central Medical Tower, 450 Lexington Ave, Suite 1200, New York, NY 10017</span>
              </div>
              <div className="contact-item">
                <PhoneCall size={18} className="contact-icon" />
                <span>General Reception: +1 (555) 019-2830</span>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <span>care@mediconnect.com</span>
              </div>

              <div className="demo-accounts-hint">
                <small><strong>Demo Testing Mode Active</strong></small>
                <p>One-click sample logins for Patient, Doctor, and Admin available on the login page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} MediConnect Health System Inc. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/about">Privacy Policy</Link>
              <Link to="/about">Terms of Medical Service</Link>
              <Link to="/about">HIPAA Notice</Link>
              <Link to="/contact">System Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
