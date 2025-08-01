import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
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
  },
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
