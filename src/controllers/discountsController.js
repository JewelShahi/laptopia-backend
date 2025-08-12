import Discount from "../models/Discount.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate("products");
    if (discounts.length === 0) {
      return res.status(404).json({ message: "No discounts found" });
    }

    res.status(200).json(discounts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getDiscountById = async (req, res) => {
  try {
    const { discountId } = req.params;
    const discount = await Discount.findById(discountId).populate("products");
    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res.status(200).json(discount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createDiscount = async (req, res) => {
  try {
    const { title, products, type, value, startDate, endDate } = req.body;

    if (!title || !products || !type || !value || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingDiscount = await Discount.findOne({ title });
    if (existingDiscount) {
      return res
        .status(400)
        .json({ message: "Discount with this title already exists" });
    }

    const discount = new Discount({
      title,
      products,
      type,
      value,
      startDate,
      endDate,
    });
    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;
    const { title, products, type, value, startDate, endDate } = req.body;
    const discount = await Discount.findById(discountId);
    
    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    if (!title || !products || !type || !value || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedDiscount = await Discount.findByIdAndUpdate(
      discountId,
      {
        title,
        products,
        type,
        value,
        startDate,
        endDate,
      },
      { new: true }
    );
    res.status(200).json(updatedDiscount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;
    const discount = await Discount.findByIdAndDelete(discountId);
    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }
    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
