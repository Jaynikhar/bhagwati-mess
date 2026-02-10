import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },

    day: {
      rice: String,
      pulse: String,
      veggie: String,
      special: String,
      videoUrl: String,
    },

    night: {
      rice: String,
      pulse: String,
      veggie: String,
      special: String,
      videoUrl: String,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
