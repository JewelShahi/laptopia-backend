import Comment from "../models/Comment.js";
import Recipe from "../models/Recipe.js";
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
    console.log("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllRecipeComments = async (req, res) => {
  try {
    const { id } = req.params;
    const fRecipe = await Recipe.findById(id);

    if (!fRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const recipeComments = await Comment.find({ recipe: id });

    if (recipeComments.length === 0) {
      return res.status(200).json({
        message: "No comments found for this recipe",
      });
    }

    res.status(200).json(recipeComments);
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
    const { id } = req.params;
    const fUser = await User.findById(id);

    if (!fUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userComments = await Comment.find({ user: id });

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
    const { id } = req.params;
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
    const { user, recipe, text } = req.body;

    const fUser = await User.findById(user);
    if (!fUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const fRecipe = await Recipe.findById(recipe);
    if (!fRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newComment = await Comment.create({ user, recipe, text });

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
    const { id } = req.params;

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
  getAllRecipeComments,
  getCommentById,
  createComment,
  deleteComment,
};
