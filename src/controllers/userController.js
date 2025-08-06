import User from "../models/User.js";
import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import bcrypt from "bcryptjs";

/* -------------------------------------------
   USER ROUTES (Self-Serve)
------------------------------------------- */

// Get own profile
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update own profile (with password hashing)
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const updates = { ...req.body };

    if (updates.password) {
      if (
        updates.password.length < 8 ||
        updates.password.length > 20 ||
        !/^[a-zA-Z0-9*/\-+._=!%&():;@$_]+$/.test(updates.password)
      ) {
        return res.status(400).json({
          message:
            "Password must be 8–20 characters and contain only valid characters: a-z, A-Z, 0-9, */-+._=!%&():;@$_",
        });
      }

      const salt = await bcrypt.genSalt(12);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found for update" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// Delete own account
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found for deletion" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

/* -------------------------------------------
   ADMIN ROUTES (Access Other Users' Data)
------------------------------------------- */

// Get all users (no passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Admin: Get any user's wishlist
const adminGetUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (!wishlist.products || wishlist.products.length === 0) {
      return res
        .status(200)
        .json({ message: "Wishlist is empty", wishlist: [] });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Admin: Get any user's cart
const adminGetUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId }).populate("products");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!cart.products || cart.products.length === 0) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Admin: Get any user's orders
const adminGetUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("products");

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders found", orders: [] });
    }

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  adminGetUserWishlist,
  adminGetUserCart,
  adminGetUserOrders,
};
