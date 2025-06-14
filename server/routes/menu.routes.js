const express = require("express");
const { addMenu, getMenuByDate, getAllMenus } = require("../controllers/menu.controllers");
const VerifyToken = require("../middleware/verifyToken");
const upload = require("../utils/multer");
const router = express.Router();

router.post("/add", VerifyToken,upload.array("images", 10), addMenu);
router.get("/:date",getMenuByDate)
router.get("/",getAllMenus)


module.exports = router;