import mongoose from "mongoose";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const orderSchema = new mongoose.Schema(
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
    totalPrice: {
      type: Number,
      required: [true, "DB total price is required"],
      min: [0, "DB total price must be at least 0"],
    },
    address: {
      fullName: {
        type: String,
        required: [true, "DB full name is required"],
        trim: true,
      },
      fullAddress: {
        type: String,
        required: [true, "DB full address is required"],
        trim: true,
        minlength: [10, "DB address must be at least 10 characters"],
        maxlength: [500, "DB address must be at most 500 characters"],
      },
      postalCode: {
        type: String,
        trim: true,
        required: [true, "DB postal code is required"],
        minlength: [3, "DB postal code must be at least 3 characters"],
        maxlength: [10, "DB postal code must be at most 10 characters"],
        validate: {
          validator: function (v) {
            return /^[A-Za-z0-9\s-]+$/.test(v);
          },
          message: (props) =>
            `DB ${props.value} contains invalid characters for a postal code!`,
        },
      },
      country: {
        type: String,
        required: [true, "DB country is required"],
        trim: true,
      },
      phone: {
        type: String,
        validate: {
          validator: function (value) {
            const phoneNumber = parsePhoneNumberFromString(value);
            return phoneNumber ? phoneNumber.isValid() : false;
          },
          message: (props) => `DB ${props.value} is not a valid phone number!`,
        },
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
