import { HEALTHCARE_IMAGES } from "../config/images";

export const initialPatients = [
  {
    id: "pat-1",
    name: "Alex Reynolds",
    email: "patient@mediconnect.com", // Main demo patient
    phone: "+1 (555) 712-4433",
    gender: "Male",
    dob: "1988-04-14",
    age: 38,
    bloodGroup: "O+",
    address: "742 Evergreen Terrace, Springfield, OR",
    emergencyContact: {
      name: "Claire Reynolds",
      relation: "Spouse",
      phone: "+1 (555) 712-4434"
    },
    allergies: ["Penicillin", "Dust Mites"],
    chronicConditions: ["Mild Hypertension"],
    image: HEALTHCARE_IMAGES.patient1,
    status: "Active",
    registeredDate: "2025-01-15",
    insurance: {
      provider: "BlueCross Health Shield",
      policyNumber: "BC-8921473-90",
      validUntil: "2027-12-31"
    }
  },
  {
    id: "pat-2",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "+1 (555) 902-1188",
    gender: "Female",
    dob: "1994-08-22",
    age: 32,
    bloodGroup: "A+",
    address: "124 Ocean Breeze Ave, Santa Monica, CA",
    emergencyContact: {
      name: "Carlos Martinez",
      relation: "Father",
      phone: "+1 (555) 902-1189"
    },
    allergies: ["Sulfonamides"],
    chronicConditions: ["Asthma"],
    image: HEALTHCARE_IMAGES.patient3,
    status: "Active",
    registeredDate: "2025-03-02",
    insurance: {
      provider: "Aetna Preferred",
      policyNumber: "AET-3341829",
      validUntil: "2026-11-30"
    }
  },
  {
    id: "pat-3",
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    phone: "+1 (555) 334-9981",
    gender: "Male",
    dob: "1976-11-05",
    age: 50,
    bloodGroup: "B+",
    address: "88 Pinehurst Blvd, Boston, MA",
    emergencyContact: {
      name: "Fiona O'Connor",
      relation: "Sister",
      phone: "+1 (555) 334-9982"
    },
    allergies: ["None"],
    chronicConditions: ["Type 2 Diabetes"],
    image: HEALTHCARE_IMAGES.patient2,
    status: "Active",
    registeredDate: "2025-04-19",
    insurance: {
      provider: "UnitedHealthcare",
      policyNumber: "UHC-9921445",
      validUntil: "2026-08-15"
    }
  },
  {
    id: "pat-4",
    name: "Maya Lin",
    email: "maya.lin@example.com",
    phone: "+1 (555) 662-8844",
    gender: "Female",
    dob: "1999-01-30",
    age: 27,
    bloodGroup: "AB-",
    address: "512 Maple St, Seattle, WA",
    emergencyContact: {
      name: "David Lin",
      relation: "Brother",
      phone: "+1 (555) 662-8845"
    },
    allergies: ["Latex"],
    chronicConditions: ["None"],
    image: HEALTHCARE_IMAGES.patient5,
    status: "Active",
    registeredDate: "2025-06-11",
    insurance: {
      provider: "Cigna Health Care",
      policyNumber: "CGN-1288349",
      validUntil: "2027-04-30"
    }
  }
];

export default initialPatients;
