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

    const isProduction = process.env.NODE_ENV === "production";
    const age = 1000 * 60 * 60 * 24 * 1;

    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: age,
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        // domain: isProduction ? '.vercel.app' : ".localhost",
        partitioned: isProduction,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successful", admin: true });
  } catch (error) {
    next(error);
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ message: "User signed out successfully" })
  } catch (error) {
    next(error)
  }
};

module.exports = { login, signOut };
