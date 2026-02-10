import Attendance from "../models/Attendance.js";
import Subscription from "../models/Subscription.js";

export const markAttendance = async (req, res) => {
  try {
    const { type } = req.body;

    if (!["MORNING", "NIGHT"].includes(type)) {
      return res.status(400).json({ message: "Invalid attendance type" });
    }

    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: "ACTIVE",
    });

    if (!subscription) {
      return res.status(404).json({ message: "No active subscription" });
    }

    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hours = now.getHours();
    const day = now.getDay(); // 0 = Sunday

    // TIME LOCK RULES
    if (type === "MORNING" && hours >= 8) {
      return res.status(400).json({
        message: "Morning attendance closed after 8 AM",
      });
    }

    if (type === "NIGHT" && hours >= 16) {
      return res.status(400).json({
        message: "Night attendance closed after 4 PM",
      });
    }

    // SUNDAY NIGHT OFF
    if (type === "NIGHT" && day === 0) {
      return res.status(400).json({
        message: "Sunday night meal is OFF",
      });
    }

    let attendance = await Attendance.findOne({
      user: req.user._id,
      date: today,
    });

    if (!attendance) {
      attendance = await Attendance.create({
        user: req.user._id,
        subscription: subscription._id,
        date: today,
      });
    }

    if (type === "MORNING") attendance.morning = false;
    if (type === "NIGHT") attendance.night = false;

    await attendance.save();

    res.json({
      message: `${type} attendance marked successfully`,
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
