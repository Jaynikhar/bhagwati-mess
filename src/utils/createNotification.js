import Notification from "../models/Notification.js";

const createNotification = async ({ userId, title, message, type }) => {
  try {
    await Notification.create({
      user: userId,
      title,
      message,
      type,
    });
  } catch (error) {
    console.log("Notification error:", error.message);
  }
};

export default createNotification;

