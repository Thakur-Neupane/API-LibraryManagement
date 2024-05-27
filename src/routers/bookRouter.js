import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
const router = express.Router();

//create new user
router.post("/", auth, isAdmin, async (req, res, next) => {
  try {
   
    const book = await insertBook(req.body)
    book?._id? res.json({
      status: "success",
      message: "The new book has been added successfully"
    })

  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another Book With same ISBN already exist, Pleazse change the detail and try again ";
      error.status = 200;
    }
    next(error);
  }
});

export default router;
