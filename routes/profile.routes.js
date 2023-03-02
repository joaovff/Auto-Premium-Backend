const router = require("express").Router();
const fileUpload = require("../config/cloudinary");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

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
    const { email, password, name, phone , picture } = req.body;

    // Check if email or password or name are provided as empty strings
    if (email === "" || password === "" || name === "") {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const response = await User.findByIdAndUpdate(
      req.params.userId,
      { email, password: hashedPassword, name, phone, picture },
      { new: true }
    );
    console.log(response);
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
