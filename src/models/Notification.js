import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    createdAt: { type: Date, default: Date.now },

    type: {
      type: String,
      enum: ["PAYMENT", "ORDER", "ATTENDANCE", "SUBSCRIPTION", "SYSTEM"],
      default: "SYSTEM",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
