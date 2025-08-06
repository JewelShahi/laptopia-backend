import Comment from "../models/Comment.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    if (comments.length === 0) {
      return res.status(200).json({
        message: "No comments found",
      });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllProductComments = async (req, res) => {
  try {
    const { productId } = req.params;
    const fProduct = await Product.findById(productId);

    if (!fProduct) {
      return res.status(404).json({
        message: "Product was not found",
      });
    }

    const productComments = await Comment.find({ product: productId });

    if (productComments.length === 0) {
      return res.status(200).json({
        message: "No comments found for this product",
      });
    }

    res.status(200).json(productComments);
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllUserComments = async (req, res) => {
  try {
    const userId = req.user._id;

    const userComments = await Comment.find({ user: userId });

    if (userComments.length === 0) {
      return res.status(200).json({
        message: "No comments found for this user",
      });
    }
    res.status(200).json(userComments);
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { productId, comment, rating} = req.body;
    const userId = req.user._id;

    const fProduct = await Product.findById(productId);
    if (!fProduct) {
      return res.status(404).json({ message: "Product was not found" });
    }

    const newComment = await Comment.create({ userId, productId, comment, rating });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: `Comment ${id} deleted successfully` });
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  getAllComments,
  getAllUserComments,
  getAllProductComments,
  getCommentById,
  createComment,
  deleteComment,
};
