import mongoose from "mongoose";
import filterText from "../validations/filterText.js";

const messageSchema = new mongoose.Schema(
  {
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: [true, "DB chatroom is required"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "DB sender is required"],
    },
    message: {
      type: String,
      required: [true, "DB message is required"],
      trim: true,
      minlength: [1, "DB message must be at least 1 character long"],
      maxlength: [500, "DB message must be at most 500 characters long"],
    },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  if (this.isModified("message")) {
    this.message = filterText(this.message);
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
