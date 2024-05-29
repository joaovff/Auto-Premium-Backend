const express = require("express");
const router = express.Router();
const fileUpload = require("../config/cloudinary");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Announcement = require("../models/Announcement.model");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name, phone, picture } = req.body;

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

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({
        email,
        password: hashedPassword,
        name,
        phone,
        picture,
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

//UPLOAD IMAGE
router.post("/upload", fileUpload.single("fileName"), async (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res.status(500).json({ message: "An error occurred." });
  }
});

// POST /login - Verifies email and password and returns a JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are mandatory to login." });
      return;
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(401).json({ message: "Invalid login." });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid login." });
      return;
    }

    const authToken = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.AUTH_SECRET,
      { algorithm: "HS256", expiresIn: "6h" }
    );

    res.status(200).json(authToken);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      message: `User with id ${req.params.userId} was deleted`,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
