const MenuItem = require("../models/menu.models");
const errorHandler = require("../utils/error");

const addMenu = async (req, res, next) => {
  try {
    const { type, date, items } = req.body;

    // Basic validation
    if (!type || !date || !items || !Array.isArray(items) || items.length === 0) {
      return next(errorHandler(400, "All fields are required and 'items' must be a non-empty array."));
    }

    // Validate each item
    const validatedItems = items.map((item, index) => {
      if (
        !item?.name || typeof item.name !== "string" ||
        !item?.quantity || typeof item.quantity !== "string" ||
        !item?.sufficientFor || typeof item.sufficientFor !== "string" ||
        item?.price === undefined || typeof item.price !== "number" ||
        !item?.image || typeof item.image !== "string"
      ) {
        throw new Error(`Item at index ${index} is invalid. Each item must include valid 'name', 'quantity', 'sufficientFor', 'price', and 'image'.`);
      }

      return {
        name: item.name.trim(),
        quantity: item.quantity.trim(),
        sufficientFor: item.sufficientFor.trim(),
        price: item.price,
        image: item.image.trim()
      };
    });

    const newMenu = new MenuItem({ 
      type: type.trim(),
      date: date.trim(),
      items: validatedItems
    });

    await newMenu.save();

    res.status(201).json({
      success: true,
      message: "Menu added successfully",
      data: newMenu
    });
  } catch (err) {
    next(errorHandler(400, err.message));
  }
};


const customMealOrder = {
  Breakfast: 1,
  Lunch: 2,
  Dinner: 3
};

const getMenuByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    if (!date) return next(errorHandler(400, "Date is required."));

    const formattedDate = new Date(date);
    const nextDay = new Date(formattedDate);
    nextDay.setDate(formattedDate.getDate() + 1);

    let menus = await MenuItem.find({
      date: {
        $gte: formattedDate,
        $lt: nextDay
      }
    });

    menus = menus.sort((a, b) => {
      return customMealOrder[a.type] - customMealOrder[b.type];
    });

    res.status(200).json({
      success: true,
      data: menus
    });
  } catch (err) {
    next(errorHandler(500, "Server Error: " + err.message));
  }
};

const getAllMenus = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let menus = await MenuItem.find({
      date: { $gte: today } 
    });

    menus = menus.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA - dateB;
      }

      return customMealOrder[a.type] - customMealOrder[b.type];
    });

    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (err) {
    next(errorHandler(500, "Server Error: " + err.message));
  }
};




module.exports = { addMenu,getMenuByDate,getAllMenus };
