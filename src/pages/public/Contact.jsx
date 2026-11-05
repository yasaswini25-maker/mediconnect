import { useState } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General Medicine",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "General Medicine",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="contact-page-root">
      {/* Banner */}
      <section className="about-hero-banner">
        <div className="landing-container text-center">
          <span className="section-eyebrow">GET IN TOUCH</span>
          <h1>Contact MediConnect Hospital System</h1>
          <p className="about-hero-sub">
            Our clinical receptionists and patient care coordinators are available 24/7. Send us an inquiry, report a portal issue, or contact our medical pavilions directly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-padding bg-surface">
        <div className="landing-container">
          <div className="contact-main-grid">
            {/* Left: Contact Info & Emergency Cards */}
            <div className="contact-info-column">
              <div className="contact-highlight-card emergency-hotline-card">
                <div className="emergency-icon-wrap">
                  <PhoneCall size={26} className="pulse-icon text-white" />
                </div>
                <div>
                  <h4>24/7 Clinical Emergency Line</h4>
                  <p>For urgent medical dispatch, ambulance or acute symptoms.</p>
                  <a href="tel:+18005552273" className="emergency-phone-link">
                    1-800-555-CARE (2273)
                  </a>
                </div>
              </div>

              <div className="contact-details-box">
                <h3>Central Hospital Facility</h3>

                <div className="contact-info-row">
                  <MapPin size={20} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Main Campus & Clinics</strong>
                    <p>MediConnect Central Medical Pavilion<br />450 Lexington Ave, Suite 1200<br />New York, NY 10017</p>
                  </div>
                </div>

                <div className="contact-info-row">
                  <PhoneCall size={20} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Patient Reception & Bookings</strong>
                    <p>+1 (555) 019-2830 • Mon-Sat 8:00 AM - 7:00 PM</p>
                  </div>
                </div>

                <div className="contact-info-row">
                  <Mail size={20} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Email Support</strong>
                    <p>care@mediconnect.com • support@mediconnect.com</p>
                  </div>
                </div>

                <div className="contact-info-row">
                  <Clock size={20} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Outpatient Clinic Visiting Hours</strong>
                    <p>Monday – Friday: 08:30 AM – 06:00 PM<br />Saturday: 09:00 AM – 03:00 PM<br />Sunday: Emergency & Telehealth Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Inquiry Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                <h3>Send a Clinical Inquiry or Message</h3>
                <p className="form-sub-text">Our patient coordination team typically responds within 2-4 hours.</p>

                {submitted ? (
                  <div className="notice-banner banner-success mt-4">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>Message Dispatched Successfully!</strong>
                      <p>Thank you. A MediConnect care coordinator will follow up with you shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Reynolds"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Contact Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Relevant Department</label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        >
                          <option value="General Medicine">General Medicine</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Telehealth Support">Telehealth Virtual Clinic</option>
                          <option value="Billing & Insurance">Billing & Insurance Desk</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Appointment rescheduling question, lab report inquiry..."
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Message / Details *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please describe your question or symptom summary..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="button button-primary full-width mt-2">
                      <Send size={16} /> Submit Clinical Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
