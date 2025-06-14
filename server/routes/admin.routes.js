const express = require("express");
const login = require("../controllers/admin.login");
const router = express.Router();

router.post('/login',login);

module.exports = router;