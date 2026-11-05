import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle({ showLabel = true, className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${isDark ? "theme-dark" : "theme-light"} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <div className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          {isDark ? <Moon size={13} className="theme-icon-moon" /> : <Sun size={13} className="theme-icon-sun" />}
        </span>
      </div>
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
