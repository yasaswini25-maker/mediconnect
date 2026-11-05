export const initialNotifications = [
  {
    id: "notif-1",
    targetRole: "patient",
    targetEmail: "patient@mediconnect.com",
    title: "Appointment Confirmed",
    message: "Your online consultation with Dr. Sarah Johnson is confirmed for Nov 02, 2026 at 10:30 AM.",
    type: "appointment", // appointment, prescription, queue, system
    timestamp: "10 mins ago",
    read: false,
    link: "/patient/appointments"
  },
  {
    id: "notif-2",
    targetRole: "patient",
    targetEmail: "patient@mediconnect.com",
    title: "Live Queue Update",
    message: "You are currently token #4 for Dr. Sarah Johnson. Dr. Johnson is now serving token #3.",
    type: "queue",
    timestamp: "25 mins ago",
    read: false,
    link: "/patient/dashboard"
  },
  {
    id: "notif-3",
    targetRole: "patient",
    targetEmail: "patient@mediconnect.com",
    title: "Digital Prescription Issued",
    message: "Dr. Sarah Johnson has uploaded your latest prescription (RX-2026-9001).",
    type: "prescription",
    timestamp: "2 days ago",
    read: true,
    link: "/patient/prescriptions"
  },
  {
    id: "notif-4",
    targetRole: "doctor",
    targetEmail: "doctor@mediconnect.com",
    title: "New Appointment Request",
    message: "Liam O'Connor requested an online consultation for cardiac clearance on Nov 01 at 11:15 AM.",
    type: "appointment",
    timestamp: "1 hour ago",
    read: false,
    link: "/doctor/appointments"
  },
  {
    id: "notif-5",
    targetRole: "doctor",
    targetEmail: "doctor@mediconnect.com",
    title: "Patient Checked In",
    message: "Sophia Martinez checked in for token #2 at North Wing Waiting Room.",
    type: "queue",
    timestamp: "3 hours ago",
    read: true,
    link: "/doctor/dashboard"
  },
  {
    id: "notif-6",
    targetRole: "admin",
    targetEmail: "admin@mediconnect.com",
    title: "New Doctor Registration Pending",
    message: "Dr. Marcus Thorne submitted credentials for Cardiology department verification.",
    type: "system",
    timestamp: "4 hours ago",
    read: false,
    link: "/admin/approvals"
  },
  {
    id: "notif-7",
    targetRole: "admin",
    targetEmail: "admin@mediconnect.com",
    title: "Monthly Occupancy Benchmark Met",
    message: "Hospital outpatient volume exceeded target with 94.2% positive satisfaction rating.",
    type: "system",
    timestamp: "1 day ago",
    read: true,
    link: "/admin/analytics"
  }
];

export default initialNotifications;
