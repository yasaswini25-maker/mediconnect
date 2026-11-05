import { createContext, useContext, useState, useEffect } from "react";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" }
];

const TRANSLATIONS = {
  en: {
    // Navigation
    navHome: "Home",
    navDoctors: "Find Doctors",
    navServices: "Services",
    navAbout: "About Us",
    navContact: "Contact",
    navDashboard: "Dashboard",
    navLogin: "Log In",
    navSignup: "Get Started",
    navLogout: "Sign Out",
    navMyProfile: "My Profile",

    // Hero & Landing
    heroBadge: "Next-Gen Healthcare Management Platform",
    heroTitlePart1: "Your Health, Our Priority.",
    heroTitlePart2: "Healthcare Made Simple.",
    heroSubtitle: "Connect with 500+ verified doctors, book appointments effortlessly, track live outpatient clinic queues, and access quality telemedicine consultations anytime, anywhere.",
    heroFindDoctor: "Find a Doctor",
    heroBookAppointment: "Book Appointment",
    heroVerifiedDocs: "Verified Doctors",
    heroHappyPatients: "Happy Patients",
    heroTelehealth: "Online Telehealth",
    heroAvgRating: "Average Rating",

    // Common Actions
    downloadPdf: "Download PDF",
    downloadLabReport: "Download Lab Report",
    viewSummary: "View Summary",
    uploadDocument: "Upload Document",
    saveChanges: "Save Changes",
    savedSuccess: "All changes to your profile have been saved successfully.",
    startVideoCall: "Start Video Call",
    acceptCall: "Accept Call",
    declineCall: "Decline",

    // Roles & Portal Badges
    rolePatient: "Registered Patient",
    roleDoctor: "Verified Doctor",
    roleAdmin: "Hospital Administrator",
    patientPortal: "Patient Care Portal",
    doctorPortal: "Clinical Provider Cockpit",
    adminPortal: "Hospital Admin Suite",

    // Records
    ehrVault: "Electronic Health Records Vault",
    ehrSubtitle: "Access your complete diagnostic history, lab panels, scans, and clinical discharge reports",
    officialPdfBadge: "Official Verified Medical PDF",

    // Appearance & Language
    appearance: "Appearance",
    language: "Language",
    lightMode: "Light Mode",
    darkMode: "Dark Mode"
  },
  es: {
    navHome: "Inicio",
    navDoctors: "Buscar Médicos",
    navServices: "Servicios",
    navAbout: "Nosotros",
    navContact: "Contacto",
    navDashboard: "Panel",
    navLogin: "Iniciar Sesión",
    navSignup: "Registrarse",
    navLogout: "Cerrar Sesión",
    navMyProfile: "Mi Perfil",

    heroBadge: "Plataforma de Salud de Próxima Generación",
    heroTitlePart1: "Tu Salud, Nuestra Prioridad.",
    heroTitlePart2: "Atención Médica Simplificada.",
    heroSubtitle: "Conéctate con más de 500 médicos verificados, reserva citas sin esfuerzo, sigue colas en vivo y accede a telemedicina de calidad en cualquier momento.",
    heroFindDoctor: "Buscar un Médico",
    heroBookAppointment: "Reservar Cita",
    heroVerifiedDocs: "Médicos Verificados",
    heroHappyPatients: "Pacientes Satisfechos",
    heroTelehealth: "Telemedicina 24/7",
    heroAvgRating: "Calificación Promedio",

    downloadPdf: "Descargar PDF",
    downloadLabReport: "Descargar Análisis",
    viewSummary: "Ver Resumen",
    uploadDocument: "Subir Documento",
    saveChanges: "Guardar Cambios",
    savedSuccess: "Todos los cambios en tu perfil se han guardado con éxito.",
    startVideoCall: "Iniciar Videollamada",
    acceptCall: "Aceptar Llamada",
    declineCall: "Rechazar",

    rolePatient: "Paciente Registrado",
    roleDoctor: "Médico Verificado",
    roleAdmin: "Administrador Hospitalario",
    patientPortal: "Portal del Paciente",
    doctorPortal: "Cabina del Médico",
    adminPortal: "Suite de Administración",

    ehrVault: "Bóveda de Historial Clínico",
    ehrSubtitle: "Accede a tu historial diagnóstico completo, análisis de laboratorio y recetas médicas",
    officialPdfBadge: "PDF Médico Oficial Verificado",

    appearance: "Apariencia",
    language: "Idioma",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro"
  },
  fr: {
    navHome: "Accueil",
    navDoctors: "Trouver un Médecin",
    navServices: "Services",
    navAbout: "À Propos",
    navContact: "Contact",
    navDashboard: "Tableau de Bord",
    navLogin: "Connexion",
    navSignup: "Commencer",
    navLogout: "Déconnexion",
    navMyProfile: "Mon Profil",

    heroBadge: "Plateforme de Santé de Nouvelle Génération",
    heroTitlePart1: "Votre Santé, Notre Priorité.",
    heroTitlePart2: "La Santé Rendre Simple.",
    heroSubtitle: "Consultez plus de 500 médecins agréés, réservez des consultations en ligne ou en cabinet et suivez vos dossiers médicaux en toute sécurité.",
    heroFindDoctor: "Trouver un Médecin",
    heroBookAppointment: "Prendre Rendez-vous",
    heroVerifiedDocs: "Médecins Agréés",
    heroHappyPatients: "Patients Satisfaits",
    heroTelehealth: "Télémédecine 24/7",
    heroAvgRating: "Note Moyenne",

    downloadPdf: "Télécharger le PDF",
    downloadLabReport: "Télécharger le Rapport",
    viewSummary: "Voir le Résumé",
    uploadDocument: "Téléverser Document",
    saveChanges: "Enregistrer",
    savedSuccess: "Toutes les modifications de votre profil ont été enregistrées avec succès.",
    startVideoCall: "Démarrer Appel Vidéo",
    acceptCall: "Accepter l'appel",
    declineCall: "Décliner",

    rolePatient: "Patient Enregistré",
    roleDoctor: "Médecin Agréé",
    roleAdmin: "Administrateur de l'Hôpital",
    patientPortal: "Portail Patient",
    doctorPortal: "Cockpit Médical",
    adminPortal: "Suite d'Administration",

    ehrVault: "Dossier Médical Électronique",
    ehrSubtitle: "Accédez à vos analyses médicales, scanners et ordonnances électroniques",
    officialPdfBadge: "PDF Médical Officiel Vérifié",

    appearance: "Apparence",
    language: "Langue",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre"
  },
  de: {
    navHome: "Startseite",
    navDoctors: "Ärzte finden",
    navServices: "Leistungen",
    navAbout: "Über uns",
    navContact: "Kontakt",
    navDashboard: "Übersicht",
    navLogin: "Anmelden",
    navSignup: "Registrieren",
    navLogout: "Abmelden",
    navMyProfile: "Mein Profil",

    heroBadge: "Medizinische Plattform der nächsten Generation",
    heroTitlePart1: "Ihre Gesundheit, unsere Priorität.",
    heroTitlePart2: "Gesundheitsversorgung einfach gemacht.",
    heroSubtitle: "Verbinden Sie sich mit 500+ zertifizierten Fachärzten, buchen Sie Termine mühelos und nutzen Sie moderne Videosprechstunden jederzeit.",
    heroFindDoctor: "Arzt finden",
    heroBookAppointment: "Termin vereinbaren",
    heroVerifiedDocs: "Verifizierte Ärzte",
    heroHappyPatients: "Zufriedene Patienten",
    heroTelehealth: "Telemedizin 24/7",
    heroAvgRating: "Durchschnittsbewertung",

    downloadPdf: "PDF herunterladen",
    downloadLabReport: "Laborbericht laden",
    viewSummary: "Zusammenfassung ansehen",
    uploadDocument: "Dokument hochladen",
    saveChanges: "Speichern",
    savedSuccess: "Alle Änderungen an Ihrem Profil wurden erfolgreich gespeichert.",
    startVideoCall: "Videoanruf starten",
    acceptCall: "Anruf annehmen",
    declineCall: "Ablehnen",

    rolePatient: "Registrierter Patient",
    roleDoctor: "Verifizierter Arzt",
    roleAdmin: "Klinikadministrator",
    patientPortal: "Patientenportal",
    doctorPortal: "Arzt-Cockpit",
    adminPortal: "Verwaltungs-Suite",

    ehrVault: "Elektronische Patientenakte",
    ehrSubtitle: "Greifen Sie auf Diagnosen, Laborergebnisse und Rezepte sicher zu",
    officialPdfBadge: "Offizielles verifiziertes Medizin-PDF",

    appearance: "Erscheinungsbild",
    language: "Sprache",
    lightMode: "Heller Modus",
    darkMode: "Dunkler Modus"
  },
  hi: {
    navHome: "होम",
    navDoctors: "डॉक्टर खोजें",
    navServices: "सेवाएं",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क करें",
    navDashboard: "डैशबोर्ड",
    navLogin: "लॉग इन",
    navSignup: "शुरू करें",
    navLogout: "लॉग आउट",
    navMyProfile: "मेरी प्रोफ़ाइल",

    heroBadge: "नेक्स्ट-जेन हेल्थकेयर मैनेजमेंट प्लेटफॉर्म",
    heroTitlePart1: "आपका स्वास्थ्य, हमारी प्राथमिकता।",
    heroTitlePart2: "स्वास्थ्य सेवा हुई आसान।",
    heroSubtitle: "500+ सत्यापित डॉक्टरों से जुड़ें, आसानी से अपॉइंटमेंट बुक करें, लाइव ओपीडी कतार ट्रैक करें और कभी भी गुणवत्तापूर्ण टेलीमेडिसिन प्राप्त करें।",
    heroFindDoctor: "डॉक्टर खोजें",
    heroBookAppointment: "अपॉइंटमेंट बुक करें",
    heroVerifiedDocs: "सत्यापित डॉक्टर",
    heroHappyPatients: "संतुष्ट मरीज",
    heroTelehealth: "24/7 टेलीहेल्थ",
    heroAvgRating: "औसत रेटिंग",

    downloadPdf: "पीडीएफ डाउनलोड करें",
    downloadLabReport: "लैब रिपोर्ट डाउनलोड करें",
    viewSummary: "विवरण देखें",
    uploadDocument: "दस्तावेज़ अपलोड करें",
    saveChanges: "बदलाव सुरक्षित करें",
    savedSuccess: "आपकी प्रोफ़ाइल में सभी परिवर्तन सफलतापूर्वक सहेज लिए गए हैं।",
    startVideoCall: "वीडियो कॉल शुरू करें",
    acceptCall: "कॉल स्वीकार करें",
    declineCall: "अस्वीकार करें",

    rolePatient: "पंजीकृत मरीज",
    roleDoctor: "सत्यापित डॉक्टर",
    roleAdmin: "अस्पताल प्रशासक",
    patientPortal: "मरीज सेवा पोर्टल",
    doctorPortal: "चिकित्सक पोर्टल",
    adminPortal: "अस्पताल प्रबंधन",

    ehrVault: "डिजिटल मेडिकल रिकॉर्ड वॉल्ट",
    ehrSubtitle: "अपनी सभी जांच रिपोर्ट, स्कैन और डिजिटल पर्चियों तक तुरंत पहुंचें",
    officialPdfBadge: "आधिकारिक सत्यापित मेडिकल पीडीएफ",

    appearance: "थीम",
    language: "भाषा",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड"
  },
  ar: {
    navHome: "الرئيسية",
    navDoctors: "البحث عن طبيب",
    navServices: "الخدمات",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    navDashboard: "لوحة التحكم",
    navLogin: "تسجيل الدخول",
    navSignup: "ابدأ الآن",
    navLogout: "تسجيل الخروج",
    navMyProfile: "ملفي الشخصي",

    heroBadge: "منصة الرعاية الصحية الذكية المتطورة",
    heroTitlePart1: "صحتكم هي أولويتنا الأولى.",
    heroTitlePart2: "الرعاية الطبية أصبحت أسهل.",
    heroSubtitle: "تواصل مع أكثر من 500 طبيب معتمد، واحجز مواعيدك بسهولة، وتتبع قائمة الانتظار المباشرة واستفد من الاستشارات المرئية عالية الدقة.",
    heroFindDoctor: "ابحث عن طبيب",
    heroBookAppointment: "حجز موعد",
    heroVerifiedDocs: "أطباء معتمدون",
    heroHappyPatients: "مرضى راضون",
    heroTelehealth: "طب اتصالي 24/7",
    heroAvgRating: "متوسط التقييم",

    downloadPdf: "تحميل PDF",
    downloadLabReport: "تحميل تقرير المختبر",
    viewSummary: "عرض الملخص",
    uploadDocument: "رفع مستند",
    saveChanges: "حفظ التغييرات",
    savedSuccess: "تم حفظ جميع التعديلات في ملفك الشخصي بنجاح.",
    startVideoCall: "بدء مكالمة فيديو",
    acceptCall: "قبول المكالمة",
    declineCall: "رفض",

    rolePatient: "مريض مسجل",
    roleDoctor: "طبيب معتمد",
    roleAdmin: "مدير المستشفى",
    patientPortal: "بوابة رعاية المريض",
    doctorPortal: "منصة الطبيب المعالج",
    adminPortal: "جناح إدارة المستشفى",

    ehrVault: "سجل السجلات الصحية الإلكترونية",
    ehrSubtitle: "الوصول الفوري إلى كافة الفحوصات المخبرية والأشعة والتقارير الطبية الرسمية",
    officialPdfBadge: "مستند PDF طبي رسمي وموثق",

    appearance: "المظهر",
    language: "اللغة",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن"
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    try {
      return localStorage.getItem("mediconnect_language") || "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (langCode) => {
    if (!TRANSLATIONS[langCode]) return;
    setCurrentLanguageState(langCode);
    try {
      localStorage.setItem("mediconnect_language", langCode);
    } catch {}

    const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    if (selectedLang) {
      document.documentElement.setAttribute("lang", langCode);
      document.documentElement.setAttribute("dir", selectedLang.dir);
    }
  };

  useEffect(() => {
    const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);
    if (selectedLang) {
      document.documentElement.setAttribute("lang", currentLanguage);
      document.documentElement.setAttribute("dir", selectedLang.dir);
    }
  }, [currentLanguage]);

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        currentLangObj,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
