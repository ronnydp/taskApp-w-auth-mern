import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequire, getTasks);
router.post(
  "/tasks",
  authRequire,
  validateSchema(createTaskSchema),
  createTask
);
router.get("/tasks/:id", authRequire, getTask);
router.delete("/tasks/:id", authRequire, deleteTask);
router.put("/tasks/:id", authRequire, updateTask);

export default router;
