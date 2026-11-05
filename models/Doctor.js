import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    legacyId: {
      type: String,
      unique: true,
      sparse: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: "+1 (555) 000-0000"
    },
    specialty: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "Clinical Specialist"
    },
    qualifications: {
      type: String,
      default: "MD, Board Certified"
    },
    experience: {
      type: Number,
      default: 5
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1.0,
      max: 5.0
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    fee: {
      type: Number,
      default: 100
    },
    modes: {
      type: [String],
      default: ["In-Person", "Online"]
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85"
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Suspended", "Rejected"],
      default: "Active"
    },
    verificationStatus: {
      type: String,
      enum: ["Verified", "Pending Verification", "Rejected"],
      default: "Verified"
    },
    hospital: {
      type: String,
      default: "MediConnect Central Pavilion"
    },
    room: {
      type: String,
      default: "Suite 101"
    },
    about: {
      type: String,
      default: "Devoted healthcare professional focused on evidence-based, compassionate patient outcomes."
    },
    education: {
      type: [String],
      default: []
    },
    availability: {
      days: {
        type: [String],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      hours: {
        type: String,
        default: "09:00 AM - 05:00 PM"
      },
      breakTime: {
        type: String,
        default: "01:00 PM - 02:00 PM"
      },
      slots: {
        type: [String],
        default: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
      }
    },
    currentServingToken: {
      type: Number,
      default: 0
    },
    totalTokensToday: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Map _id to id in toJSON
doctorSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.legacyId || ret._id.toString();
    return ret;
  }
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
