import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Wishlist.findOne({ user: userId }).populate("products");
    if (!cart) {
      cart = new Wishlist({ user: userId, products: [] });
      await cart.save();
      return res.status(200).json({ message: "Wishlist is empty", products: [] });
    }

    if (cart.products.length === 0) {
      return res.status(200).json({ message: "Wishlist is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    const fProduct = await Product.findById(productId);
    if (!fProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Wishlist.findOne({ user: userId });
    if (!cart) {
      cart = new Wishlist({
        user: userId,
        products: [productId],
        subTotal: fProduct.price,
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    if (!cart.products.includes(productId)) {
      const updatedSubTotal = cart.subTotal + fProduct.price;
      cart = await Wishlist.findOneAndUpdate(
        { user: userId },
        {
          $addToSet: { products: productId },
          $set: { subTotal: updatedSubTotal },
        },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Product already in cart" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const fProduct = await Product.findById(productId);
    if (!fProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Wishlist.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (!cart.products.includes(productId)) {
      return res.status(400).json({ message: "Product not in cart" });
    }

    const updatedSubTotal = Math.max(0, cart.subTotal - fProduct.price);
    const newWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      {
        $pull: { products: productId },
        $set: { subTotal: updatedSubTotal },
      },
      { new: true }
    );

    if (!newWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res
      .status(200)
      .json({ message: "Product removed from wishlist", cart: newWishlist });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { getWishlist, addToWishlist, removeFromWishlist };
