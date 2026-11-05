import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Activity,
  ShieldCheck,
  Search,
  Filter,
  Clock,
  User,
  Calendar,
  FilePlus2,
  Lock,
  Download
} from "lucide-react";

export function SystemActivity() {
  const { activityLogs } = useApp();
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = activityLogs.filter((log) => {
    const matchesFilter = filterType === "All" || log.type === filterType.toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      log.action.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.user?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const getLogIcon = (type) => {
    switch (type) {
      case "auth": return <Lock size={16} className="text-amber" />;
      case "appointment": return <Calendar size={16} className="text-teal" />;
      case "clinical": return <FilePlus2 size={16} className="text-mint" />;
      case "security": return <ShieldCheck size={16} className="text-rose" />;
      default: return <Activity size={16} className="text-navy" />;
    }
  };

  return (
    <div className="system-activity-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>System Audit Trail & Hospital Activity Logs</h2>
          <p>Chronological, immutable audit ledger tracking authentication, doctor verifications, and clinical workflows</p>
        </div>
        <button
          className="button button-outline"
          onClick={() => alert("Exporting MediConnect HIPAA Audit Trail (CSV)...")}
        >
          <Download size={15} /> Export Audit Log
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="table-controls-bar mc-card mt-3">
        <div className="tabs-pill-row">
          {["All", "Auth", "Appointment", "Clinical", "Security"].map((type) => (
            <button
              key={type}
              className={`tab-pill-btn ${filterType === type ? "active" : ""}`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={16} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search audit trail by action, actor, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Activity Table */}
      <div className="mc-card mt-4">
        <div className="mc-table-container">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Operation / Event</th>
                <th>Details</th>
                <th>Actor & Role</th>
                <th>Category</th>
                <th className="text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div className="d-flex align-center gap-2">
                      <div className="p-2 rounded bg-surface-alt">
                        {getLogIcon(log.type)}
                      </div>
                      <strong className="text-secondary">{log.action}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-muted">{log.details}</span>
                  </td>
                  <td>
                    <strong>{log.user || "System"}</strong>
                    <small className="block text-muted">{log.role || "Automated"}</small>
                  </td>
                  <td>
                    <span className="doc-specialty-pill">{log.type?.toUpperCase()}</span>
                  </td>
                  <td className="text-right">
                    <span className="text-xs font-mono text-muted">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
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

export default SystemActivity;
