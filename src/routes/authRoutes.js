import express from "express";
import { signup , login} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// export default router;
// import express from "express";
// import { registerUser } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);


export default router;
