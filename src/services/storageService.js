import { initialDoctors } from "../data/mockDoctors";
import { initialPatients } from "../data/mockPatients";
import { initialAppointments } from "../data/mockAppointments";
import { initialDepartments } from "../data/mockDepartments";
import { initialPrescriptions } from "../data/mockPrescriptions";
import { initialRecords } from "../data/mockRecords";
import { initialNotifications } from "../data/mockNotifications";
import { HEALTHCARE_IMAGES } from "../config/images";

const STORAGE_KEYS = {
  USER: "mediconnect_current_user",
  ACCOUNTS: "mediconnect_accounts",
  DOCTORS: "mediconnect_doctors",
  PATIENTS: "mediconnect_patients",
  APPOINTMENTS: "mediconnect_appointments",
  DEPARTMENTS: "mediconnect_departments",
  PRESCRIPTIONS: "mediconnect_prescriptions",
  RECORDS: "mediconnect_records",
  NOTIFICATIONS: "mediconnect_notifications",
  ACTIVITY_LOGS: "mediconnect_activity_logs",
  INITIALIZED: "mediconnect_initialized_v2"
};

// Default system activity log entries
const defaultActivityLogs = [
  {
    id: "act-1",
    action: "Doctor Registration Submitted",
    details: "Dr. Marcus Thorne submitted credentials for Cardiology verification.",
    user: "Dr. Marcus Thorne",
    role: "Doctor",
    timestamp: "2026-10-30T14:15:00Z",
    type: "security"
  },
  {
    id: "act-2",
    action: "Online Consultation Completed",
    details: "Dr. Sarah Johnson completed video consultation with Alex Reynolds.",
    user: "Dr. Sarah Johnson",
    role: "Doctor",
    timestamp: "2026-10-30T11:45:00Z",
    type: "appointment"
  },
  {
    id: "act-3",
    action: "Prescription Generated",
    details: "Prescription RX-2026-9001 issued with 3 medications.",
    user: "Dr. Sarah Johnson",
    role: "Doctor",
    timestamp: "2026-10-30T10:30:00Z",
    type: "clinical"
  },
  {
    id: "act-4",
    action: "Department Capacity Updated",
    details: "Cardiology added 2 high-dependency outpatient observation beds.",
    user: "Admin System",
    role: "Admin",
    timestamp: "2026-10-29T16:00:00Z",
    type: "system"
  }
];

// Pre-seeded demo user accounts
export const DEMO_ACCOUNTS = [
  {
    id: "pat-1",
    name: "Alex Reynolds",
    email: "patient@mediconnect.com",
    password: "demo123",
    role: "patient",
    phone: "+1 (555) 712-4433",
    avatar: HEALTHCARE_IMAGES.patient1,
    gender: "Male",
    bloodGroup: "O+",
    dob: "1988-04-14",
    address: "742 Evergreen Terrace, Springfield, OR"
  },
  {
    id: "doc-1",
    name: "Dr. Sarah Johnson",
    email: "doctor@mediconnect.com",
    password: "demo123",
    role: "doctor",
    phone: "+1 (555) 234-5678",
    avatar: HEALTHCARE_IMAGES.doctor1,
    specialty: "Cardiology",
    department: "Cardiology",
    title: "Senior Consultant Cardiologist",
    hospital: "MediConnect Central Medical Pavilion",
    room: "Suite 402, North Wing",
    experience: 14,
    rating: 4.9,
    fee: 120
  },
  {
    id: "admin-1",
    name: "Dr. Arthur Sterling",
    email: "admin@mediconnect.com",
    password: "demo123",
    role: "admin",
    phone: "+1 (555) 999-0011",
    avatar: HEALTHCARE_IMAGES.adminUser,
    title: "Chief Medical Officer & Hospital Administrator",
    department: "Hospital Administration"
  }
];

export const storageService = {
  // Initialize storage once with realistic data
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(DEMO_ACCOUNTS));
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(initialDoctors));
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(initialPatients));
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(initialAppointments));
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(initialDepartments));
      localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(initialPrescriptions));
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(initialRecords));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(defaultActivityLogs));
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
    }
  },

  // Auth & Session
  getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  getAccounts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return data ? JSON.parse(data) : DEMO_ACCOUNTS;
    } catch {
      return DEMO_ACCOUNTS;
    }
  },

  saveAccounts(accounts) {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  },

  // Doctors
  getDoctors() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return data ? JSON.parse(data) : initialDoctors;
    } catch {
      return initialDoctors;
    }
  },

  saveDoctors(doctors) {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
  },

  // Patients
  getPatients() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return data ? JSON.parse(data) : initialPatients;
    } catch {
      return initialPatients;
    }
  },

  savePatients(patients) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  },

  // Appointments
  getAppointments() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  },

  saveAppointments(appointments) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },

  // Departments
  getDepartments() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      return data ? JSON.parse(data) : initialDepartments;
    } catch {
      return initialDepartments;
    }
  },

  saveDepartments(departments) {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  },

  // Prescriptions
  getPrescriptions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
      return data ? JSON.parse(data) : initialPrescriptions;
    } catch {
      return initialPrescriptions;
    }
  },

  savePrescriptions(prescriptions) {
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(prescriptions));
  },

  // Medical Records
  getRecords() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
      return data ? JSON.parse(data) : initialRecords;
    } catch {
      return initialRecords;
    }
  },

  saveRecords(records) {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  },

  // Notifications
  getNotifications() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  },

  saveNotifications(notifications) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  // Activity Logs
  getActivityLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
      return data ? JSON.parse(data) : defaultActivityLogs;
    } catch {
      return defaultActivityLogs;
    }
  },

  addActivityLog(log) {
    const logs = this.getActivityLogs();
    const newLog = {
      id: "act-" + Date.now(),
      timestamp: new Date().toISOString(),
      ...log
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs.slice(0, 50)));
    return newLog;
  }
};

export default storageService;
