import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "DB user is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "DB products are required"],
      },
    ],
    subTotal: {
      type: Number,
      required: [true, "DB total price is required"],
      min: [0, "DB total price must be at least 0"],
    },
  },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
