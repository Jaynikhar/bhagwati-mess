import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    

    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    morning: {
      type: Boolean,
      default: true,
    },

    night: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ user: 1, date: 1, type: 1 }, { unique: true });
export default mongoose.model("Attendance", attendanceSchema);