import mongoose from "mongoose";
import filterText from "../validations/filterBadWords/filterBadWords.js";
import Product from "./Product.js"; // Adjust path as needed

const commentSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "DB product is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "DB user is required"],
    },
    rating: {
      type: Number,
      required: [true, "DB rating is required"],
      min: [1, "DB rating must be at least 1"],
      max: [5, "DB rating must be at most 5"],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "DB comment is required"],
      minlength: [1, "DB comment must be at least 1 character"],
      maxlength: [500, "DB comment must be at most 500 characters"],
    },
  },
  { timestamps: true }
);

// Filter text on save
commentSchema.pre("save", function (next) {
  if (this.isModified("comment")) {
    this.comment = filterText(this.comment);
  }
  next();
});

// Helper function to update product rating and review count
async function updateProductRating(productId) {
  const comments = await mongoose.model("Comment").find({ product: productId });
  const numReviews = comments.length;
  const avgRating =
    numReviews > 0 ? comments.reduce((acc, c) => acc + c.rating, 0) / numReviews : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: avgRating,
    numReviews: numReviews,
  });
}

// After saving a comment (create or update), update product ratings
commentSchema.post("save", async function () {
  await updateProductRating(this.product);
});

// After deleting a comment via findByIdAndDelete or findOneAndDelete, update product ratings
commentSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await updateProductRating(doc.product);
  }
});

// After updating a comment via findByIdAndUpdate or findOneAndUpdate, update product ratings
commentSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await updateProductRating(doc.product);
  }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
