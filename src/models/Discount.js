import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "DB discount title is required"],
      maxlength: [100, "DB discount title max length is 100 characters"],
      minlength: [1, "DB discount title must be at least 1 character"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    type: {
      type: String,
      enum: ["flat", "percentage"],
      required: [true, "DB discount type is required"],
    },
    value: {
      type: Number,
      required: [true, "DB discount value is required"],
      min: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: [true, "DB start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "DB end date is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
