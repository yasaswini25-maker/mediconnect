import { HEALTHCARE_IMAGES } from "../config/images";

export const initialDoctors = [
  {
    id: "doc-1",
    name: "Dr. Sarah Johnson",
    email: "doctor@mediconnect.com", // Main demo doctor
    phone: "+1 (555) 234-5678",
    specialty: "Cardiology",
    department: "Cardiology",
    title: "Senior Consultant Cardiologist",
    qualifications: "MD, FACC, Harvard Medical School",
    experience: 14,
    rating: 4.9,
    reviewsCount: 142,
    fee: 120,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor1,
    status: "Active", // Active, Pending, Inactive
    verificationStatus: "Verified",
    hospital: "MediConnect Central Medical Pavilion",
    room: "Suite 402, North Wing",
    about: "Dr. Sarah Johnson is an internationally recognized cardiologist specializing in preventative cardiovascular medicine, non-invasive imaging, and heart failure management with over 14 years of clinical experience.",
    education: [
      "MD, Harvard Medical School",
      "Residency, Massachusetts General Hospital",
      "Fellowship in Cardiology, Johns Hopkins Medicine"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "09:00 AM - 05:00 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slots: ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM"]
    },
    currentServingToken: 3,
    totalTokensToday: 8
  },
  {
    id: "doc-2",
    name: "Dr. Michael Chen",
    email: "m.chen@mediconnect.com",
    phone: "+1 (555) 345-6789",
    specialty: "Neurology",
    department: "Neurology",
    title: "Chief of Clinical Neurophysiology",
    qualifications: "MD, PhD, Stanford University School of Medicine",
    experience: 11,
    rating: 4.8,
    reviewsCount: 98,
    fee: 150,
    modes: ["Online", "In-Person"],
    image: HEALTHCARE_IMAGES.doctor4,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Neurosciences Institute",
    room: "Suite 310, East Wing",
    about: "Expert in neuro-degenerative disorders, stroke rehabilitation, and complex migraine syndromes. Active researcher in neuro-restorative therapies and digital health monitoring.",
    education: [
      "MD, Stanford University",
      "Residency, Stanford Health Care",
      "Fellowship in Neurophysiology, Mayo Clinic"
    ],
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "10:00 AM - 04:00 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slots: ["10:00 AM", "10:45 AM", "11:30 AM", "02:00 PM", "02:45 PM", "03:30 PM"]
    },
    currentServingToken: 2,
    totalTokensToday: 6
  },
  {
    id: "doc-3",
    name: "Dr. Emily Williams",
    email: "e.williams@mediconnect.com",
    phone: "+1 (555) 456-7890",
    specialty: "Dermatology",
    department: "Dermatology",
    title: "Aesthetic & Clinical Dermatologist",
    qualifications: "MD, FAAD, Columbia University Vagelos College",
    experience: 9,
    rating: 4.9,
    reviewsCount: 168,
    fee: 95,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor3,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Skin & Laser Pavilion",
    room: "Suite 105, Ground Floor",
    about: "Dr. Williams provides compassionate, evidence-based care for acute dermatitis, psoriasis, acne management, and surgical dermatology. Passionate about empowering patients.",
    education: [
      "MD, Columbia University",
      "Residency, New York-Presbyterian Hospital"
    ],
    availability: {
      days: ["Tuesday", "Thursday", "Saturday"],
      hours: "09:00 AM - 03:00 PM",
      breakTime: "12:30 PM - 01:30 PM",
      slots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "01:30 PM", "02:00 PM", "02:30 PM"]
    },
    currentServingToken: 5,
    totalTokensToday: 12
  },
  {
    id: "doc-4",
    name: "Dr. James Wilson",
    email: "j.wilson@mediconnect.com",
    phone: "+1 (555) 567-8901",
    specialty: "General Medicine",
    department: "General Medicine",
    title: "Lead Primary Care Physician",
    qualifications: "MD, Johns Hopkins University",
    experience: 16,
    rating: 4.7,
    reviewsCount: 215,
    fee: 80,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor2,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Family Health Center",
    room: "Suite 201, South Wing",
    about: "Dr. Wilson brings over 16 years of clinical excellence in family medicine, chronic disease management, diabetes prevention, and comprehensive executive wellness examinations.",
    education: [
      "MD, Johns Hopkins University",
      "Residency, Johns Hopkins Bayview Medical Center"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "08:30 AM - 04:30 PM",
      breakTime: "12:00 PM - 01:00 PM",
      slots: ["08:30 AM", "09:15 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "03:45 PM"]
    },
    currentServingToken: 4,
    totalTokensToday: 10
  },
  {
    id: "doc-5",
    name: "Dr. Aisha Patel",
    email: "a.patel@mediconnect.com",
    phone: "+1 (555) 678-9012",
    specialty: "Pediatrics",
    department: "Pediatrics",
    title: "Senior Pediatric Specialist",
    qualifications: "MBBS, MD (Pediatrics), UCL London",
    experience: 10,
    rating: 5.0,
    reviewsCount: 189,
    fee: 90,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor5,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Children's Wellness Wing",
    room: "Suite 112, Pediatric Center",
    about: "Warm, child-friendly pediatrician devoted to developmental monitoring, immunizations, pediatric nutrition, and compassionate guidance for growing families.",
    education: [
      "MBBS, University College London",
      "Pediatric Residency, Great Ormond Street Hospital"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
      hours: "09:00 AM - 02:00 PM",
      breakTime: "12:00 PM - 12:30 PM",
      slots: ["09:00 AM", "09:40 AM", "10:20 AM", "11:00 AM", "12:30 PM", "01:10 PM"]
    },
    currentServingToken: 1,
    totalTokensToday: 7
  },
  {
    id: "doc-6",
    name: "Dr. David Miller",
    email: "d.miller@mediconnect.com",
    phone: "+1 (555) 789-0123",
    specialty: "Orthopedics",
    department: "Orthopedics",
    title: "Orthopedic & Joint Surgeon",
    qualifications: "MD, FAAOS, Yale School of Medicine",
    experience: 13,
    rating: 4.8,
    reviewsCount: 118,
    fee: 140,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor6,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Orthopedic & Sports Medicine",
    room: "Suite 305, West Wing",
    about: "Specialized in minimally invasive arthroscopy, sports trauma, joint replacement rehabilitation, and posture-related spinal decompression.",
    education: [
      "MD, Yale School of Medicine",
      "Residency in Orthopedics, Yale New Haven Hospital"
    ],
    availability: {
      days: ["Wednesday", "Thursday", "Friday"],
      hours: "10:00 AM - 05:00 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    },
    currentServingToken: 3,
    totalTokensToday: 5
  },
  {
    id: "doc-7",
    name: "Dr. Marcus Thorne",
    email: "m.thorne@mediconnect.com",
    phone: "+1 (555) 890-1234",
    specialty: "Cardiology",
    department: "Cardiology",
    title: "Interventional Cardiologist",
    qualifications: "MD, FESC, Oxford University",
    experience: 8,
    rating: 4.6,
    reviewsCount: 42,
    fee: 110,
    modes: ["In-Person"],
    image: HEALTHCARE_IMAGES.doctor7,
    status: "Pending", // Admin verification workflow demonstration
    verificationStatus: "Pending Verification",
    hospital: "MediConnect Central Medical Pavilion",
    room: "Suite 412, North Wing",
    about: "Focusing on catheter-based treatment of structural heart diseases and rapid response cardiovascular interventions.",
    education: [
      "MD, Oxford University",
      "Residency, John Radcliffe Hospital"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Wednesday"],
      hours: "09:00 AM - 04:00 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
    },
    currentServingToken: 0,
    totalTokensToday: 0
  },
  {
    id: "doc-8",
    name: "Dr. Elena Rostova",
    email: "e.rostova@mediconnect.com",
    phone: "+1 (555) 901-2345",
    specialty: "Oncology",
    department: "Oncology",
    title: "Senior Medical Oncologist & Cancer Care",
    qualifications: "MD, PhD, Karolinska Institute",
    experience: 15,
    rating: 4.9,
    reviewsCount: 135,
    fee: 160,
    modes: ["Online", "In-Person"],
    image: HEALTHCARE_IMAGES.doctor8,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Comprehensive Cancer Center",
    room: "Suite 501, Level 5",
    about: "Specializing in precision oncology, target biological therapies, breast and thoracic cancer management, with empathetic patient guidance.",
    education: [
      "MD, Karolinska Institute",
      "Oncology Fellowship, Memorial Sloan Kettering Cancer Center"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Thursday"],
      hours: "09:30 AM - 04:30 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:00 PM", "03:00 PM"]
    },
    currentServingToken: 2,
    totalTokensToday: 5
  },
  {
    id: "doc-9",
    name: "Dr. Tariq Al-Mansoor",
    email: "t.almansoor@mediconnect.com",
    phone: "+1 (555) 012-3456",
    specialty: "Ophthalmology",
    department: "Ophthalmology",
    title: "Vitreoretinal Eye Surgeon",
    qualifications: "FRCOphth, Cambridge University",
    experience: 12,
    rating: 4.8,
    reviewsCount: 88,
    fee: 130,
    modes: ["In-Person"],
    image: HEALTHCARE_IMAGES.doctor9,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Vision & Laser Institute",
    room: "Suite 120, Eye Care Wing",
    about: "Expert in diabetic retinopathy, retinal detachment reconstruction, laser cataract extraction, and advanced ocular diagnostics.",
    education: [
      "MB BChir, Cambridge University",
      "Fellowship, Moorfields Eye Hospital London"
    ],
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "08:30 AM - 03:30 PM",
      breakTime: "12:00 PM - 01:00 PM",
      slots: ["08:30 AM", "09:30 AM", "10:30 AM", "01:00 PM", "02:00 PM"]
    },
    currentServingToken: 4,
    totalTokensToday: 9
  },
  {
    id: "doc-10",
    name: "Dr. Sophia Martinez",
    email: "s.martinez@mediconnect.com",
    phone: "+1 (555) 123-4567",
    specialty: "Psychiatry",
    department: "Psychiatry",
    title: "Consultant Neuropsychiatrist",
    qualifications: "MD, Board Certified, UCLA David Geffen",
    experience: 10,
    rating: 4.9,
    reviewsCount: 154,
    fee: 135,
    modes: ["Online", "In-Person"],
    image: HEALTHCARE_IMAGES.doctor10,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Mind & Behavioral Center",
    room: "Suite 220, Wellness Wing",
    about: "Evidence-based, trauma-informed psychological care focusing on mood regulation, anxiety syndromes, cognitive psychotherapy, and executive wellness.",
    education: [
      "MD, UCLA School of Medicine",
      "Psychiatry Residency, UCLA Semel Institute"
    ],
    availability: {
      days: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
      hours: "10:00 AM - 06:00 PM",
      breakTime: "01:30 PM - 02:30 PM",
      slots: ["10:00 AM", "11:00 AM", "12:00 PM", "02:30 PM", "03:30 PM", "04:30 PM"]
    },
    currentServingToken: 3,
    totalTokensToday: 7
  },
  {
    id: "doc-11",
    name: "Dr. Robert Vance",
    email: "r.vance@mediconnect.com",
    phone: "+1 (555) 234-5670",
    specialty: "Pulmonology",
    department: "Pulmonology",
    title: "Respiratory & Critical Care Specialist",
    qualifications: "MD, FCCP, University of Chicago Pritzker",
    experience: 14,
    rating: 4.7,
    reviewsCount: 103,
    fee: 125,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor11,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Respiratory Pavilion",
    room: "Suite 330, Level 3",
    about: "Comprehensive evaluation of chronic obstructive pulmonary disease (COPD), post-viral fibrosis, allergic asthma, and obstructive sleep apnea.",
    education: [
      "MD, University of Chicago",
      "Pulmonary Fellowship, Northwestern Memorial Hospital"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Thursday", "Friday"],
      hours: "09:00 AM - 04:00 PM",
      breakTime: "12:30 PM - 01:30 PM",
      slots: ["09:00 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:30 PM"]
    },
    currentServingToken: 2,
    totalTokensToday: 6
  },
  {
    id: "doc-12",
    name: "Dr. Grace Kim",
    email: "g.kim@mediconnect.com",
    phone: "+1 (555) 345-6781",
    specialty: "Dentistry",
    department: "Dentistry",
    title: "Maxillofacial & Aesthetic Orthodontist",
    qualifications: "DDS, MS, NYU College of Dentistry",
    experience: 11,
    rating: 5.0,
    reviewsCount: 176,
    fee: 105,
    modes: ["In-Person"],
    image: HEALTHCARE_IMAGES.doctor12,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Dental & Orthodontic Center",
    room: "Suite 108, Ground Floor",
    about: "State-of-the-art restorative dental health, Invisalign orthodontic correction, periodontal treatments, and precision aesthetic veneer placement.",
    education: [
      "DDS, NYU College of Dentistry",
      "Postdoctoral Orthodontic Residency, Columbia University"
    ],
    availability: {
      days: ["Monday", "Wednesday", "Thursday", "Saturday"],
      hours: "08:30 AM - 03:30 PM",
      breakTime: "12:00 PM - 01:00 PM",
      slots: ["08:30 AM", "09:30 AM", "10:30 AM", "01:00 PM", "02:00 PM"]
    },
    currentServingToken: 3,
    totalTokensToday: 8
  },
  {
    id: "doc-13",
    name: "Dr. Priya Sharma",
    email: "p.sharma@mediconnect.com",
    phone: "+1 (555) 456-7892",
    specialty: "Gynecology",
    department: "Gynecology",
    title: "Senior Obstetrician & Women's Health Lead",
    qualifications: "MD, MRCOG, King's College London",
    experience: 13,
    rating: 4.9,
    reviewsCount: 195,
    fee: 115,
    modes: ["In-Person", "Online"],
    image: HEALTHCARE_IMAGES.doctor13,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Women & Children Pavilion",
    room: "Suite 415, Level 4",
    about: "Specialized in high-risk pregnancy monitoring, adolescent gynecology, fertility counseling, and minimally invasive laparoscopic surgery.",
    education: [
      "MBBS, MD, King's College London",
      "Obstetric Specialist Fellowship, St Thomas' Hospital London"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Friday"],
      hours: "09:00 AM - 04:30 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
    },
    currentServingToken: 4,
    totalTokensToday: 9
  },
  {
    id: "doc-14",
    name: "Dr. Alexander Becker",
    email: "a.becker@mediconnect.com",
    phone: "+1 (555) 567-8903",
    specialty: "General Medicine",
    department: "General Medicine",
    title: "Hepatologist & Internal Medicine Specialist",
    qualifications: "MD, Heidelberg University",
    experience: 12,
    rating: 4.8,
    reviewsCount: 84,
    fee: 110,
    modes: ["Online", "In-Person"],
    image: HEALTHCARE_IMAGES.doctor14,
    status: "Active",
    verificationStatus: "Verified",
    hospital: "MediConnect Digestive Health Pavilion",
    room: "Suite 218, South Wing",
    about: "Expert in liver metabolic diseases, gastrointestinal endoscopic diagnostics, metabolic syndromes, and lifestyle health coaching.",
    education: [
      "MD, Heidelberg University",
      "Gastroenterology Residency, Charité Berlin"
    ],
    availability: {
      days: ["Tuesday", "Thursday", "Friday"],
      hours: "09:00 AM - 03:30 PM",
      breakTime: "12:30 PM - 01:30 PM",
      slots: ["09:00 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:30 PM"]
    },
    currentServingToken: 1,
    totalTokensToday: 4
  }
];

export default initialDoctors;
