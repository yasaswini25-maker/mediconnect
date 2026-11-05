import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MonitorUp,
  MessageSquare,
  FileText,
  ShieldCheck,
  Send,
  Users,
  Settings,
  X
} from "lucide-react";
import { HEALTHCARE_IMAGES } from "../../config/images";

export function VideoConsultationModal({
  isOpen,
  onClose,
  appointment,
  currentUserRole = "patient"
}) {
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // chat or notes
  const [messages, setMessages] = useState([
    {
      sender: "System",
      text: "Encrypted HD consultation session established. All interactions comply with HIPAA guidelines.",
      time: "10:30 AM"
    },
    {
      sender: appointment?.doctorName || "Dr. Sarah Johnson",
      text: "Good morning! Can you hear and see me clearly today?",
      time: "10:31 AM"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState(
    "Patient states blood pressure readings have averaged 132/84 this past week. No severe dizzy spells reported. Advised to continue current routine."
  );
  const [callDuration, setCallDuration] = useState(128); // seconds

  const chatEndRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setInterval(() => setCallDuration((c) => c + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: currentUserRole === "doctor" ? appointment?.doctorName || "Doctor" : "You",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulated doctor response if user is patient
    if (currentUserRole === "patient") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: appointment?.doctorName || "Dr. Sarah Johnson",
            text: "Noted. I am reviewing your updated vitals and will finalize your prescription right now.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }, 1400);
    }
  };

  const remoteName =
    currentUserRole === "patient"
      ? appointment?.doctorName || "Dr. Sarah Johnson"
      : appointment?.patientName || "Alex Reynolds";

  const remoteSpecialty =
    currentUserRole === "patient"
      ? appointment?.doctorSpecialty || "Senior Cardiologist"
      : `Patient • Token #${appointment?.queueNumber || 4}`;

  const remoteImage =
    currentUserRole === "patient"
      ? appointment?.doctorImage || HEALTHCARE_IMAGES.doctor1
      : HEALTHCARE_IMAGES.patient1;

  const localImage =
    currentUserRole === "patient"
      ? HEALTHCARE_IMAGES.patient1
      : appointment?.doctorImage || HEALTHCARE_IMAGES.doctor1;

  return (
    <div className="video-modal-backdrop">
      <div className="video-room-container">
        {/* Top Header */}
        <div className="video-room-header">
          <div className="video-room-info">
            <span className="live-call-badge">
              <span className="live-pulse-dot" /> LIVE TELEHEALTH
            </span>
            <div className="call-participant-heading">
              <strong>{remoteName}</strong>
              <small>{remoteSpecialty}</small>
            </div>
            <div className="call-timer-badge">
              <span>{formatDuration(callDuration)}</span>
            </div>
          </div>

          <div className="video-room-top-right">
            <span className="encryption-pill">
              <ShieldCheck size={14} className="text-emerald" /> 256-bit Secure
            </span>
            <button className="video-header-close" onClick={onClose} aria-label="Minimize consultation">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Canvas & Side Drawer */}
        <div className="video-room-body">
          {/* Main Video Viewport */}
          <div className="video-canvas-stage">
            {/* Remote Video Stream */}
            <div className="remote-stream-box">
              <img src={remoteImage} alt={remoteName} className="remote-video-img" />
              <div className="stream-overlay-label">
                <span>{remoteName}</span>
                <span className="stream-badge-mic">HD Audio Active</span>
              </div>
            </div>

            {/* Local Picture-in-Picture Feed */}
            <div className={`local-pip-box ${!camActive ? "camera-disabled" : ""}`}>
              {camActive ? (
                <img src={localImage} alt="Your Camera" className="local-video-img" />
              ) : (
                <div className="local-disabled-screen">
                  <VideoOff size={24} />
                  <span>Camera Off</span>
                </div>
              )}
              <div className="local-pip-label">
                <span>You {!micActive && "(Muted)"}</span>
              </div>
            </div>

            {/* Screen sharing banner */}
            {sharingScreen && (
              <div className="screen-share-banner">
                <MonitorUp size={16} />
                <span>You are currently sharing your medical vitals report to {remoteName}</span>
              </div>
            )}
          </div>

          {/* Side Drawer: Chat & Notes */}
          <div className="video-side-drawer">
            <div className="video-drawer-tabs">
              <button
                className={`drawer-tab-btn ${activeTab === "chat" ? "active" : ""}`}
                onClick={() => setActiveTab("chat")}
              >
                <MessageSquare size={16} /> Chat ({messages.length})
              </button>
              <button
                className={`drawer-tab-btn ${activeTab === "notes" ? "active" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                <FileText size={16} /> Consultation Notes
              </button>
            </div>

            {activeTab === "chat" ? (
              <div className="drawer-chat-view">
                <div className="chat-messages-scroll">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`chat-bubble ${
                        msg.sender === "You" ? "sent" : msg.sender === "System" ? "system" : "received"
                      }`}
                    >
                      <div className="chat-bubble-sender">
                        <span>{msg.sender}</span>
                        <small>{msg.time}</small>
                      </div>
                      <p className="chat-bubble-text">{msg.text}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form className="chat-input-bar" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type a clinical note or question..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn" aria-label="Send message">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="drawer-notes-view">
                <label className="notes-label">Physician Diagnosis & Vitals Summary</label>
                <textarea
                  className="notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record patient observations, blood pressure, advice..."
                  rows={10}
                />
                <button
                  className="button button-primary button-sm mt-3"
                  onClick={() => alert("Consultation notes synced to patient electronic health record.")}
                >
                  Save Notes to EHR
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="video-controls-bar">
          <div className="control-btn-group">
            <button
              className={`control-circle-btn ${!micActive ? "btn-danger" : ""}`}
              onClick={() => setMicActive(!micActive)}
              title={micActive ? "Mute Microphone" : "Unmute Microphone"}
            >
              {micActive ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              className={`control-circle-btn ${!camActive ? "btn-danger" : ""}`}
              onClick={() => setCamActive(!camActive)}
              title={camActive ? "Turn Off Camera" : "Turn On Camera"}
            >
              {camActive ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button
              className={`control-circle-btn ${sharingScreen ? "btn-active" : ""}`}
              onClick={() => setSharingScreen(!sharingScreen)}
              title="Share Medical Scans / Screen"
            >
              <MonitorUp size={20} />
            </button>

            <button
              className="control-circle-btn btn-end-call"
              onClick={onClose}
              title="End Video Consultation"
            >
              <PhoneOff size={22} />
              <span className="end-call-text">End Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoConsultationModal;
