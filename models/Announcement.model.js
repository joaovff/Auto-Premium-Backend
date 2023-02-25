const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
    },
    kms: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    localization: {
      type: String,
      require: true,
    },
    hp: {
      type: Number,
      min: 0,
      required: true,
    },
    engineDisplacement: {
      type: Number,
      required: true,
      min: 0,
    },
    fuel: {
      type: String,
      enum: ["gasoline", "diesel", "eletric", "hybrid"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = model("Announcement", announcementSchema);

module.exports = Announcement;
