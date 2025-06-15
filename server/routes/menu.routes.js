const express = require("express");
const { addMenu, getMenuByDate, getAllMenus } = require("../controllers/menu.controllers");
const VerifyToken = require("../middleware/verifyToken");
const upload = require("../utils/multer");
const router = express.Router();


// Separate endpoint for image uploads
router.post('/upload', VerifyToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image uploaded'
    });
  }

  res.status(200).json({
    success: true,
    url: req.file.path
  });
});

router.post("/add", VerifyToken, addMenu);
router.get("/:date",getMenuByDate)
router.get("/",getAllMenus)


module.exports = router;