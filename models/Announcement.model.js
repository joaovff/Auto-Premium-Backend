const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: String,
    description: String,
    make: String,
    model: String,
    year: Number,
    kms: Number,
    image: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = model("Announcement", announcementSchema);

module.exports = Announcement;
