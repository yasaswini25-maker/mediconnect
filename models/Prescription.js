import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String, default: "Take after food" }
  },
  { _id: false }
);

const prescriptionSchema = new mongoose.Schema(
  {
    legacyId: {
      type: String,
      unique: true,
      sparse: true
    },
    prescriptionNumber: {
      type: String,
      required: true,
      unique: true
    },
    date: {
      type: String,
      required: true
    },
    patientId: {
      type: String,
      required: true
    },
    patientName: {
      type: String,
      required: true
    },
    patientEmail: {
      type: String
    },
    patientPhone: {
      type: String
    },
    doctorId: {
      type: String,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    doctorSpecialty: {
      type: String
    },
    diagnosis: {
      type: String,
      required: true
    },
    vitals: {
      bp: { type: String, default: "120/80 mmHg" },
      heartRate: { type: String, default: "72 bpm" },
      temperature: { type: String, default: "98.6 °F" },
      weight: { type: String, default: "70 kg" },
      spo2: { type: String, default: "99%" }
    },
    medicines: [medicineSchema],
    instructions: {
      type: String,
      default: "Adequate hydration, balanced nutrition, follow-up as scheduled."
    },
    followUpDate: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

prescriptionSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.legacyId || ret._id.toString();
    return ret;
  }
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
