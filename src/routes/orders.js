import { Router } from "express";

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all orders
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrderById);
router.post("/", protect, createOrder);
router.patch("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

export default router;
