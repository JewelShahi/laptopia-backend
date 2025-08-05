import { Router } from "express";

// Routes for different resources
import users from "./users.js";
import products from "./products.js";
import comments from "./comments.js";
import orders from "./orders.js";
import cart from "./cart.js";
import wishlist from "./wishlist.js";
import discounts from "./discounts.js";
// chatroom and chat messages
import chat from "./chat.js";

// Authentication routes
import auth from "./auth.js";


const router = Router();

router.use("/auth", auth)
router.use("/products", products);
router.use("/users", users);
router.use("/comments", comments);
router.use("/orders", orders);
router.use("/cart", cart);
router.use("/wishlist", wishlist);
router.use("/discounts", discounts);
router.use("/chat", chat);

export default router;
