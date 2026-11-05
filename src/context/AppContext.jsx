import { createContext, useContext, useState, useEffect } from "react";
import storageService from "../services/storageService";
import { useAuth } from "./AuthContext";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [records, setRecords] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  // Alert Notifications System
  const [alerts, setAlerts] = useState([]);

  // Telehealth Video Call Connection State (Doctor -> Patient)
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeVideoCall, setActiveVideoCall] = useState(null);

  const triggerAlert = ({ title, message, type = "info" }) => {
    const newAlert = {
      id: "alt-" + Date.now() + Math.random().toString(36).substring(2, 6),
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setAlerts((prev) => [newAlert, ...prev.slice(0, 3)]);

    setTimeout(() => {
      dismissAlert(newAlert.id);
    }, 6000);

    return newAlert;
  };

  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Video Call Connection Handlers
  const initiateCall = ({ appointment, doctor }) => {
    const callData = {
      appointmentId: appointment.id,
      meetingRoomId: appointment.meetingRoomId || `room-${appointment.id}`,
      doctorId: doctor?.id || appointment.doctorId,
      doctorName: doctor?.name || appointment.doctorName,
      doctorSpecialty: doctor?.specialty || appointment.doctorSpecialty,
      doctorImage: doctor?.image || appointment.doctorImage,
      hospital: doctor?.hospital || "MediConnect Central Pavilion",
      patientEmail: appointment.patientEmail,
      patientName: appointment.patientName,
      appointment
    };

    setIncomingCall(callData);
    try {
      localStorage.setItem("mediconnect_active_call", JSON.stringify(callData));
    } catch {}

    triggerAlert({
      title: "Telehealth Call Initiated",
      message: `Calling patient ${appointment.patientName}... Video line open.`,
      type: "call"
    });
  };

  const acceptCall = () => {
    if (!incomingCall) return;
    const call = incomingCall;
    setActiveVideoCall(call.appointment);
    setIncomingCall(null);
    try {
      localStorage.removeItem("mediconnect_active_call");
    } catch {}

    triggerAlert({
      title: "Consultation Connected",
      message: `Connected with ${call.doctorName}. HD stream active.`,
      type: "success"
    });
  };

  const declineCall = () => {
    setIncomingCall(null);
    try {
      localStorage.removeItem("mediconnect_active_call");
    } catch {}

    triggerAlert({
      title: "Consultation Declined",
      message: "The incoming call was declined.",
      type: "warning"
    });
  };

  const endCall = () => {
    setActiveVideoCall(null);
    setIncomingCall(null);
    try {
      localStorage.removeItem("mediconnect_active_call");
    } catch {}
  };

  // Cross-tab sync for incoming call
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "mediconnect_active_call") {
        if (e.newValue) {
          try {
            setIncomingCall(JSON.parse(e.newValue));
          } catch {}
        } else {
          setIncomingCall(null);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Reload state from storage
  const refreshData = () => {
    setDoctors(storageService.getDoctors());
    setAppointments(storageService.getAppointments());
    setDepartments(storageService.getDepartments());
    setPrescriptions(storageService.getPrescriptions());
    setRecords(storageService.getRecords());
    setNotifications(storageService.getNotifications());
    setActivityLogs(storageService.getActivityLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // ---------------- APPOINTMENT ACTIONS ----------------
  const bookAppointment = ({
    doctorId,
    date,
    time,
    type,
    reason,
    fee
  }) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) throw new Error("Selected doctor not found");

    const existingAppointmentsForDoctor = appointments.filter(
      (a) => a.doctorId === doctorId && a.date === date && a.status !== "Cancelled"
    );
    const nextQueueNumber = existingAppointmentsForDoctor.length + 1;

    const newAppointment = {
      id: "apt-" + Date.now(),
      patientId: user?.id || "pat-" + Date.now(),
      patientName: user?.name || "Guest Patient",
      patientEmail: user?.email || "patient@mediconnect.com",
      patientPhone: user?.phone || "+1 (555) 712-4433",
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.image,
      date,
      time,
      type: type || "In-Person",
      status: "Confirmed",
      reason: reason || "General Medical Consultation",
      queueNumber: nextQueueNumber,
      currentServing: doctor.currentServingToken || 1,
      estimatedWaitMinutes: Math.max(0, (nextQueueNumber - (doctor.currentServingToken || 1)) * 15),
      meetingRoomId: type === "Online" ? `mc-room-${doctor.id}-${Date.now().toString().slice(-4)}` : null,
      fee: fee || doctor.fee,
      paid: true,
      paymentMethod: "Credit Card (Simulated)",
      notes: "Booked via MediConnect Digital Portal",
      createdAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...appointments];
    storageService.saveAppointments(updated);
    setAppointments(updated);

    // Notify patient
    const newNotif = {
      id: "notif-" + Date.now(),
      targetRole: "patient",
      targetEmail: user?.email || "patient@mediconnect.com",
      title: "Appointment Booked Successfully",
      message: `Your ${newAppointment.type} appointment with ${doctor.name} on ${date} at ${time} is confirmed. Queue #${nextQueueNumber}.`,
      type: "appointment",
      timestamp: "Just now",
      read: false,
      link: "/patient/appointments"
    };

    // Notify doctor
    const docNotif = {
      id: "notif-" + (Date.now() + 1),
      targetRole: "doctor",
      targetEmail: doctor.email,
      title: "New Appointment Scheduled",
      message: `${user?.name || "A patient"} scheduled a consultation for ${date} at ${time}.`,
      type: "appointment",
      timestamp: "Just now",
      read: false,
      link: "/doctor/appointments"
    };

    const updatedNotifs = [newNotif, docNotif, ...notifications];
    storageService.saveNotifications(updatedNotifs);
    setNotifications(updatedNotifs);

    storageService.addActivityLog({
      action: "Appointment Scheduled",
      details: `${user?.name || "Patient"} booked consultation with ${doctor.name} for ${date}.`,
      user: user?.name || "Patient",
      role: user?.role || "patient",
      type: "appointment"
    });

    setActivityLogs(storageService.getActivityLogs());
    return newAppointment;
  };

  const cancelAppointment = (appointmentId, reasonText = "Cancelled by user") => {
    const updated = appointments.map((a) =>
      a.id === appointmentId
        ? { ...a, status: "Cancelled", cancellationReason: reasonText }
        : a
    );
    storageService.saveAppointments(updated);
    setAppointments(updated);

    const apt = appointments.find((a) => a.id === appointmentId);
    if (apt) {
      storageService.addActivityLog({
        action: "Appointment Cancelled",
        details: `Appointment with ${apt.doctorName} on ${apt.date} was cancelled.`,
        user: user?.name || "User",
        role: user?.role || "user",
        type: "appointment"
      });
      setActivityLogs(storageService.getActivityLogs());
    }
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    const updated = appointments.map((a) =>
      a.id === appointmentId
        ? { ...a, date: newDate, time: newTime, status: "Confirmed" }
        : a
    );
    storageService.saveAppointments(updated);
    setAppointments(updated);

    const apt = appointments.find((a) => a.id === appointmentId);
    if (apt) {
      const notif = {
        id: "notif-" + Date.now(),
        targetRole: "patient",
        targetEmail: apt.patientEmail,
        title: "Appointment Rescheduled",
        message: `Your appointment with ${apt.doctorName} was rescheduled to ${newDate} at ${newTime}.`,
        type: "appointment",
        timestamp: "Just now",
        read: false,
        link: "/patient/appointments"
      };
      const updatedNotifs = [notif, ...notifications];
      storageService.saveNotifications(updatedNotifs);
      setNotifications(updatedNotifs);

      storageService.addActivityLog({
        action: "Appointment Rescheduled",
        details: `Appointment with ${apt.doctorName} moved to ${newDate} at ${newTime}.`,
        user: user?.name || "User",
        role: user?.role || "user",
        type: "appointment"
      });
      setActivityLogs(storageService.getActivityLogs());
    }
  };

  const updateAppointmentStatus = (appointmentId, newStatus, doctorNotes) => {
    const updated = appointments.map((a) =>
      a.id === appointmentId
        ? { ...a, status: newStatus, ...(doctorNotes ? { notes: doctorNotes } : {}) }
        : a
    );
    storageService.saveAppointments(updated);
    setAppointments(updated);

    const apt = appointments.find((a) => a.id === appointmentId);
    if (apt) {
      const notif = {
        id: "notif-" + Date.now(),
        targetRole: "patient",
        targetEmail: apt.patientEmail,
        title: `Appointment ${newStatus}`,
        message: `Your appointment with ${apt.doctorName} has been marked as ${newStatus}.`,
        type: "appointment",
        timestamp: "Just now",
        read: false,
        link: "/patient/appointments"
      };
      const updatedNotifs = [notif, ...notifications];
      storageService.saveNotifications(updatedNotifs);
      setNotifications(updatedNotifs);

      storageService.addActivityLog({
        action: `Appointment ${newStatus}`,
        details: `Appointment for ${apt.patientName} marked ${newStatus}.`,
        user: user?.name || "Doctor",
        role: user?.role || "doctor",
        type: "appointment"
      });
      setActivityLogs(storageService.getActivityLogs());
    }
  };

  // ---------------- LIVE QUEUE MANAGEMENT ----------------
  const updateQueueServing = (doctorId, newServingToken) => {
    const updatedDocs = doctors.map((d) =>
      d.id === doctorId ? { ...d, currentServingToken: newServingToken } : d
    );
    storageService.saveDoctors(updatedDocs);
    setDoctors(updatedDocs);

    // Update estimated wait minutes across all appointments of this doctor
    const updatedApts = appointments.map((a) => {
      if (a.doctorId === doctorId && a.status === "Confirmed") {
        const remaining = Math.max(0, (a.queueNumber - newServingToken) * 15);
        return { ...a, currentServing: newServingToken, estimatedWaitMinutes: remaining };
      }
      return a;
    });
    storageService.saveAppointments(updatedApts);
    setAppointments(updatedApts);

    // Add alert notification
    const doc = doctors.find((d) => d.id === doctorId);
    const queueNotif = {
      id: "notif-" + Date.now(),
      targetRole: "patient",
      targetEmail: "patient@mediconnect.com",
      title: "Queue Update",
      message: `${doc?.name || "Doctor"} is now serving Token #${newServingToken}.`,
      type: "queue",
      timestamp: "Just now",
      read: false,
      link: "/patient/dashboard"
    };
    const updatedNotifs = [queueNotif, ...notifications];
    storageService.saveNotifications(updatedNotifs);
    setNotifications(updatedNotifs);
  };

  // ---------------- DIGITAL PRESCRIPTIONS ----------------
  const createPrescription = (prescriptionData) => {
    const newRx = {
      id: "rx-" + Date.now(),
      prescriptionNumber: `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      ...prescriptionData
    };
    const updated = [newRx, ...prescriptions];
    storageService.savePrescriptions(updated);
    setPrescriptions(updated);

    // Notify patient
    const notif = {
      id: "notif-" + Date.now(),
      targetRole: "patient",
      targetEmail: prescriptionData.patientEmail || "patient@mediconnect.com",
      title: "New Digital Prescription",
      message: `${prescriptionData.doctorName} has issued a new prescription (${newRx.prescriptionNumber}).`,
      type: "prescription",
      timestamp: "Just now",
      read: false,
      link: "/patient/prescriptions"
    };
    const updatedNotifs = [notif, ...notifications];
    storageService.saveNotifications(updatedNotifs);
    setNotifications(updatedNotifs);

    storageService.addActivityLog({
      action: "Prescription Issued",
      details: `${newRx.prescriptionNumber} generated for ${newRx.patientName}.`,
      user: user?.name || "Doctor",
      role: user?.role || "doctor",
      type: "clinical"
    });
    setActivityLogs(storageService.getActivityLogs());
    return newRx;
  };

  // ---------------- MEDICAL RECORDS ----------------
  const uploadRecord = (recordData) => {
    const newRec = {
      id: "rec-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      status: "Verified",
      downloadUrl: "#view-download-uploaded-record",
      ...recordData
    };
    const updated = [newRec, ...records];
    storageService.saveRecords(updated);
    setRecords(updated);

    storageService.addActivityLog({
      action: "Medical Record Uploaded",
      details: `Record "${newRec.title}" uploaded by ${user?.name}.`,
      user: user?.name || "User",
      role: user?.role || "patient",
      type: "records"
    });
    setActivityLogs(storageService.getActivityLogs());
    return newRec;
  };

  // ---------------- DOCTOR CRUD & APPROVALS (ADMIN) ----------------
  const addDoctor = (doctorData) => {
    const newDoc = {
      id: "doc-" + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      status: "Active",
      verificationStatus: "Verified",
      currentServingToken: 0,
      totalTokensToday: 0,
      ...doctorData
    };
    const updated = [...doctors, newDoc];
    storageService.saveDoctors(updated);
    setDoctors(updated);

    storageService.addActivityLog({
      action: "Doctor Added",
      details: `${newDoc.name} was added to ${newDoc.department} department.`,
      user: user?.name || "Admin",
      role: "admin",
      type: "doctor"
    });
    setActivityLogs(storageService.getActivityLogs());
    return newDoc;
  };

  const updateDoctor = (doctorId, updatedFields) => {
    const updated = doctors.map((d) =>
      d.id === doctorId ? { ...d, ...updatedFields } : d
    );
    storageService.saveDoctors(updated);
    setDoctors(updated);

    storageService.addActivityLog({
      action: "Doctor Details Updated",
      details: `Doctor ID ${doctorId} profile updated.`,
      user: user?.name || "Admin",
      role: "admin",
      type: "doctor"
    });
    setActivityLogs(storageService.getActivityLogs());
  };

  const deleteDoctor = (doctorId) => {
    const docToDelete = doctors.find((d) => d.id === doctorId);
    const updated = doctors.filter((d) => d.id !== doctorId);
    storageService.saveDoctors(updated);
    setDoctors(updated);

    storageService.addActivityLog({
      action: "Doctor Removed",
      details: `${docToDelete?.name || doctorId} was removed from hospital directory.`,
      user: user?.name || "Admin",
      role: "admin",
      type: "doctor"
    });
    setActivityLogs(storageService.getActivityLogs());
  };

  const verifyDoctor = (doctorId, decision) => {
    // decision: 'Approve' or 'Reject'
    const newStatus = decision === "Approve" ? "Active" : "Rejected";
    const verification = decision === "Approve" ? "Verified" : "Rejected";

    const updated = doctors.map((d) =>
      d.id === doctorId
        ? { ...d, status: newStatus, verificationStatus: verification }
        : d
    );
    storageService.saveDoctors(updated);
    setDoctors(updated);

    const doc = doctors.find((d) => d.id === doctorId);
    if (doc) {
      const notif = {
        id: "notif-" + Date.now(),
        targetRole: "doctor",
        targetEmail: doc.email,
        title: `Registration ${decision === "Approve" ? "Approved" : "Declined"}`,
        message:
          decision === "Approve"
            ? "Your medical credentials have been approved! You can now receive appointment bookings."
            : "Your credential submission was not approved. Please contact Hospital Administration.",
        type: "system",
        timestamp: "Just now",
        read: false,
        link: "/doctor/profile"
      };
      const updatedNotifs = [notif, ...notifications];
      storageService.saveNotifications(updatedNotifs);
      setNotifications(updatedNotifs);

      storageService.addActivityLog({
        action: `Doctor Application ${decision}d`,
        details: `${doc.name} credentials were ${decision.toLowerCase()}d by ${user?.name}.`,
        user: user?.name || "Admin",
        role: "admin",
        type: "verification"
      });
      setActivityLogs(storageService.getActivityLogs());
    }
  };

  const updateDoctorAvailability = (doctorId, availabilityData) => {
    const updated = doctors.map((d) =>
      d.id === doctorId
        ? { ...d, availability: { ...d.availability, ...availabilityData } }
        : d
    );
    storageService.saveDoctors(updated);
    setDoctors(updated);

    storageService.addActivityLog({
      action: "Doctor Availability Saved",
      details: "Clinical working hours and appointment slots updated.",
      user: user?.name || "Doctor",
      role: "doctor",
      type: "availability"
    });
    setActivityLogs(storageService.getActivityLogs());
  };

  // ---------------- REVIEWS & RATINGS ----------------
  const submitReview = (doctorId, { rating, comment, tags }) => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) return;

    const newReviewsCount = (doc.reviewsCount || 0) + 1;
    const currentRating = doc.rating || 5.0;
    const updatedRating = Number(
      ((currentRating * (doc.reviewsCount || 1) + Number(rating)) / (newReviewsCount || 1)).toFixed(1)
    );

    const updated = doctors.map((d) =>
      d.id === doctorId
        ? { ...d, rating: updatedRating, reviewsCount: newReviewsCount }
        : d
    );
    storageService.saveDoctors(updated);
    setDoctors(updated);

    // Notify doctor
    const notif = {
      id: "notif-" + Date.now(),
      targetRole: "doctor",
      targetEmail: doc.email,
      title: "New Patient Review",
      message: `${user?.name || "A patient"} left a ${rating}-star review: "${comment.slice(0, 45)}..."`,
      type: "system",
      timestamp: "Just now",
      read: false,
      link: "/doctor/dashboard"
    };
    const updatedNotifs = [notif, ...notifications];
    storageService.saveNotifications(updatedNotifs);
    setNotifications(updatedNotifs);

    storageService.addActivityLog({
      action: "Patient Review Submitted",
      details: `${rating}-star review submitted for ${doc.name}.`,
      user: user?.name || "Patient",
      role: "patient",
      type: "review"
    });
    setActivityLogs(storageService.getActivityLogs());
  };

  // ---------------- DEPARTMENTS ----------------
  const addDepartment = (deptData) => {
    const newDept = {
      id: "dept-" + Date.now(),
      doctorsCount: 1,
      activePatients: 0,
      ...deptData
    };
    const updated = [...departments, newDept];
    storageService.saveDepartments(updated);
    setDepartments(updated);

    storageService.addActivityLog({
      action: "Department Created",
      details: `New department "${newDept.name}" registered.`,
      user: user?.name || "Admin",
      role: "admin",
      type: "department"
    });
    setActivityLogs(storageService.getActivityLogs());
    return newDept;
  };

  const updateDepartment = (deptId, updatedFields) => {
    const updated = departments.map((dept) =>
      dept.id === deptId ? { ...dept, ...updatedFields } : dept
    );
    storageService.saveDepartments(updated);
    setDepartments(updated);

    storageService.addActivityLog({
      action: "Department Modified",
      details: `Department ID ${deptId} updated.`,
      user: user?.name || "Admin",
      role: "admin",
      type: "department"
    });
    setActivityLogs(storageService.getActivityLogs());
  };

  // ---------------- NOTIFICATIONS ----------------
  const markNotificationRead = (notifId) => {
    const updated = notifications.map((n) =>
      n.id === notifId ? { ...n, read: true } : n
    );
    storageService.saveNotifications(updated);
    setNotifications(updated);
  };

  const markAllNotificationsRead = (targetRole) => {
    const updated = notifications.map((n) =>
      n.targetRole === targetRole ? { ...n, read: true } : n
    );
    storageService.saveNotifications(updated);
    setNotifications(updated);
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        appointments,
        departments,
        prescriptions,
        records,
        notifications,
        activityLogs,
        refreshData,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        updateAppointmentStatus,
        updateQueueServing,
        createPrescription,
        uploadRecord,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        verifyDoctor,
        updateDoctorAvailability,
        submitReview,
        addDepartment,
        updateDepartment,
        markNotificationRead,
        markAllNotificationsRead,
        alerts,
        triggerAlert,
        dismissAlert,
        incomingCall,
        activeVideoCall,
        initiateCall,
        acceptCall,
        declineCall,
        endCall
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
