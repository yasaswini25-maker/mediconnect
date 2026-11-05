export function StatCard({
  icon: Icon,
  colorScheme = "teal", // teal, emerald, navy, amber
  title,
  value,
  trend,
  className = ""
}) {
  return (
    <div className={`dash-stat-card ${className}`}>
      {Icon && (
        <div className={`dash-stat-icon stat-icon-${colorScheme}`}>
          <Icon size={24} />
        </div>
      )}
      <div className="dash-stat-info">
        <small>{title}</small>
        <h3>{value}</h3>
        {trend && <span className="stat-trend-tag">{trend}</span>}
      </div>
    </div>
  );
}

export default StatCard;
