import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  TrendAreaChart,
  DonutChart,
  SimpleBarChart,
  CompletionRing
} from "../../components/common/InteractiveCharts";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Activity,
  CheckCircle2,
  Clock,
  Video,
  DollarSign
} from "lucide-react";

export function AdminAnalytics() {
  const { departments, appointments, doctors } = useApp();

  const departmentData = departments.slice(0, 5).map((d) => ({
    label: d.name,
    value: d.activePatients || 50,
    color: d.color || "#087F8C"
  }));

  const weeklyTraffic = [
    { label: "Mon", value: 124 },
    { label: "Tue", value: 148 },
    { label: "Wed", value: 162 },
    { label: "Thu", value: 155 },
    { label: "Fri", value: 138 },
    { label: "Sat", value: 88 },
    { label: "Sun", value: 42 }
  ];

  return (
    <div className="admin-analytics-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Hospital Operations Analytics & Clinical KPIs</h2>
          <p>Real-time metrics on patient throughput, department allocation, wait times, and consultation efficiency</p>
        </div>
        <button
          className="button button-outline"
          onClick={() => alert("Exporting MediConnect Hospital Operational KPI Report (PDF)...")}
        >
          <Download size={16} /> Export Executive Report
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="dashboard-grid-stats mt-4">
        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-teal">
            <Clock size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Avg. Queue Waiting Time</small>
            <h3>12 <span className="text-sm font-semibold">min</span></h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-emerald">
            <Video size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Telehealth Adoption</small>
            <h3>48.5%</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-navy">
            <Activity size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Completion Rate</small>
            <h3>94.2%</h3>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon stat-icon-amber">
            <TrendingUp size={24} />
          </div>
          <div className="dash-stat-info">
            <small>Patient Satisfaction</small>
            <h3>4.9 ★</h3>
          </div>
        </div>
      </div>

      {/* Main Analytics Charts Grid */}
      <div className="dash-two-column-grid mt-4">
        {/* Monthly Appointment Trends Area Chart */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Annual Patient Volume Trend (2026)</h3>
              <p>Appointments scheduled vs successfully completed consultations</p>
            </div>
          </div>
          <TrendAreaChart
            legend1="Booked Appointments"
            legend2="Completed Consults"
            line1Color="#087F8C"
            line2Color="#10B981"
          />
        </div>

        {/* Department Distribution Donut */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Specialty Distribution</h3>
              <p>Outpatient distribution across clinical departments</p>
            </div>
          </div>
          <DonutChart data={departmentData} />
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="dash-two-column-grid mt-4">
        {/* Weekly Outpatient Traffic Bar Chart */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Daily Outpatient Clinic Traffic</h3>
              <p>Peak patient arrivals by day of the week</p>
            </div>
          </div>
          <SimpleBarChart data={weeklyTraffic} barColor="#087F8C" height={200} />
        </div>

        {/* Operational Efficiency Gauges */}
        <div className="mc-card">
          <div className="dash-section-header">
            <div>
              <h3>Hospital Operational Benchmarks</h3>
              <p>Quality of care and clinical fulfillment metrics</p>
            </div>
          </div>

          <div className="d-flex align-center justify-around py-4">
            <CompletionRing percentage={94} label="Appointment Fulfillment" color="#10B981" />
            <CompletionRing percentage={88} label="Inpatient Bed Occupancy" color="#087F8C" />
            <CompletionRing percentage={98} label="E-Rx Compliance" color="#6366F1" />
          </div>

          <div className="p-3 bg-surface-alt rounded mt-2">
            <p className="text-xs text-muted leading-relaxed">
              <strong>Quality Assurance Note:</strong> Average patient waiting times decreased by 42% since the introduction of the MediConnect Live Outpatient Queue Tracker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
