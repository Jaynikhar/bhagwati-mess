import express from "express";
import protect from "../middleware/authMiddleware.js";
import { markAttendance, getMyAttendance, } from "../controllers/attendanceController.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);


router.get("/my", protect, getMyAttendance);


export default router;
