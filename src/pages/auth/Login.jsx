import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HEALTHCARE_IMAGES } from "../../config/images";
import {
  HeartPulse,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

export function Login() {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectByRole = (role) => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "doctor") navigate("/doctor/dashboard");
    else navigate("/patient/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedInUser = login(email, password);
      redirectByRole(loggedInUser.role);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    setError("");
    try {
      const loggedInUser = loginAsDemo(role);
      redirectByRole(loggedInUser.role);
    } catch (err) {
      setError(err.message || "Failed to launch demo account.");
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-split-grid">
        {/* Left Side: Healthcare Photograph & Value Props */}
        <div className="auth-visual-side">
          <img
            src={HEALTHCARE_IMAGES.consultationRoom}
            alt="Healthcare professional"
            className="auth-hero-bg-img"
          />
          <div className="auth-visual-glass-overlay">
            <div className="auth-brand-badge">
              <HeartPulse size={20} className="text-white" />
              <span>MediConnect Healthcare</span>
            </div>
            <h2>Next-Generation Digital Health Network</h2>
            <p>
              Unified outpatient care, live queue tracking, certified telemedicine, electronic health records, and clinical practice administration.
            </p>

            <div className="auth-features-mini-list">
              <div className="auth-mini-feat">
                <ShieldCheck size={16} className="text-mint" />
                <span>HIPAA-Compliant Security & Privacy</span>
              </div>
              <div className="auth-mini-feat">
                <Stethoscope size={16} className="text-mint" />
                <span>500+ Verified Hospital Specialists</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form & One-Click Demo Access */}
        <div className="auth-form-side">
          <div className="auth-card-container">
            <div className="auth-header-block">
              <span className="section-eyebrow">PORTAL ACCESS</span>
              <h2>Welcome to MediConnect</h2>
              <p className="auth-sub-text">
                Sign in with your email or test any role instantly with one click.
              </p>
            </div>

            {/* ONE-CLICK DEMO LOGIN BUTTONS */}
            <div className="demo-login-box">
              <div className="demo-box-header">
                <Sparkles size={16} className="text-amber" />
                <strong>1-Click Instant Demo Login</strong>
              </div>
              <p className="demo-box-desc">
                Test the platform immediately without entering credentials:
              </p>

              <div className="demo-btn-group">
                <button
                  type="button"
                  className="demo-role-btn patient-btn"
                  onClick={() => handleDemoLogin("patient")}
                >
                  <User size={16} />
                  <div>
                    <strong>Patient Demo</strong>
                    <small>Alex Reynolds (O+)</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="demo-role-btn doctor-btn"
                  onClick={() => handleDemoLogin("doctor")}
                >
                  <Stethoscope size={16} />
                  <div>
                    <strong>Doctor Demo</strong>
                    <small>Dr. Sarah Johnson</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="demo-role-btn admin-btn"
                  onClick={() => handleDemoLogin("admin")}
                >
                  <ShieldCheck size={16} />
                  <div>
                    <strong>Admin Demo</strong>
                    <small>Dr. Arthur Sterling</small>
                  </div>
                </button>
              </div>

              <div className="demo-password-hint">
                <span>Default Password for all accounts: <code>demo123</code></span>
              </div>
            </div>

            <div className="auth-divider-line">
              <span>or sign in with credentials</span>
            </div>

            {error && (
              <div className="notice-banner banner-danger mb-3">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form-fields">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. patient@mediconnect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <div className="d-flex justify-between align-center">
                  <label>Password</label>
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
                  required
                  placeholder="Enter your account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="button button-primary full-width auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Sign In to Portal"} <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-card-footer mt-4 text-center">
              <p>
                Don't have an account yet?{" "}
                <Link to="/signup" className="auth-switch-link">
                  Register as Patient or Doctor →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
