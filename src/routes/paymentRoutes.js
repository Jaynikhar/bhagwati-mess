import express from "express";
import protect from "../middleware/authMiddleware.js";
import isOwner from "../middleware/ownerMiddleware.js";
import {
  createPayment,
  verifyPayment,
  getMyPayments,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", protect, createPayment);
router.get("/my", protect, getMyPayments);
router.put("/:id/verify", protect, isOwner, verifyPayment);

export default router;
