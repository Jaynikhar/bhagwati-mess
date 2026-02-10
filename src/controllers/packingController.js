import createNotification from "../utils/createNotification.js";
import User from "../models/User.js";

export const requestPacking = async (req, res) => {
  const owner = await User.findOne({ role: "OWNER" });

  await createNotification({
    userId: owner._id,
    title: "Packing Request",
    message: `${req.user.username} requested meal packing`,
    type: "ORDER",
  });

  res.json({ message: "Packing request sent" });
};
