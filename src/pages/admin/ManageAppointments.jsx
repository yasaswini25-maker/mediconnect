import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import {
  Calendar,
  Clock,
  Video,
  Building,
  Search,
  CheckCircle2,
  XCircle,
  Filter,
  User,
  Stethoscope
} from "lucide-react";

export function ManageAppointments() {
  const { appointments, doctors, updateAppointmentStatus } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState("All");

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        apt.patientName.toLowerCase().includes(q) ||
        apt.doctorName.toLowerCase().includes(q) ||
        apt.reason.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === "All" || apt.status === selectedStatus;
      const matchesDoctor = selectedDoctor === "All" || apt.doctorId === selectedDoctor;

      return matchesSearch && matchesStatus && matchesDoctor;
    });
  }, [appointments, searchTerm, selectedStatus, selectedDoctor]);

  return (
    <div className="manage-appointments-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Master Appointments Ledger & Scheduling Flow</h2>
          <p>Monitor patient bookings, outpatient traffic, consultation modes, and administrative overrides</p>
        </div>
        <span className="rating-counter-badge bg-mint text-teal">
          Total Bookings: {appointments.length}
        </span>
      </div>

      {/* Multi Filter Controls */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="d-flex gap-3 align-center flex-wrap">
          <div className="search-input-wrap">
            <Search size={16} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search by patient, physician, or symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="d-flex align-center gap-2">
            <label className="text-xs font-semibold text-muted">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-sm p-2 border rounded"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="d-flex align-center gap-2">
            <label className="text-xs font-semibold text-muted">Doctor:</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="text-sm p-2 border rounded"
            >
              <option value="All">All Physicians</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Physician / Specialist</th>
                <th>Date & Time</th>
                <th>Type / Token</th>
                <th>Fee</th>
                <th>Status</th>
                <th className="text-right">Administrative Override</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <div>
                      <strong>{apt.patientName}</strong>
                      <small className="block text-muted">{apt.patientPhone || apt.patientEmail}</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>{apt.doctorName}</strong>
                      <small className="block text-teal">{apt.doctorSpecialty}</small>
                    </div>
                  </td>
                  <td>
                    <span>{apt.date}</span>
                    <small className="block text-muted">{apt.time}</small>
                  </td>
                  <td>
                    <span className="doc-specialty-pill">{apt.type}</span>
                    <small className="block font-semibold mt-1">Token #{apt.queueNumber}</small>
                  </td>
                  <td>
                    <strong className="text-secondary">${apt.fee}</strong>
                  </td>
                  <td>
                    <span className={`status-badge badge-${apt.status.toLowerCase()}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex justify-end gap-1">
                      {apt.status === "Pending" && (
                        <button
                          className="button button-primary button-xs"
                          onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}
                        >
                          Approve
                        </button>
                      )}
                      {apt.status !== "Completed" && apt.status !== "Cancelled" && (
                        <>
                          <button
                            className="button button-outline button-xs"
                            onClick={() => updateAppointmentStatus(apt.id, "Completed")}
                          >
                            Mark Done
                          </button>
                          <button
                            className="button button-outline button-xs button-danger"
                            onClick={() => updateAppointmentStatus(apt.id, "Cancelled", "Cancelled by administration")}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {apt.status === "Completed" && (
                        <span className="text-xs text-muted">Archived</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageAppointments;
