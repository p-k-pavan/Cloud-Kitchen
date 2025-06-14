const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cloud Kitchen Backend is running!");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
