import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/common/Modal";
import {
  Building2,
  PlusCircle,
  Edit2,
  HeartPulse,
  Brain,
  Sparkles,
  Stethoscope,
  Baby,
  Bone,
  Smile,
  ShieldAlert,
  Users,
  Phone
} from "lucide-react";

export function ManageDepartments() {
  const { departments, addDepartment, updateDepartment } = useApp();

  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingDeptId, setEditingDeptId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    headOfDepartment: "",
    wardLocation: "",
    phone: "+1 (555) 019-2800",
    description: "",
    color: "#087F8C"
  });

  const getDeptIcon = (name) => {
    switch (name) {
      case "Cardiology": return <HeartPulse size={22} />;
      case "Neurology": return <Brain size={22} />;
      case "Dermatology": return <Sparkles size={22} />;
      case "General Medicine": return <Stethoscope size={22} />;
      case "Pediatrics": return <Baby size={22} />;
      case "Orthopedics": return <Bone size={22} />;
      case "Dentistry": return <Smile size={22} />;
      default: return <ShieldAlert size={22} />;
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingDeptId(null);
    setFormData({
      name: "",
      code: "",
      headOfDepartment: "Dr. New Specialist",
      wardLocation: "East Wing, 2nd Floor",
      phone: "+1 (555) 019-2800",
      description: "",
      color: "#087F8C"
    });
  };

  const handleOpenEdit = (dept) => {
    setModalMode("edit");
    setEditingDeptId(dept.id);
    setFormData({
      name: dept.name,
      code: dept.code,
      headOfDepartment: dept.headOfDepartment,
      wardLocation: dept.wardLocation,
      phone: dept.phone,
      description: dept.description,
      color: dept.color || "#087F8C"
    });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      addDepartment(formData);
    } else if (modalMode === "edit" && editingDeptId) {
      updateDepartment(editingDeptId, formData);
    }
    setModalMode(null);
  };

  return (
    <div className="manage-departments-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Hospital Clinical Departments & Wards</h2>
          <p>Configure medical specialties, department heads, inpatient ward locations, and contact extensions</p>
        </div>
        <button className="button button-primary" onClick={handleOpenAdd}>
          <PlusCircle size={16} /> Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="services-detail-grid mt-4">
        {departments.map((dept) => (
          <div key={dept.id} className="dept-detail-card">
            <div className="dept-card-top">
              <div
                className="dept-icon-wrapper"
                style={{ color: dept.color, background: `${dept.color}15` }}
              >
                {getDeptIcon(dept.name)}
              </div>
              <div className="d-flex align-center gap-2">
                <span className="dept-code-tag">{dept.code}</span>
                <button
                  className="button button-outline button-xs"
                  onClick={() => handleOpenEdit(dept)}
                  title="Edit Department"
                >
                  <Edit2 size={12} />
                </button>
              </div>
            </div>

            <h3>{dept.name}</h3>
            <p className="dept-desc">{dept.description}</p>

            <div className="dept-meta-info">
              <div className="dept-meta-row">
                <span>Head of Department:</span>
                <strong>{dept.headOfDepartment}</strong>
              </div>
              <div className="dept-meta-row">
                <span>Active Physicians:</span>
                <strong>{dept.doctorsCount} Specialists</strong>
              </div>
              <div className="dept-meta-row">
                <span>Location:</span>
                <strong>{dept.wardLocation}</strong>
              </div>
              <div className="dept-meta-row">
                <span>Extension:</span>
                <strong>{dept.phone}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={Boolean(modalMode)}
        onClose={() => setModalMode(null)}
        title={modalMode === "add" ? "Create Hospital Department" : "Edit Department Details"}
        subtitle="Configure hospital specialty parameters and ward allocation"
      >
        <form onSubmit={handleSubmitModal}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Department Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Oncology"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Department Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. ONCO"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Head of Department</label>
              <input
                type="text"
                placeholder="Dr. Full Name"
                value={formData.headOfDepartment}
                onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Ward / Floor Location</label>
              <input
                type="text"
                placeholder="e.g. North Wing, 5th Floor"
                value={formData.wardLocation}
                onChange={(e) => setFormData({ ...formData, wardLocation: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Theme Color Tag</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Clinical Scope Description</label>
            <textarea
              rows={3}
              placeholder="Outline clinical specializations, inpatient beds, and primary treatments..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="modal-footer mt-4">
            <button type="button" className="button button-outline" onClick={() => setModalMode(null)}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {modalMode === "add" ? "Register Department" : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ManageDepartments;
