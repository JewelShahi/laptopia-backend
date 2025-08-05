import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "DB user is required"],
    unique: true,
  },
  products: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "DB products are required"],
      },
    ],
    validate: {
      validator: function (v) {
        const seen = Object.create(null);
        for (let i = 0; i < v.length; i++) {
          const idStr = v[i].toString(); 
          if (seen[idStr]) {
            return false; 
          }
          seen[idStr] = true;
        }
        return true;
      },
      message: "Duplicate products are not allowed in the cart",
    },
  },
  subTotal: {
    type: Number,
    default: 0,
    required: [true, "DB total price is required"],
    min: [0, "DB total price must be at least 0"],
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
