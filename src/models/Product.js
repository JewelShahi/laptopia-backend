import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "DB product name is required"],
      unique: [true, "DB product name must be unique"],
      maxlength: [150, "DB mame max length is 150 characters"],
      minlength: [1, "DB name must be at least 1 character"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "DB product description is required"],
      maxlength: [5000, "DB description max length is 5000 characters"],
      minlength: [10, "DB description must be at least 10 characters"],
    },
    brand: {
      type: String,
      trim: true,
      required: [true, "DB brand is required"],
      maxlength: [100, "DB brand max length is 100 characters"],
      minlength: [1, "DB brand must be at least 1 character"],
    },
    category: {
      type: String,
      required: [true, "DB category is required"],
      trim: true,
      enum: {
        values: [
          "Laptop",
          "Mouse",
          "Keyboard",
          "Monitor",
          "Laptop Bag",
          "Docking Station",
          "External Hard Drive",
          "USB Hub",
          "Headphones",
          "Webcam",
          "Charger",
          "Cooling Pad",
          "Speakers",
          "Memory",
          "Storage",
          "Software",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    price: {
      type: Number,
      required: [true, "DB price is required"],
      min: [0, "DB price cannot be negative"],
    },
    qty: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [0, "Stock count cannot be negative"],
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "DB product picture is required"],
        },
        alt: { type: String, trim: true, default: "Product picture" },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    // highlighted product
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
