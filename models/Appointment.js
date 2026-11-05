import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    legacyId: {
      type: String,
      unique: true,
      sparse: true
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
      type: String,
      required: true
    },
    patientPhone: {
      type: String,
      required: true
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
      type: String,
      required: true
    },
    doctorImage: {
      type: String
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["In-Person", "Online"],
      default: "In-Person"
    },
    status: {
      type: String,
      enum: ["Confirmed", "In-Progress", "Completed", "Cancelled"],
      default: "Confirmed"
    },
    queueNumber: {
      type: Number,
      required: true
    },
    currentServing: {
      type: Number,
      default: 1
    },
    estimatedWaitMinutes: {
      type: Number,
      default: 0
    },
    meetingRoomId: {
      type: String,
      default: null
    },
    reason: {
      type: String,
      default: "Routine Healthcare Consultation"
    },
    fee: {
      type: Number,
      default: 100
    },
    paid: {
      type: Boolean,
      default: true
    },
    paymentMethod: {
      type: String,
      default: "Credit Card (Simulated)"
    },
    notes: {
      type: String,
      default: ""
    },
    cancellationReason: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

appointmentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.legacyId || ret._id.toString();
    return ret;
  }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
