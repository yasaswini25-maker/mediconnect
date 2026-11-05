import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  Stethoscope,
  Building,
  GraduationCap,
  Award,
  CheckCircle2,
  Save,
  Phone,
  Mail,
  DollarSign
} from "lucide-react";

export function DoctorProfile() {
  const { user, updateProfile } = useAuth();
  const { doctors, updateDoctor, triggerAlert } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const [formData, setFormData] = useState({
    name: currentDoctor.name || "Dr. Sarah Johnson",
    title: currentDoctor.title || "Senior Consultant Cardiologist",
    specialty: currentDoctor.specialty || "Cardiology",
    department: currentDoctor.department || "Cardiology",
    qualifications: currentDoctor.qualifications || "MD, FACC, Harvard Medical School",
    experience: currentDoctor.experience || 14,
    fee: currentDoctor.fee || 120,
    phone: currentDoctor.phone || "+1 (555) 234-5678",
    email: currentDoctor.email || "doctor@mediconnect.com",
    hospital: currentDoctor.hospital || "MediConnect Central Medical Pavilion",
    room: currentDoctor.room || "Suite 402, North Wing",
    about: currentDoctor.about || "Dedicated physician committed to evidence-based care."
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateDoctor(currentDoctor.id, {
      name: formData.name,
      title: formData.title,
      specialty: formData.specialty,
      department: formData.department,
      qualifications: formData.qualifications,
      experience: Number(formData.experience),
      fee: Number(formData.fee),
      phone: formData.phone,
      hospital: formData.hospital,
      room: formData.room,
      about: formData.about
    });

    updateProfile({
      name: formData.name,
      phone: formData.phone,
      title: formData.title,
      specialty: formData.specialty
    });

    setSavedSuccess(true);
    triggerAlert({
      title: "Doctor Profile Saved",
      message: "All changes to your profile have been saved successfully.",
      type: "success"
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="doctor-profile-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Physician Credentials & Practice Profile</h2>
          <p>Update your clinical qualifications, consultation fees, clinic room, and patient-facing bio</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="notice-banner banner-success mt-3 animate-slide-in">
          <CheckCircle2 size={18} /> All changes to your profile have been saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="profile-form-grid mt-4">
        {/* Left Side: Photo & Badges */}
        <div className="profile-sidebar-card mc-card">
          <div className="avatar-preview-box text-center">
            <img
              src={currentDoctor.image}
              alt={currentDoctor.name}
              className="profile-large-avatar"
            />
            <h3 className="mt-3">{formData.name}</h3>
            <span className="role-tag role-doctor mt-1">Verified Clinical Specialist</span>
            <small className="block text-muted mt-1">{formData.title}</small>
          </div>

          <div className="profile-quick-stats-box mt-4">
            <div className="quick-stat-row">
              <span className="text-muted">Specialty:</span>
              <strong className="text-teal">{formData.specialty}</strong>
            </div>
            <div className="quick-stat-row">
              <span className="text-muted">Experience:</span>
              <strong>{formData.experience}+ Years</strong>
            </div>
            <div className="quick-stat-row">
              <span className="text-muted">Consultation Fee:</span>
              <strong className="text-emerald">${formData.fee}</strong>
            </div>
            <div className="quick-stat-row">
              <span className="text-muted">Rating:</span>
              <strong className="text-amber">{currentDoctor.rating} ★ ({currentDoctor.reviewsCount})</strong>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="profile-main-card mc-card">
          <h4 className="card-section-title">Clinical Credentials & Titles</h4>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Doctor Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Clinical Department</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Gynecology">Gynecology</option>
              </select>
            </div>

            <div className="form-group">
              <label>Qualifications & Fellowships</label>
              <input
                type="text"
                name="qualifications"
                required
                value={formData.qualifications}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Years Experience</label>
              <input
                type="number"
                name="experience"
                min="1"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Consultation Fee ($)</label>
              <input
                type="number"
                name="fee"
                min="10"
                value={formData.fee}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="form-divider-line my-4" />

          {/* Hospital Location */}
          <h4 className="card-section-title">Clinic Location & Pavilion</h4>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Hospital Pavilion</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Room / Suite Number</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Physician Bio & Clinical Approach</label>
            <textarea
              rows={3}
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
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

export default DoctorProfile;
