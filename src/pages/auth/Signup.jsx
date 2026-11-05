import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HEALTHCARE_IMAGES } from "../../config/images";
import smsService from "../../services/smsService";
import api from "../../services/api";
import {
  HeartPulse,
  User,
  Stethoscope,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smartphone
} from "lucide-react";

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("patient"); // patient or doctor
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "Male",
    dob: "1994-06-15",
    bloodGroup: "O+",
    address: "",
    specialty: "General Medicine",
    department: "General Medicine",
    qualifications: "MD, Board Certified",
    experience: "8",
    fee: "80",
    about: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        role,
        avatar:
          role === "doctor"
            ? HEALTHCARE_IMAGES.doctor2
            : HEALTHCARE_IMAGES.patient4
      };

      // 1. Sync with backend API (dual-mode)
      await api.auth.signup(payload);

      // 2. Save in active auth context
      const newUser = signup(payload);

      // 3. Dispatch simulated real-time SMS to registered phone
      smsService.sendWelcomeSms(formData.phone, formData.name);
      setSmsSentNotice(true);

      setTimeout(() => {
        if (newUser.role === "doctor") {
          navigate("/doctor/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create account. Please check input values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-split-grid">
        {/* Left Visual Column */}
        <div className="auth-visual-side">
          <img
            src={HEALTHCARE_IMAGES.digitalHealth}
            alt="Healthcare innovation"
            className="auth-hero-bg-img"
          />
          <div className="auth-visual-glass-overlay">
            <div className="auth-brand-badge">
              <HeartPulse size={20} className="text-white" />
              <span>MediConnect Registration</span>
            </div>
            <h2>Join the Digital Healthcare Movement</h2>
            <p>
              Connect directly with verified specialists, manage complete electronic health records, attend online consultations, and access electronic prescriptions.
            </p>

            <div className="auth-features-mini-list">
              <div className="auth-mini-feat">
                <ShieldCheck size={16} className="text-mint" />
                <span>Zero Subscription or Booking Surcharges</span>
              </div>
              <div className="auth-mini-feat">
                <CheckCircle2 size={16} className="text-mint" />
                <span>Instant Patient & Clinical Account Activation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-form-side">
          <div className="auth-card-container">
            <div className="auth-header-block">
              <span className="section-eyebrow">NEW REGISTRATION</span>
              <h2>Create Your MediConnect Account</h2>
              <p className="auth-sub-text">
                Select your account role to get started:
              </p>
            </div>

            {/* Role Tabs */}
            <div className="role-selector-tabs">
              <button
                type="button"
                className={`role-tab-btn ${role === "patient" ? "active" : ""}`}
                onClick={() => setRole("patient")}
              >
                <User size={18} />
                <span>I am a Patient</span>
              </button>
              <button
                type="button"
                className={`role-tab-btn ${role === "doctor" ? "active" : ""}`}
                onClick={() => setRole("doctor")}
              >
                <Stethoscope size={18} />
                <span>I am a Doctor / Clinician</span>
              </button>
            </div>

            {error && (
              <div className="notice-banner banner-danger mb-3">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            {smsSentNotice && (
              <div className="notice-banner banner-success mb-3 animate-fade-in">
                <Smartphone size={18} /> SMS confirmation code sent to <strong>{formData.phone}</strong>. Redirecting to your dashboard...
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form-fields">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={role === "doctor" ? "Dr. Jane Doe" : "Jane Doe"}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <div className="d-flex justify-between align-center">
                    <label>Password *</label>
                    <button
                      type="button"
                      className="password-toggle-link"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      <span>{showPassword ? "Hide" : "Show"}</span>
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Patient-Specific Fields */}
              {role === "patient" && (
                <>
                  <div className="form-grid-3">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Blood Group</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Residential Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="e.g. 124 Main Street, Springfield, OR"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Doctor-Specific Fields */}
              {role === "doctor" && (
                <>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Specialty & Department</label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            specialty: e.target.value,
                            department: e.target.value
                          });
                        }}
                      >
                        <option value="General Medicine">General Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Dentistry">Dentistry</option>
                        <option value="Gynecology">Gynecology</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Clinical Qualifications</label>
                      <input
                        type="text"
                        name="qualifications"
                        placeholder="e.g. MD, FACC, Board Certified"
                        value={formData.qualifications}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Years of Clinical Experience</label>
                      <input
                        type="number"
                        name="experience"
                        min="1"
                        placeholder="10"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Standard Consultation Fee ($)</label>
                      <input
                        type="number"
                        name="fee"
                        min="10"
                        placeholder="100"
                        value={formData.fee}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Professional Bio / Clinical Focus</label>
                    <textarea
                      rows={2}
                      name="about"
                      placeholder="Brief summary of clinical specialties, fellowships, and patient philosophy..."
                      value={formData.about}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="notice-banner banner-info mb-3">
                    <ShieldCheck size={16} /> Doctor registrations are reviewed and verified by Hospital Administration before receiving bookings.
                  </div>
                </>
              )}

              <button
                type="submit"
                className="button button-primary full-width auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : `Complete ${role === "doctor" ? "Doctor" : "Patient"} Registration`} <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-card-footer mt-4 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-switch-link">
                  Log in to your portal →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
