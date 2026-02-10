import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import menuRoutes from "./routes/menuRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import packingRoutes from "./src/routes/packingRoutes.js";
// import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
// import orderRoutes from "./src/routes/orderRoutes.js";
// import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});


// auth routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/subscriptions", subscriptionRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/packing", packingRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);





// DB
mongoose
  .connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
