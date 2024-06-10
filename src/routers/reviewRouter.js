import express from "express";

import { auth } from "../middlewares/auth.js";
import { newReviewValidation } from "../middlewares/joiValidation.js";
import { insertReview } from "../models/reviews/ReviewModal.js";

const router = express.Router();

//Private controllers create new user
router.post("/", auth, newReviewValidation, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    review?._id
      ? res.json({
          status: "success",
          message: "your new review has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the review, try agian later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
