import { Router } from "express";

import {
  getAllProducts,
  getAllFeaturedProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all products
router.get("/",protect, getAllProducts);
router.get("/featured", protect, getAllFeaturedProducts);
router.get("/:id", protect, getProductById); 
router.post("/", protect, addProduct);
router.patch("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
