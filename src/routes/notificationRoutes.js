import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  markNotificationRead,
} from "../controllers/notificationController.js";
import Notification from "../models/Notification.js";
const router = express.Router();

router.post("/packing", protect, async (req, res) => {
  const note = await Notification.create({
    message: `${req.user.username} requested packing`
  });
  res.json(note);
});
router.get("/", protect, getMyNotifications);
router.put("/:id/read", protect, markNotificationRead);

export default router;
