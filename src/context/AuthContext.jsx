import { createContext, useContext, useState, useEffect } from "react";
import storageService, { DEMO_ACCOUNTS } from "../services/storageService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.init();
    const storedUser = storageService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const accounts = storageService.getAccounts();
    const cleanEmail = email.trim().toLowerCase();
    const match = accounts.find(
      (a) => a.email.toLowerCase() === cleanEmail && a.password === password
    );

    if (!match) {
      throw new Error("Invalid email or password. Please verify your credentials.");
    }

    const { password: _, ...safeUser } = match;
    storageService.setCurrentUser(safeUser);
    setUser(safeUser);

    storageService.addActivityLog({
      action: "User Logged In",
      details: `${safeUser.name} signed in successfully as ${safeUser.role}.`,
      user: safeUser.name,
      role: safeUser.role,
      type: "auth"
    });

    return safeUser;
  };

  const loginAsDemo = (role) => {
    const demo = DEMO_ACCOUNTS.find((a) => a.role === role);
    if (!demo) throw new Error("Demo account not found for role: " + role);

    const { password: _, ...safeUser } = demo;
    storageService.setCurrentUser(safeUser);
    setUser(safeUser);

    storageService.addActivityLog({
      action: "Demo Login",
      details: `Switched session to Demo ${role.toUpperCase()}: ${safeUser.name}.`,
      user: safeUser.name,
      role: safeUser.role,
      type: "auth"
    });

    return safeUser;
  };

  const signup = (userData) => {
    const accounts = storageService.getAccounts();
    const cleanEmail = userData.email.trim().toLowerCase();

    if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      throw new Error("An account with this email address already exists.");
    }

    const newId = (userData.role === "doctor" ? "doc-" : "pat-") + Date.now();
    const newAccount = {
      id: newId,
      ...userData,
      email: cleanEmail
    };

    const updatedAccounts = [...accounts, newAccount];
    storageService.saveAccounts(updatedAccounts);

    // If registered as doctor, also register in doctors collection as Pending verification
    if (userData.role === "doctor") {
      const doctors = storageService.getDoctors();
      const newDocEntry = {
        id: newId,
        name: userData.name,
        email: cleanEmail,
        phone: userData.phone || "+1 (555) 000-0000",
        specialty: userData.specialty || "General Medicine",
        department: userData.department || "General Medicine",
        title: "Clinical Specialist",
        qualifications: userData.qualifications || "MD, Board Certified",
        experience: Number(userData.experience) || 3,
        rating: 5.0,
        reviewsCount: 0,
        fee: Number(userData.fee) || 80,
        modes: ["In-Person", "Online"],
        image: userData.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85",
        status: "Pending", // Needs Admin approval
        verificationStatus: "Pending Verification",
        hospital: "MediConnect Medical Pavilion",
        room: "Suite 100",
        about: userData.about || "Dedicated medical professional committed to holistic patient well-being.",
        availability: {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          hours: "09:00 AM - 05:00 PM",
          breakTime: "01:00 PM - 02:00 PM",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
        },
        currentServingToken: 0,
        totalTokensToday: 0
      };
      storageService.saveDoctors([...doctors, newDocEntry]);

      // Notify admin
      const notifs = storageService.getNotifications();
      notifs.unshift({
        id: "notif-" + Date.now(),
        targetRole: "admin",
        targetEmail: "admin@mediconnect.com",
        title: "New Doctor Registration",
        message: `${userData.name} registered as a ${userData.specialty} specialist. Awaiting verification.`,
        type: "system",
        timestamp: "Just now",
        read: false,
        link: "/admin/approvals"
      });
      storageService.saveNotifications(notifs);
    } else {
      // Patient registration
      const patients = storageService.getPatients();
      const newPatEntry = {
        id: newId,
        name: userData.name,
        email: cleanEmail,
        phone: userData.phone || "+1 (555) 000-0000",
        gender: userData.gender || "Other",
        bloodGroup: userData.bloodGroup || "O+",
        dob: userData.dob || "1995-01-01",
        address: userData.address || "City Medical Center District",
        status: "Active",
        registeredDate: new Date().toISOString().split("T")[0]
      };
      storageService.savePatients([...patients, newPatEntry]);
    }

    const { password: _, ...safeUser } = newAccount;
    storageService.setCurrentUser(safeUser);
    setUser(safeUser);

    storageService.addActivityLog({
      action: "New User Registered",
      details: `${safeUser.name} registered as ${safeUser.role}.`,
      user: safeUser.name,
      role: safeUser.role,
      type: "auth"
    });

    return safeUser;
  };

  const logout = () => {
    if (user) {
      storageService.addActivityLog({
        action: "User Logged Out",
        details: `${user.name} logged out.`,
        user: user.name,
        role: user.role,
        type: "auth"
      });
    }
    storageService.setCurrentUser(null);
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };

    // Update in accounts
    const accounts = storageService.getAccounts();
    const updatedAccounts = accounts.map((acc) =>
      acc.email.toLowerCase() === user.email.toLowerCase()
        ? { ...acc, ...updatedFields }
        : acc
    );
    storageService.saveAccounts(updatedAccounts);

    // Update in role collections if applicable
    if (user.role === "doctor") {
      const doctors = storageService.getDoctors();
      storageService.saveDoctors(
        doctors.map((d) =>
          d.email.toLowerCase() === user.email.toLowerCase()
            ? { ...d, ...updatedFields }
            : d
        )
      );
    } else if (user.role === "patient") {
      const patients = storageService.getPatients();
      storageService.savePatients(
        patients.map((p) =>
          p.email.toLowerCase() === user.email.toLowerCase()
            ? { ...p, ...updatedFields }
            : p
        )
      );
    }

    storageService.setCurrentUser(updatedUser);
    setUser(updatedUser);

    storageService.addActivityLog({
      action: "Profile Updated",
      details: `${updatedUser.name} updated profile information.`,
      user: updatedUser.name,
      role: updatedUser.role,
      type: "profile"
    });

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginAsDemo,
        signup,
        logout,
        updateProfile,
        isPatient: user?.role === "patient",
        isDoctor: user?.role === "doctor",
        isAdmin: user?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
