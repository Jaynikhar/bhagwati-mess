import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    planType: {
      type: String,
      enum: ["THALI", "TIFFIN", "DAILY"],
      required: true,
    },

    upiTransactionId: {
      type: String,
      required: true,
    },

    screenshotUrl: {
      type: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
