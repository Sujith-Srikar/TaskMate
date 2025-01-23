import { Router } from "express";
const router = Router();
import { createTask, updateTask, deleteTask } from "../controllers/task.controller";

router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;