const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const adminRoute = require("./routes/admin.routes")
const menuRouter = require("./routes/menu.routes")
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

dotenv.config();

mongoose
  .connect(process.env.MONGODB, {  serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error.message);

    if (error.message.includes('timed out')) {
      console.error('Connection attempt timed out. Please check your database server and network settings.');
    } else {
      console.error('An unexpected error occurred:', error);
    }
  });



app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());

app.use("/api/admin",adminRoute);
app.use("/api/Menu",menuRouter);

app.get("/", (req, res) => {
  res.send("Cloud Kitchen Backend is running!");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
