import express from "express";
import protect from "../middleware/authMiddleware.js";
import isOwner from "../middleware/ownerMiddleware.js";
import {
  createOrUpdateMenu,
  getTodayMenu,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/today", protect, getTodayMenu);

router.post("/", protect, isOwner, createOrUpdateMenu);

export default router;