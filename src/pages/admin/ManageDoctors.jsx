import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/common/Modal";
import {
  Users,
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  ShieldCheck,
  Star,
  Building,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function ManageDoctors() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, departments } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Add / Edit Modal
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingDocId, setEditingDocId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+1 (555) 000-0000",
    specialty: "Cardiology",
    department: "Cardiology",
    title: "Senior Consultant",
    qualifications: "MD, Board Certified",
    experience: 10,
    fee: 100,
    hospital: "MediConnect Central Pavilion",
    room: "Suite 301",
    status: "Active"
  });

  // Delete Confirm Modal
  const [deleteTargetDoc, setDeleteTargetDoc] = useState(null);

  const filteredDoctors = doctors.filter((doc) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.email.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q);

    const matchesDept = selectedDept === "All" || doc.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || doc.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingDocId(null);
    setFormData({
      name: "",
      email: "",
      phone: "+1 (555) 000-0000",
      specialty: departments[0]?.name || "Cardiology",
      department: departments[0]?.name || "Cardiology",
      title: "Senior Consultant",
      qualifications: "MD, Board Certified",
      experience: 10,
      fee: 100,
      hospital: "MediConnect Central Pavilion",
      room: "Suite 301",
      status: "Active"
    });
  };

  const handleOpenEdit = (doc) => {
    setModalMode("edit");
    setEditingDocId(doc.id);
    setFormData({
      name: doc.name,
      email: doc.email,
      phone: doc.phone || "+1 (555) 000-0000",
      specialty: doc.specialty,
      department: doc.department,
      title: doc.title,
      qualifications: doc.qualifications,
      experience: doc.experience,
      fee: doc.fee,
      hospital: doc.hospital,
      room: doc.room,
      status: doc.status
    });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      addDoctor({
        ...formData,
        modes: ["In-Person", "Online"],
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85",
        about: "Board certified specialist devoted to evidence-based healthcare."
      });
    } else if (modalMode === "edit" && editingDocId) {
      updateDoctor(editingDocId, formData);
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetDoc) return;
    deleteDoctor(deleteTargetDoc.id);
    setDeleteTargetDoc(null);
  };

  return (
    <div className="manage-doctors-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Physician Directory & Staff Management</h2>
          <p>Add new medical personnel, update credentials, configure consultation fees, and assign departments</p>
        </div>
        <button className="button button-primary" onClick={handleOpenAdd}>
          <PlusCircle size={16} /> Add New Doctor
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="d-flex gap-3 align-center flex-wrap">
          <div className="search-input-wrap">
            <Search size={16} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search by physician name, specialty, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="d-flex align-center gap-2">
            <label className="text-xs font-semibold text-muted">Department:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="text-sm p-2 border rounded"
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="d-flex align-center gap-2">
            <label className="text-xs font-semibold text-muted">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-sm p-2 border rounded"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending Verification</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Physician Name</th>
                <th>Department & Specialty</th>
                <th>Credentials & Experience</th>
                <th>Consultation Fee</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="d-flex align-center gap-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="avatar-img-sm"
                      />
                      <div>
                        <strong>{doc.name}</strong>
                        <small className="block text-muted">{doc.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="doc-specialty-pill">{doc.specialty}</span>
                    <small className="block text-muted mt-1">{doc.hospital} ({doc.room})</small>
                  </td>
                  <td>
                    <span className="text-sm font-semibold">{doc.experience}+ Years Exp</span>
                    <small className="block text-muted">{doc.qualifications}</small>
                  </td>
                  <td>
                    <strong className="text-emerald">${doc.fee}</strong>
                  </td>
                  <td>
                    <span className={`status-badge badge-${doc.status.toLowerCase()}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex justify-end gap-2">
                      <button
                        className="button button-outline button-xs"
                        onClick={() => handleOpenEdit(doc)}
                      >
                        <Edit2 size={13} /> Edit
                      </button>
                      <button
                        className="button button-outline button-xs button-danger"
                        onClick={() => setDeleteTargetDoc(doc)}
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Doctor Modal */}
      <Modal
        isOpen={Boolean(modalMode)}
        onClose={() => setModalMode(null)}
        title={modalMode === "add" ? "Register New Doctor" : "Update Doctor Details"}
        subtitle="Manage physician clinical credentials and facility placement"
      >
        <form onSubmit={handleSubmitModal}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Doctor Full Name *</label>
              <input
                type="text"
                required
                placeholder="Dr. John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Doctor Email *</label>
              <input
                type="email"
                required
                placeholder="j.smith@mediconnect.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Clinical Department</label>
              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                    specialty: e.target.value
                  })
                }
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                placeholder="e.g. Lead Cardiologist"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Qualifications</label>
              <input
                type="text"
                placeholder="MD, FACC"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                min="1"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>Consultation Fee ($)</label>
              <input
                type="number"
                min="10"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Room / Ward Number</label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Account Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending Verification</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-footer mt-4">
            <button type="button" className="button button-outline" onClick={() => setModalMode(null)}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {modalMode === "add" ? "Register Doctor" : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetDoc)}
        onClose={() => setDeleteTargetDoc(null)}
        title="Remove Doctor"
        subtitle="Confirm decommissioning of physician profile from hospital directory"
      >
        <p className="text-sm text-secondary mb-4">
          Are you sure you want to remove <strong>{deleteTargetDoc?.name}</strong> ({deleteTargetDoc?.specialty}) from the MediConnect hospital staff directory?
        </p>
        <div className="modal-footer">
          <button className="button button-outline" onClick={() => setDeleteTargetDoc(null)}>
            Keep Doctor
          </button>
          <button className="button button-danger" onClick={handleConfirmDelete}>
            Confirm Deletion
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ManageDoctors;
