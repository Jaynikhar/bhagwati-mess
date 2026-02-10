import express from "express";
import protect from "../middleware/authMiddleware.js";
import { requestPacking } from "../controllers/packingController.js";

const router = express.Router();
router.post("/request", protect, requestPacking);
export default router;
