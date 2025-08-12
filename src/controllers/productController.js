import Product from "../models/Product.js";

// queries for products, for sorting by BRAND, CATEGORY, PRICE, RATING, SEARCH, SPECIFICATIONS
const getAllProducts = async (req, res) => {
  try {
  } catch (error) {}
};

const getAllFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });

    if (products.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand, specifications } =
      req.body;

    if (!name || !price || !description || !category || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      brand,
      specifications,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description, category, brand, specifications } =
      req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!name || !price || !description || !category || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedProduct = Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        description,
        category,
        brand,
        specifications,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  getAllProducts,
  getAllFeaturedProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
