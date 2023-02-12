const router = require("express").Router();
const Announcement = require("../models/Announcement.model");
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require("../middleware/jwt.middleware");

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
router.post(
  "/create",
  /* isAuthenticated, */ async (req, res) => {
    try {
      //const userId = req.payload._id;
      const { title, description, image, kms, year, make, model } = req.body;
      if (!title || !description) {
        res
          .status(400)
          .json({ message: "Title and description are mandatory fields." });
        return;
      }
      /* Confirmar com o Xico, sobre ao criar um novo announcement,
         devemos passar a propriedade do _id do user, para associar
         um ao outro */
      const response = await Announcement.create({
        title,
        description,
        image,
        kms,
        year,
        make,
        model,
      });
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
);

// GET - looking for one specific announcement
router.get("/:announcementId", async (req, res) => {
  try {
    const response = await Announcement.findById(req.params.announcementId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
