const express = require("express");
const {login, signOut} = require("../controllers/admin.controllers");
const router = express.Router();

router.post('/login',login);
router.get("/logout",signOut)

module.exports = router;