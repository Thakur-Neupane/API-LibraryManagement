import express from "express";

import { auth, isAdmin } from "../middlewares/auth.js";
import {
  newBookValidation,
  newBurrowValidation,
  updateBookValidation,
} from "../middlewares/joiValidation.js";
import {
  getABookById,
  getAllBooks,
  insertBook,
  updateABookById,
} from "../models/books/BookModal.js";
import { insertBurrow } from "../models/burrowHistory/BurrowModal.js";
const router = express.Router();

const maxBurrowingDays = 15;

// create new Burrow history
router.post("/", newBurrowValidation, async (req, res, next) => {
  try {
    const today = new Date();
    const { _id, fName } = req.userInfo;
    const burrow = await insertBurrow({
      ...req.body,
      userId: _id,
      userName: fName,
    });
    //if burrow successfull
    //then -> update the book table, isAvailable: false

    if (burrow) {
      await updateABookById(req.body.bookId, {
        isAvailable: false,

        expectedAvailable: today.setDate(
          today.getDate() + maxBurrowingDays,
          "day"
        ),
      });

      return res.json({
        status: "success",
        message: "This book now available in your account.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to burrow the book, try agian later",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
