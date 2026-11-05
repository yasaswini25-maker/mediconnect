import { useState } from "react";

// Area / Line Trend Chart (SVG with hover tooltip & gradients)
export function TrendAreaChart({
  data = [
    { label: "Jan", value: 340, value2: 280 },
    { label: "Feb", value: 420, value2: 350 },
    { label: "Mar", value: 510, value2: 410 },
    { label: "Apr", value: 680, value2: 490 },
    { label: "May", value: 790, value2: 560 },
    { label: "Jun", value: 920, value2: 670 },
    { label: "Jul", value: 870, value2: 710 },
    { label: "Aug", value: 950, value2: 780 },
    { label: "Sep", value: 1100, value2: 890 },
    { label: "Oct", value: 1240, value2: 960 }
  ],
  height = 260,
  line1Color = "#087F8C",
  line2Color = "#E29578",
  legend1 = "Appointments",
  legend2 = "Consultations"
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const maxValue = Math.max(...data.map((d) => Math.max(d.value, d.value2 || 0))) * 1.15;
  const width = 640;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const points1 = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartWidth;
    const y = height - paddingY - (d.value / maxValue) * chartHeight;
    return { x, y, ...d };
  });

  const points2 = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartWidth;
    const y = height - paddingY - ((d.value2 || 0) / maxValue) * chartHeight;
    return { x, y, ...d };
  });

  const path1 = points1.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ""
  );

  const area1 = `${path1} L ${points1[points1.length - 1].x} ${height - paddingY} L ${points1[0].x} ${height - paddingY} Z`;

  const path2 = points2.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ""
  );

  return (
    <div className="chart-wrapper">
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: line1Color }} />
          {legend1}
        </span>
        {legend2 && (
          <span className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: line2Color }} />
            {legend2}
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="interactive-svg-chart"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={line1Color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={line1Color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = height - paddingY - pct * chartHeight;
          return (
            <g key={i}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#E5EDEF"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#8C9CA4"
              >
                {Math.round(maxValue * pct)}
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={area1} fill="url(#areaGradient1)" />

        {/* Line 2 */}
        {path2 && (
          <path
            d={path2}
            fill="none"
            stroke={line2Color}
            strokeWidth="2.5"
            strokeDasharray="5 5"
          />
        )}

        {/* Line 1 */}
        <path
          d={path1}
          fill="none"
          stroke={line1Color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Data points & Interactive Hover */}
        {points1.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 6 : 4}
              fill="#FFFFFF"
              stroke={line1Color}
              strokeWidth={hoverIndex === i ? 3 : 2}
            />
            {/* Transparent touch area */}
            <rect
              x={p.x - 20}
              y={paddingY}
              width={40}
              height={chartHeight}
              fill="transparent"
            />
            {/* X-axis label */}
            <text
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight={hoverIndex === i ? "600" : "400"}
              fill={hoverIndex === i ? "#087F8C" : "#74868E"}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {hoverIndex !== null && (
        <div
          className="chart-tooltip"
          style={{
            left: `${(points1[hoverIndex].x / width) * 100}%`
          }}
        >
          <strong>{data[hoverIndex].label}</strong>
          <div>
            <span style={{ color: line1Color }}>●</span> {legend1}:{" "}
            {data[hoverIndex].value}
          </div>
          {data[hoverIndex].value2 !== undefined && (
            <div>
              <span style={{ color: line2Color }}>●</span> {legend2}:{" "}
              {data[hoverIndex].value2}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Donut / Pie Breakdown Chart (SVG)
export function DonutChart({
  data = [
    { label: "Cardiology", value: 35, color: "#087F8C" },
    { label: "General Med", value: 25, color: "#153B46" },
    { label: "Orthopedics", value: 18, color: "#2E86AB" },
    { label: "Pediatrics", value: 14, color: "#E29578" },
    { label: "Dermatology", value: 8, color: "#0B9B8A" }
  ],
  size = 200,
  innerRadius = 55,
  outerRadius = 85
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedAngle = 0;

  const slices = data.map((item) => {
    const startAngle = accumulatedAngle;
    const sliceAngle = (item.value / total) * 360;
    accumulatedAngle += sliceAngle;
    const endAngle = accumulatedAngle;

    const rad1 = ((startAngle - 90) * Math.PI) / 180;
    const rad2 = ((endAngle - 90) * Math.PI) / 180;

    const x1 = 100 + outerRadius * Math.cos(rad1);
    const y1 = 100 + outerRadius * Math.sin(rad1);
    const x2 = 100 + outerRadius * Math.cos(rad2);
    const y2 = 100 + outerRadius * Math.sin(rad2);

    const x3 = 100 + innerRadius * Math.cos(rad2);
    const y3 = 100 + innerRadius * Math.sin(rad2);
    const x4 = 100 + innerRadius * Math.cos(rad1);
    const y4 = 100 + innerRadius * Math.sin(rad1);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const path = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return { ...item, path, percentage: Math.round((item.value / total) * 100) };
  });

  return (
    <div className="donut-chart-container">
      <div className="donut-svg-wrap">
        <svg viewBox="0 0 200 200" width={size} height={size}>
          {slices.map((slice, i) => (
            <path
              key={i}
              d={slice.path}
              fill={slice.color}
              className="donut-slice"
            />
          ))}
          <text
            x="100"
            y="96"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#153B46"
          >
            {total}
          </text>
          <text
            x="100"
            y="114"
            textAnchor="middle"
            fontSize="11"
            fill="#74868E"
          >
            Total Visits
          </text>
        </svg>
      </div>

      <div className="donut-legend">
        {slices.map((item, i) => (
          <div key={i} className="donut-legend-row">
            <span
              className="legend-dot"
              style={{ backgroundColor: item.color }}
            />
            <span className="donut-label">{item.label}</span>
            <span className="donut-percent">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bar Chart
export function SimpleBarChart({
  data = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 68 },
    { label: "Wed", value: 85 },
    { label: "Thu", value: 92 },
    { label: "Fri", value: 74 },
    { label: "Sat", value: 53 },
    { label: "Sun", value: 31 }
  ],
  barColor = "#087F8C",
  height = 180
}) {
  const max = Math.max(...data.map((d) => d.value)) * 1.15;

  return (
    <div className="bar-chart-container" style={{ height }}>
      <div className="bars-row">
        {data.map((item, i) => {
          const heightPercent = (item.value / max) * 100;
          return (
            <div key={i} className="bar-column">
              <span className="bar-value">{item.value}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: barColor
                  }}
                />
              </div>
              <span className="bar-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Progress / Gauge Ring
export function CompletionRing({
  percentage = 88,
  size = 110,
  strokeWidth = 10,
  color = "#10B981",
  label = "Completed"
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="completion-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E5EDEF"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="completion-ring-text">
        <strong>{percentage}%</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}
