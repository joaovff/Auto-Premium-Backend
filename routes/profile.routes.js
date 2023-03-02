const router = require("express").Router();
const User = require("../models/User.model");
const fileUpload = require("../config/cloudinary");

//Get a user
router.get("/:userId", async (req, res) => {
  try {
    const response = await User.findById(req.params.userId).populate(
      "announcements"
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Profile settings (edit and delete)

//get profile
router.get("/settings/:userId", async (req, res) => {
  try {
    const response = await User.findById(req.params.userId).populate(
      "announcements"
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//edit user
router.put("/edit/:userId", async (req, res) => {
  try {
    const { email, name } = req.body;
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      { email, name },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//delete profile

//UPLOAD IMAGE
router.post("/upload", fileUpload.single("fileName"), async (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res.status(500).json({ message: "an error occurred" });
  }
});

//FAVORITES ROUTES

//Adding a favorite
router.put("/favorites/:userId", async (req, res) => {
  try {
    const { itemId } = req.body;
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { favorites: itemId } },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Getting favorites
router.get("/favorites/:userId", async (req, res) => {
  try {
    const response = await User.findById(req.params.userId).populate(
      "favorites"
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Delete favorite
router.patch("/favorites/:userId", async (req, res) => {
  try {
    const { itemId } = req.body;
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { favorites: itemId } },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
