const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  sufficientFor: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const menuItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Breakfast", "Lunch", "Dinner"]
  },
  date: {
    type: Date,
    required: true
  },
  items: {
    type: [itemSchema],
    required: true
  }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
