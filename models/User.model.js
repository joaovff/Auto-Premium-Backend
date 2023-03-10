const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Please provide a valid email.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        "Your password must be at least 6 characters long and include a digit, a lower-case letter, and an upper-case letter. Please update your password to meet these requirements.",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    picture: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
    },
    announcements: [
      {
        type: Schema.Types.ObjectId,
        ref: "Announcement",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Announcement",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
