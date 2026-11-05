// Realistic Real-Time SMS Notification Gateway Simulator

const SMS_STORAGE_KEY = "mediconnect_sms_inbox";
const listeners = new Set();

export const smsService = {
  // Subscribe component to incoming simulated SMS events
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  // Broadcast an incoming SMS
  broadcast(smsPayload) {
    listeners.forEach((callback) => {
      try {
        callback(smsPayload);
      } catch (err) {
        console.error("SMS listener error:", err);
      }
    });
  },

  // Get full SMS history
  getSmsHistory() {
    try {
      const data = localStorage.getItem(SMS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Send an SMS notification
  sendSms({ to, recipientName, message, type = "info" }) {
    const cleanPhone = to || "+1 (555) 019-2834";
    const newSms = {
      id: "sms-" + Date.now(),
      to: cleanPhone,
      recipientName: recipientName || "Valued Patient",
      message,
      type, // 'welcome', 'appointment', 'queue', 'otp', 'rx'
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toISOString().split("T")[0],
      read: false
    };

    // Save to persistent storage
    const history = this.getSmsHistory();
    history.unshift(newSms);
    localStorage.setItem(SMS_STORAGE_KEY, JSON.stringify(history.slice(0, 30)));

    // Emit event to floating UI toast
    this.broadcast(newSms);

    // Also log with distinct console formatting
    console.log(
      `%c[SMS GATEWAY] 📱 Message dispatched to ${cleanPhone}: "${message}"`,
      "background: #087F8C; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
    );

    return newSms;
  },

  // Quick helper for registration welcome
  sendWelcomeSms(phone, name) {
    return this.sendSms({
      to: phone,
      recipientName: name,
      type: "welcome",
      message: `Welcome to MediConnect, ${name}! Your account has been verified. Use code 482-910 to confirm your mobile alerts.`
    });
  },

  // Quick helper for appointment confirmation
  sendAppointmentSms({ phone, patientName, doctorName, date, time, tokenNumber, waitMinutes }) {
    return this.sendSms({
      to: phone,
      recipientName: patientName,
      type: "appointment",
      message: `MediConnect Alert: Consultation confirmed with ${doctorName} on ${date} at ${time}. Your Token is #${tokenNumber}. Estimated wait: ${waitMinutes} mins.`
    });
  },

  // Quick helper for live queue token change
  sendQueueUpdateSms({ phone, doctorName, servingToken, patientToken }) {
    const diff = patientToken - servingToken;
    return this.sendSms({
      to: phone,
      type: "queue",
      message: `Live Clinic Alert: ${doctorName} is now serving Token #${servingToken}. Your token is #${patientToken} (${diff > 0 ? `${diff} patients ahead` : "It's your turn!"}).`
    });
  }
};

export default smsService;
