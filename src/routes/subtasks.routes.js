import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
  createSubtask,
  deleteSubtasks,
  getSubtask,
  getSubtasks,
  updateSubtasks,
} from "../controllers/subtask.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks/:id/subtasks", authRequire, getSubtasks);
router.post(
  "/tasks/:id/subtasks",
  authRequire,
  // validateSchema(createTaskSchema),
  createSubtask
);
router.get("/subtasks/:id", authRequire, getSubtask);
router.delete("/subtasks/:id", authRequire, deleteSubtasks);
router.put("/subtask/:id", authRequire, updateSubtasks);

export default router;
