const router = require("express").Router();
const Announcement = require("../models/Announcement.model");
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

// GET - gets all announcements
router.get("/", async (req, res) => {
  try {
    const response = await Announcement.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// POST - create a announcement
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const {
      title,
      description,
      make,
      model,
      color,
      year,
      kms,
      image,
      price,
      localization,
      hp,
      engineDisplacement,
      fuel,
    } = req.body;
    if ((!title || !description, !image, !kms, !year, !model, !price)) {
      res.status(400).json({ message: "Missing mandatory fields." });
      return;
    }
    /* Confirmar com o Xico, sobre ao criar um novo announcement,
         devemos passar a propriedade do _id do user, para associar
         um ao outro */
    const response = await Announcement.create({
      title,
      description,
      make,
      model,
      color,
      year,
      kms,
      image,
      price,
      localization,
      hp,
      engineDisplacement,
      fuel,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { announcements: response },
    });
    
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// GET - looking for one specific announcement
router.get("/:announcementId", async (req, res) => {
  try {
    const response = await Announcement.findById(
      req.params.announcementId
    ).populate("user");
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//UPDATE
router.put("/edit/:announcementId", async (req, res) => {
  try {
    const {
      title,
      description,
      make,
      model,
      color,
      year,
      kms,
      image,
      price,
      localization,
      hp,
      engineDisplacement,
      fuel,
    } = req.body;
    const response = await Announcement.findByIdAndUpdate(
      req.params.announcementId,
      {
        title,
        description,
        make,
        model,
        color,
        year,
        kms,
        image,
        price,
        localization,
        hp,
        engineDisplacement,
        fuel,
      },
      { new: true }
    );

    res.status(200).json(response);
  } catch (e) {
    res.status(200).json({ message: e });
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

//DELETE
router.delete("/:announcementId", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.announcementId);
    res.status(200).json({
      message: `Project with id ${req.params.announcementId} was deleted`,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
