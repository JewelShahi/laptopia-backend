import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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
      message: "Duplicate products are not allowed in the wishlist",
    },
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
