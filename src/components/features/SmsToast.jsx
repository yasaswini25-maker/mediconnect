import { useState, useEffect } from "react";
import { MessageSquare, Smartphone, X, CheckCheck, BellRing } from "lucide-react";
import smsService from "../../services/smsService";

export function SmsToast() {
  const [activeSms, setActiveSms] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Subscribe to incoming SMS events
    const unsubscribe = smsService.subscribe((sms) => {
      setActiveSms(sms);
      setVisible(true);

      // Play soft notification sound if permitted by browser
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch {
        // Audio not allowed or unsupported - silent fallback
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000); // Auto-hide after 7 seconds

    return () => clearTimeout(timer);
  }, [visible, activeSms]);

  if (!visible || !activeSms) return null;

  return (
    <div className="sms-toast-overlay" role="alert" aria-live="polite">
      <div className="sms-toast-card animate-slide-in">
        {/* Header bar */}
        <div className="sms-toast-header">
          <div className="sms-toast-carrier">
            <span className="sms-live-pulse" />
            <Smartphone size={15} className="sms-icon-phone" />
            <span className="carrier-name">MEDICONNECT SMS GATEWAY</span>
            <span className="sms-time-stamp">• {activeSms.timestamp}</span>
          </div>
          <button
            className="sms-toast-close-btn"
            onClick={() => setVisible(false)}
            aria-label="Dismiss SMS"
          >
            <X size={15} />
          </button>
        </div>

        {/* Recipient phone badge */}
        <div className="sms-toast-recipient">
          <MessageSquare size={13} className="text-teal" />
          <span>Delivered to: <strong>{activeSms.to}</strong></span>
        </div>

        {/* Message bubble */}
        <div className="sms-toast-body">
          <p className="sms-toast-message">{activeSms.message}</p>
        </div>

        {/* Footer */}
        <div className="sms-toast-footer">
          <div className="sms-verified-tag">
            <CheckCheck size={14} className="text-teal" />
            <span>Carrier Verified • Instant SMS Dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmsToast;
