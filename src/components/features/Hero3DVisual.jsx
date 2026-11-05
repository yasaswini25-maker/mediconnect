import { useState, useRef } from "react";
import {
  HeartPulse,
  ShieldCheck,
  Video,
  Clock,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  Stethoscope
} from "lucide-react";

export function Hero3DVisual() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rY = ((x - centerX) / centerX) * 12; // tilt angle
    const rX = ((centerY - y) / centerY) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // 3D Doctor Illustration & futuristic clinical setting
  const hero3DImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85";
  const futuristicClinic = "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=85";

  return (
    <div
      className="hero-3d-stage"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
      }}
    >
      {/* Background Colorful Ambient Orbs */}
      <div className="ambient-glow-orb orb-teal" />
      <div className="ambient-glow-orb orb-purple" />
      <div className="ambient-glow-orb orb-emerald" />
      <div className="ambient-glow-orb orb-coral" />

      {/* Main 3D Card Stage */}
      <div className="hero-3d-card-inner">
        {/* Layer 1: Backdrop Scene with Glassmorphism */}
        <div className="hero-3d-image-frame">
          <img
            src={hero3DImage}
            alt="3D Digital Healthcare Medical Tech"
            className="hero-3d-photo"
          />
          <div className="hero-3d-photo-gradient" />
          
          {/* Futuristic Holographic HUD Overlay */}
          <div className="hero-hud-grid">
            <div className="hud-header">
              <span className="hud-badge">
                <Sparkles size={13} className="text-cyan animate-pulse" />
                <span>3D AI DIAGNOSTIC SUITE</span>
              </span>
              <span className="hud-freq">HIPAA 256-BIT • ACTIVE</span>
            </div>

            {/* Central Holographic Vitals Banner */}
            <div className="hud-vitals-banner">
              <div className="hud-vital-col">
                <small>HEART RATE</small>
                <div className="d-flex align-center gap-1">
                  <Activity size={16} className="text-rose animate-bounce" />
                  <strong>72 <span className="unit">bpm</span></strong>
                </div>
              </div>
              <div className="hud-divider" />
              <div className="hud-vital-col">
                <small>BLOOD PRESSURE</small>
                <strong>120 / 80</strong>
              </div>
              <div className="hud-divider" />
              <div className="hud-vital-col">
                <small>SPO2 LEVEL</small>
                <strong className="text-emerald">98.8 %</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: Floating 3D Depth Elements */}
        {/* Floating Element 1: Verified Senior Specialist */}
        <div className="floating-3d-badge badge-top-left" style={{ transform: "translateZ(45px)" }}>
          <div className="floating-badge-icon bg-gradient-teal">
            <Stethoscope size={18} className="text-white" />
          </div>
          <div className="floating-badge-text">
            <strong>Dr. Sarah Johnson</strong>
            <small>Senior Cardiologist • 4.9 ★</small>
          </div>
          <div className="live-status-dot" />
        </div>

        {/* Floating Element 2: Live Clinic Queue Token */}
        <div className="floating-3d-badge badge-bottom-right" style={{ transform: "translateZ(55px)" }}>
          <div className="floating-badge-icon bg-gradient-amber">
            <Clock size={18} className="text-white" />
          </div>
          <div className="floating-badge-text">
            <strong className="text-amber">Token #4 Serving</strong>
            <small>Est. Wait Time: ~10 mins</small>
          </div>
        </div>

        {/* Floating Element 3: Encrypted HD Telehealth Video */}
        <div className="floating-3d-badge badge-bottom-left" style={{ transform: "translateZ(50px)" }}>
          <div className="floating-badge-icon bg-gradient-emerald">
            <Video size={18} className="text-white" />
          </div>
          <div className="floating-badge-text">
            <strong>HD Virtual Telehealth</strong>
            <small>Encrypted Peer Connection</small>
          </div>
          <span className="live-pill-tag">LIVE</span>
        </div>

        {/* Floating Element 4: Digital Verified Medical Records */}
        <div className="floating-3d-badge badge-top-right" style={{ transform: "translateZ(40px)" }}>
          <div className="floating-badge-icon bg-gradient-purple">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div className="floating-badge-text">
            <strong>Verified EHR Vault</strong>
            <small>Instant Official PDF Downloads</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero3DVisual;
