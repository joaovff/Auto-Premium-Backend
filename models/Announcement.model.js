const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    kms: Number,
    year: Number,
    specs: [
      {
        brand: String,
        model: String,
      },
    ],
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
