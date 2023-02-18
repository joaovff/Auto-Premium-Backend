const router = require("express").Router();
const User = require("../models/User.model");
const fileUpload = require("../config/cloudinary");

//Get an user
router.get("/:userId", async (req, res) => {
  try {
    const response = await User.findById(req.params.userId);
    console.log("this user is :", response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Edit a user
router.put("/edit/:userId", async (req, res) => {
  try {
    const { email, password, name, picture } = req.body;
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      { email, password, name, picture },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//UPLOAD IMAGE
router.post("/upload", fileUpload.single("fileName"), async (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res.status(500).json({ message: "an error occurred" });
  }
});

module.exports = router;