import { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { Phone, PhoneOff, Video, ShieldCheck, User } from "lucide-react";

export function IncomingCallModal() {
  const { incomingCall, acceptCall, declineCall } = useApp();
  const { user } = useAuth();
  const audioCtxRef = useRef(null);
  const ringIntervalRef = useRef(null);

  // Play realistic ringing tone while incomingCall is active
  useEffect(() => {
    if (!incomingCall) return;

    // Start ring sound pattern
    const playRingBurst = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc2.frequency.setValueAtTime(480, ctx.currentTime); // B4

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 1.2);
        osc2.stop(ctx.currentTime + 1.2);
      } catch {
        // Silent fallback if autoplay blocked
      }
    };

    playRingBurst();
    ringIntervalRef.current = setInterval(playRingBurst, 3500);

    return () => {
      if (ringIntervalRef.current) clearInterval(ringIntervalRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, [incomingCall]);

  if (!incomingCall) return null;

  // Only show to patient or matching recipient
  const isTargetPatient =
    !user ||
    user.role === "patient" ||
    (incomingCall.patientEmail && user.email?.toLowerCase() === incomingCall.patientEmail?.toLowerCase());

  if (!isTargetPatient) return null;

  return (
    <div className="incoming-call-overlay" role="dialog" aria-modal="true">
      <div className="incoming-call-card animate-scale-up">
        {/* Ringing Pulse Avatar */}
        <div className="ringing-avatar-wrapper">
          <div className="ring-pulse-wave ring-pulse-1" />
          <div className="ring-pulse-wave ring-pulse-2" />
          <div className="ring-pulse-wave ring-pulse-3" />
          <img
            src={incomingCall.doctorImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=85"}
            alt={incomingCall.doctorName}
            className="ringing-doc-avatar"
          />
          <div className="ringing-badge-video">
            <Video size={16} className="text-white" />
          </div>
        </div>

        {/* Doctor & Consultation Details */}
        <div className="incoming-call-info text-center mt-3">
          <span className="incoming-call-eyebrow">
            INCOMING TELEHEALTH CONSULTATION
          </span>
          <h3 className="incoming-doc-name">{incomingCall.doctorName}</h3>
          <p className="incoming-doc-specialty">
            {incomingCall.doctorSpecialty || "Consultant Physician"} • {incomingCall.hospital || "MediConnect Central"}
          </p>
          <div className="incoming-call-tag mt-2">
            <ShieldCheck size={14} className="text-teal" />
            <span>Encrypted Peer-to-Peer Medical Video Stream</span>
          </div>
        </div>

        {/* Action Buttons: Accept / Decline */}
        <div className="incoming-call-actions mt-4">
          <button
            type="button"
            className="call-action-btn btn-decline"
            onClick={declineCall}
            aria-label="Decline Call"
          >
            <div className="call-btn-circle bg-danger">
              <PhoneOff size={22} className="text-white" />
            </div>
            <span>Decline</span>
          </button>

          <button
            type="button"
            className="call-action-btn btn-accept"
            onClick={acceptCall}
            aria-label="Accept Video Call"
          >
            <div className="call-btn-circle bg-emerald call-pulse-btn">
              <Phone size={22} className="text-white" />
            </div>
            <span>Accept Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingCallModal;
