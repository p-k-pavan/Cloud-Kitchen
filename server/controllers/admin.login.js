const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const login = async (req, res, next) => {
  const { email, password } = req.body;
 

  try {
    if (email !== process.env.ADMIN_EMAIL) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isPasswordValid) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login successful", admin: true });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
