export const initialPrescriptions = [
  {
    id: "rx-9001",
    prescriptionNumber: "RX-2026-9001",
    patientId: "pat-1",
    patientName: "Alex Reynolds",
    patientAge: 38,
    patientGender: "Male",
    doctorId: "doc-1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiology",
    doctorHospital: "MediConnect Central Medical Pavilion",
    date: "2026-10-18",
    diagnosis: "Stage 1 Essential Hypertension with mild resting sinus tachycardia",
    vitals: {
      bloodPressure: "134/86 mmHg",
      heartRate: "78 bpm",
      weight: "79 kg",
      temperature: "98.4 °F"
    },
    medicines: [
      {
        name: "Lisinopril Tablets",
        dosage: "10 mg",
        frequency: "Once daily in the morning",
        duration: "30 days",
        instructions: "Take with water before breakfast. Monitor blood pressure weekly."
      },
      {
        name: "Metoprolol Succinate ER",
        dosage: "25 mg",
        frequency: "Once daily with dinner",
        duration: "30 days",
        instructions: "Do not abruptly discontinue without consulting physician."
      },
      {
        name: "Coenzyme Q10 Supplement",
        dosage: "100 mg",
        frequency: "Once daily with meal",
        duration: "60 days",
        instructions: "Cardiovascular cellular support."
      }
    ],
    generalAdvice: "Adopt a low-sodium DASH diet (under 2,000 mg/day). Engage in 30 minutes of moderate aerobic exercise 4 times a week. Refrain from excess caffeine.",
    followUpDate: "2026-11-20"
  },
  {
    id: "rx-9002",
    prescriptionNumber: "RX-2026-9002",
    patientId: "pat-1",
    patientName: "Alex Reynolds",
    patientAge: 38,
    patientGender: "Male",
    doctorId: "doc-4",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "General Medicine",
    doctorHospital: "MediConnect Family Health Center",
    date: "2026-09-05",
    diagnosis: "Acute allergic rhinoconjunctivitis & seasonal pollen sensitivity",
    vitals: {
      bloodPressure: "122/80 mmHg",
      heartRate: "72 bpm",
      weight: "79.5 kg",
      temperature: "98.6 °F"
    },
    medicines: [
      {
        name: "Fexofenadine HCl (Allegra)",
        dosage: "180 mg",
        frequency: "Once daily",
        duration: "14 days",
        instructions: "Take with plain water; avoid fruit juices within 2 hours."
      },
      {
        name: "Fluticasone Propionate Nasal Spray",
        dosage: "50 mcg/spray",
        frequency: "2 sprays in each nostril daily",
        duration: "21 days",
        instructions: "Clear nasal passage prior to application."
      }
    ],
    generalAdvice: "Keep windows closed during high pollen hours (morning). Use HEPA air filtration indoors.",
    followUpDate: "As needed"
  }
];

export default initialPrescriptions;
