import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
  register,
  login,
  logout,
  profile,
  verifyToken
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequire, profile);
router.get("/verify-token", verifyToken);

export default router;
