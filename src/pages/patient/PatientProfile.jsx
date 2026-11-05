import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Heart,
  Plus
} from "lucide-react";

export function PatientProfile() {
  const { user, updateProfile } = useAuth();
  const { triggerAlert } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || "Alex Reynolds",
    email: user?.email || "patient@mediconnect.com",
    phone: user?.phone || "+1 (555) 712-4433",
    gender: user?.gender || "Male",
    dob: user?.dob || "1988-04-14",
    bloodGroup: user?.bloodGroup || "O+",
    address: user?.address || "742 Evergreen Terrace, Springfield, OR",
    emergencyName: user?.emergencyContact?.name || "Claire Reynolds",
    emergencyRelation: user?.emergencyContact?.relation || "Spouse",
    emergencyPhone: user?.emergencyContact?.phone || "+1 (555) 712-4434",
    insuranceProvider: user?.insurance?.provider || "BlueCross Health Shield",
    insurancePolicy: user?.insurance?.policyNumber || "BC-8921473-90"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyName,
        relation: formData.emergencyRelation,
        phone: formData.emergencyPhone
      },
      insurance: {
        provider: formData.insuranceProvider,
        policyNumber: formData.insurancePolicy,
        validUntil: "2027-12-31"
      }
    });

    setSavedSuccess(true);
    triggerAlert({
      title: "Profile Saved",
      message: "All changes to your profile have been saved successfully.",
      type: "success"
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="patient-profile-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Patient Profile & Medical Identity</h2>
          <p>Manage your personal demographics, emergency contacts, and health insurance details</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="notice-banner banner-success mt-3 animate-slide-in">
          <CheckCircle2 size={18} /> All changes to your profile have been saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="profile-form-grid mt-4">
        {/* Left Column: Avatar & Vitals Badge */}
        <div className="profile-sidebar-card mc-card">
          <div className="avatar-preview-box text-center">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80"}
              alt={user?.name}
              className="profile-large-avatar"
            />
            <h3 className="mt-3">{formData.name}</h3>
            <span className="role-tag role-patient mt-1">Verified Patient</span>
            <small className="block text-muted mt-1">{formData.email}</small>
          </div>

          <div className="profile-quick-stats-box mt-4">
            <div className="quick-stat-row">
              <span className="text-muted">Blood Group:</span>
              <strong className="text-teal">{formData.bloodGroup}</strong>
            </div>
            <div className="quick-stat-row">
              <span className="text-muted">Gender:</span>
              <strong>{formData.gender}</strong>
            </div>
            <div className="quick-stat-row">
              <span className="text-muted">Insurance:</span>
              <strong className="text-emerald">{formData.insuranceProvider.split(" ")[0]}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Form */}
        <div className="profile-main-card mc-card">
          <h4 className="card-section-title">Personal Demographics</h4>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Legal Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address (Account Identifier)</label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="input-disabled"
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

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
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <hr className="form-divider-line my-4" />

          {/* Emergency Contact */}
          <h4 className="card-section-title">Emergency Contact Information</h4>
          <div className="form-grid-3">
            <div className="form-group">
              <label>Contact Name</label>
              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Relationship</label>
              <input
                type="text"
                name="emergencyRelation"
                placeholder="Spouse, Parent, etc."
                value={formData.emergencyRelation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Emergency Phone</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="form-divider-line my-4" />

          {/* Insurance Details */}
          <h4 className="card-section-title">Health Insurance Coverage</h4>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Insurance Provider</label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Policy / Member ID</label>
              <input
                type="text"
                name="insurancePolicy"
                value={formData.insurancePolicy}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-submit-row mt-4">
            <button type="submit" className="button button-primary">
              <Save size={16} /> Save Profile Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PatientProfile;
