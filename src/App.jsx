import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider, useApp } from "./context/AppContext";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SmsToast from "./components/features/SmsToast";
import ToastAlert from "./components/common/ToastAlert";
import IncomingCallModal from "./components/features/IncomingCallModal";
import VideoConsultationModal from "./components/features/VideoConsultationModal";

// Layout Wrappers
import PatientLayout from "./components/layout/PatientLayout";
import DoctorLayout from "./components/layout/DoctorLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Public & Auth Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import FindDoctors from "./pages/public/FindDoctors";
import DoctorDetails from "./pages/public/DoctorDetails";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Patient Dashboard Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientConsultations from "./pages/patient/PatientConsultations";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientNotifications from "./pages/patient/PatientNotifications";

// Doctor Clinical Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorAvailability from "./pages/doctor/DoctorAvailability";
import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";
import DoctorConsultations from "./pages/doctor/DoctorConsultations";
import DoctorProfile from "./pages/doctor/DoctorProfile";

// Admin Management Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDoctors from "./pages/admin/ManageDoctors";
import DoctorApprovals from "./pages/admin/DoctorApprovals";
import ManagePatients from "./pages/admin/ManagePatients";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageAppointments from "./pages/admin/ManageAppointments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import SystemActivity from "./pages/admin/SystemActivity";

// Dynamic Role Redirection for legacy `/dashboard`
function RoleDashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "doctor") return <Navigate to="/doctor/dashboard" replace />;
  return <Navigate to="/patient/dashboard" replace />;
}

// Layout wrapper for Public Pages with standard top Navbar and bottom Footer
function PublicLayoutWrapper({ children }) {
  return (
    <div className="public-site-wrapper">
      <Navbar />
      <main className="public-main-content">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<PublicLayoutWrapper><Home /></PublicLayoutWrapper>} />
      <Route path="/about" element={<PublicLayoutWrapper><About /></PublicLayoutWrapper>} />
      <Route path="/services" element={<PublicLayoutWrapper><Services /></PublicLayoutWrapper>} />
      <Route path="/contact" element={<PublicLayoutWrapper><Contact /></PublicLayoutWrapper>} />
      <Route path="/doctors" element={<PublicLayoutWrapper><FindDoctors /></PublicLayoutWrapper>} />
      <Route path="/doctors/:id" element={<PublicLayoutWrapper><DoctorDetails /></PublicLayoutWrapper>} />
      <Route path="/login" element={<PublicLayoutWrapper><Login /></PublicLayoutWrapper>} />
      <Route path="/signup" element={<PublicLayoutWrapper><Signup /></PublicLayoutWrapper>} />

      {/* Legacy / generic /dashboard route -> redirects to role dashboard */}
      <Route path="/dashboard" element={<RoleDashboardRedirect />} />

      {/* ================= PATIENT ROUTES ================= */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientDashboard /></PatientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientAppointments /></PatientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/consultations"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientConsultations /></PatientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/records"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientRecords /></PatientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/prescriptions"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientPrescriptions /></PatientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientProfile /></PatientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/notifications"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout><PatientNotifications /></PatientLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= DOCTOR ROUTES ================= */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorDashboard /></DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorAppointments /></DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/doctor/patients" element={<Navigate to="/doctor/appointments" replace />} />
      <Route
        path="/doctor/availability"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorAvailability /></DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/prescriptions"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorPrescriptions /></DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/consultations"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorConsultations /></DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorProfile /></DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/notifications"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorLayout><DoctorDashboard /></DoctorLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><ManageDoctors /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/approvals"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><DoctorApprovals /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/patients"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><ManagePatients /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><ManageDepartments /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><ManageAppointments /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminAnalytics /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/activity"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><SystemActivity /></AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function GlobalCallModal() {
  const { activeVideoCall, endCall } = useApp();
  const { user } = useAuth();

  if (!activeVideoCall) return null;

  return (
    <VideoConsultationModal
      isOpen={Boolean(activeVideoCall)}
      onClose={endCall}
      appointment={activeVideoCall}
      currentUserRole={user?.role || "patient"}
    />
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppProvider>
              <SmsToast />
              <ToastAlert />
              <IncomingCallModal />
              <GlobalCallModal />
              <AppRoutes />
            </AppProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
