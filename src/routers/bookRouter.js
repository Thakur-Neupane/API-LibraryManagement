import express from "express";

import { auth, isAdmin } from "../middlewares/auth.js";
import { newBookValidation } from "../middlewares/joiValidation.js";
import { insertBook } from "../models/books/BookModal.js";
const router = express.Router();

//create new user
router.post("/", auth, isAdmin, newBookValidation, async (req, res, next) => {
  try {
    const book = await insertBook(req.body);
    book?._id
      ? res.json({
          status: "success",
          message: "The new book has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the book, try agian later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another Book with same ISBN alreay exist, change the detail and try again";
      error.status = 200;
    }
    next(error);
  }
});

///====== public controllers

export default router;
