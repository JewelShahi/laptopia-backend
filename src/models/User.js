import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "DB username is required"],
      unique: true,
      trim: true,
      minlength: [3, "DB username must be at least 3 characters"],
      maxlength: [30, "DB username can be max 30 characters"],
      validate: [
        {
          validator: function (v) {
            return /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(v);
          },
          message:
            "DB username must start with a letter and contain only letters, numbers, '-' and '_'",
        },
        {
          validator: function (v) {
            // must contain at least one letter
            return /[a-zA-Z]/.test(v);
          },
          message:
            "DB username cannot be only numbers or symbols; must contain at least one letter",
        },
      ],
    },
    email: {
      type: String,
      required: [true, "DB Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "DB Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "DB Password is required"],
      minlength: [8, "DB Password must be at least 8 characters"],
      maxlength: [20, "DB Password can be max 20 characters"],
      validate: {
        validator: (v) => /^[a-zA-Z0-9*/\-+._=!%&():;@$_]+$/.test(v),
        message:
          "DB Password contains invalid characters. Allowed: a-z, A-Z, 0-9, and */-+._=!%&():;@$_",
      },
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, "DB First name max length is 50 characters"],
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "DB Last name max length is 50 characters"],
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// DB Pre-save hook to hash password before saving if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// DB Instance method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
