import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ user: userId }).populate("products");
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
      await cart.save();
      return res.status(200).json({ message: "Cart is empty", products: [] });
    }

    if (cart.products.length === 0) {
      return res.status(200).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const fProduct = await Product.findById(productId);
    if (!fProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [productId],
        subTotal: fProduct.price,
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    if (!cart.products.includes(productId)) {
      const updatedSubTotal = cart.subTotal + fProduct.price;
      cart = await Cart.findOneAndUpdate(
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

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // change to auth user id
    const fUser = await User.findById(userId);
    if (!fUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const fProduct = await Product.findById(productId);
    if (!fProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!cart.products.includes(productId)) {
      return res.status(400).json({ message: "Product not in cart" });
    }

    const updatedSubTotal = Math.max(0, cart.subTotal - fProduct.price);
    const newCart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: { products: productId },
        $set: { subTotal: updatedSubTotal },
      },
      { new: true }
    );

    if (!newCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ message: "Product removed from cart", cart: newCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { getCart, addToCart, removeFromCart };