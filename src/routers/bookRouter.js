import express from "express";

import { auth, isAdmin } from "../middlewares/auth.js";
import {
  newBookValidation,
  updateBookValidation,
} from "../middlewares/joiValidation.js";
import {
  getABookById,
  getAllBooks,
  insertBook,
  updateABookById,
} from "../models/books/BookModal.js";

const router = express.Router();

//Private controllers create new user
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

router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    // get all active books
    const books = await getAllBooks();

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    next(error);
  }
});

///====== public controllers
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    // get all active books
    const books = _id
      ? await getABookById(_id)
      : await getAllBooks({ status: "active" });

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", updateBookValidation, isAdmin, auth, async (req, res, next) => {
  try {
    const {id, ...rest}= req.body;
    updatedBooks = await updateABookById(_id, rest);
    updatedBooks?._id
      ? res.status(200).json({
          status: "success",
          message: "Book has been updated Successfully",
        })
      : res.status(403).json({
          status: "error",
          message: "Book can't updated try again",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
