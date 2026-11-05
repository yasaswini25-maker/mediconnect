import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  TrendAreaChart,
  DonutChart,
  SimpleBarChart,
  CompletionRing
} from "../../components/common/InteractiveCharts";
import {
  Users,
  Calendar,
  UserCheck,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  PlusCircle,
  Activity,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";

export function AdminDashboard() {
  const { user } = useAuth();
  const { doctors, appointments, departments, activityLogs } = useApp();

  const totalDoctors = doctors.length;
  const pendingApprovals = doctors.filter((d) => d.status === "Pending").length;
  const totalAppointments = appointments.length;
  const completedApts = appointments.filter((a) => a.status === "Completed").length;
  const cancelledApts = appointments.filter((a) => a.status === "Cancelled").length;

  const departmentData = departments.slice(0, 5).map((d) => ({
    label: d.name,
    value: d.activePatients || 50,
    color: d.color || "#087F8C"
  }));

  return (
    <div className="admin-dashboard-view">
      {/* Welcome Banner */}
      <div className="dash-welcome-banner admin-banner">
        <div className="welcome-banner-text">
          <span className="section-eyebrow">HOSPITAL MANAGEMENT COMMAND</span>
          <h1>Hospital Operations Overview</h1>
          <p>
            System Administrator: {user?.name || "Dr. Arthur Sterling"} • Central Hospital Pavilion & Telehealth Network
          </p>
        </div>

        <div className="welcome-banner-actions">
          <Link to="/admin/approvals" className="button button-outline admin-header-btn">
            <UserCheck size={16} /> Doctor Approvals ({pendingApprovals})
          </Link>
          <Link to="/admin/doctors" className="button button-primary admin-header-btn">
            <PlusCircle size={16} /> Add Doctor
          </Link>
        </div>
      </div>

      {/* 6 Key Operational Metrics */}
      <div className="dashboard-grid-stats mt-4">
        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-teal">
            <Users size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Active Doctors</small>
            <h3>{totalDoctors}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-amber">
            <UserCheck size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Pending Approvals</small>
            <h3>{pendingApprovals}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-navy">
            <Calendar size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Total Appointments</small>
            <h3>{totalAppointments}</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-emerald">
            <CheckCircle2 size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Completed Consultations</small>
            <h3>{completedApts}</h3>
          </div>
        </div>
      </div>

      {/* Interactive Charts Row */}
      <div className="dash-two-column-grid">
        {/* Monthly Appointment Trends Area Chart */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Monthly Patient Flow Trends</h3>
              <p>Appointments scheduled vs completed consultations</p>
            </div>
            <Link to="/admin/analytics" className="text-teal font-semibold text-sm">
              Deep Analytics →
            </Link>
          </div>
          <TrendAreaChart />
        </div>

        {/* Department Volume Distribution Donut Chart */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Department-Wise Patient Volume</h3>
              <p>Active patient cases across core hospital wards</p>
            </div>
            <Link to="/admin/departments" className="text-teal font-semibold text-sm">
              Manage Wards →
            </Link>
          </div>
          <DonutChart data={departmentData} />
        </div>
      </div>

      {/* Bottom Grid: Recent Activity Audit & Quick Actions */}
      <div className="dash-two-column-grid mt-4">
        {/* Real-time System Audit Activity */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Real-Time System Activity Log</h3>
              <p>Recent hospital operations and security events</p>
            </div>
            <Link to="/admin/activity" className="text-teal font-semibold text-sm">
              View Audit Ledger →
            </Link>
          </div>

          <div className="activity-feed-list">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="activity-feed-item">
                <div className="activity-dot-circle" />
                <div className="activity-body">
                  <div className="d-flex justify-between">
                    <strong>{log.action}</strong>
                    <span className="text-xs text-muted">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">{log.details}</p>
                  <small className="text-xs text-teal font-semibold">
                    Actor: {log.user} ({log.role})
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency & Doctor Approvals Spotlight */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Operational Efficiency Benchmark</h3>
              <p>Consultation completion and triage dispatch rates</p>
            </div>
          </div>

          <div className="d-flex align-center justify-around py-3">
            <CompletionRing percentage={92} label="Completion Rate" color="#10B981" />
            <CompletionRing percentage={96} label="Doctor Retention" color="#087F8C" />
          </div>

          {pendingApprovals > 0 ? (
            <div className="notice-banner banner-info mt-4">
              <ShieldAlert size={18} className="text-amber" />
              <div>
                <strong>Action Needed: {pendingApprovals} Doctor Application Pending</strong>
                <p className="text-xs mt-1">Review licenses and verify credentials before activating profile.</p>
                <Link to="/admin/approvals" className="button button-primary button-xs mt-2 inline-block">
                  Inspect Applications →
                </Link>
              </div>
            </div>
          ) : (
            <div className="notice-banner banner-success mt-4">
              <ShieldCheck size={18} />
              <span>All doctor registrations are currently verified and up-to-date.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
