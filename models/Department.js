import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    legacyId: {
      type: String,
      unique: true,
      sparse: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true
    },
    headOfDepartment: {
      type: String,
      required: true
    },
    doctorsCount: {
      type: Number,
      default: 1
    },
    activePatients: {
      type: Number,
      default: 0
    },
    wardLocation: {
      type: String,
      default: "Central Hospital Pavilion"
    },
    description: {
      type: String,
      default: "Comprehensive specialized clinical and inpatient healthcare care services."
    },
    iconName: {
      type: String,
      default: "Activity"
    }
  },
  {
    timestamps: true
  }
);

departmentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.legacyId || ret._id.toString();
    return ret;
  }
});

export const Department = mongoose.model("Department", departmentSchema);
export default Department;
