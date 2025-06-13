const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cloud Kitchen Backend is running!");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
