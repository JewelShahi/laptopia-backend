import { Router } from "express";
import {
  getAllComments,
  getAllUserComments,
  getAllProductComments,
  getCommentById,
  createComment,
  deleteComment,
} from "../controllers/commentController.js";

// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, getAllComments);
router.get("/user/:userId", protect, getAllUserComments);
router.get("/product/:productId", getAllProductComments);
router.get("/:commentId", protect, getCommentById);
router.post("/", protect, createComment);
router.delete("/:commentId", protect, deleteComment);

export default router;
