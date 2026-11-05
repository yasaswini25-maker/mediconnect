import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";

export function LanguageSelector({ showLabel = true, className = "" }) {
  const { currentLanguage, currentLangObj, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`lang-selector-container ${className}`} ref={containerRef}>
      <button
        type="button"
        className="lang-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        title="Select display language"
      >
        <span className="lang-flag">{currentLangObj.flag}</span>
        {showLabel && <span className="lang-code-text">{currentLangObj.label}</span>}
        <ChevronDown size={13} className={`lang-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu animate-slide-up">
          <div className="lang-dropdown-header">
            <Globe size={13} className="text-teal" />
            <span>Select Language</span>
          </div>

          <div className="lang-options-list">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`lang-menu-item ${currentLanguage === lang.code ? "active" : ""}`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
              >
                <span className="item-flag">{lang.flag}</span>
                <span className="item-label">{lang.label}</span>
                {currentLanguage === lang.code && (
                  <Check size={14} className="item-check text-emerald" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
