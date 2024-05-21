import express from "express";

import { createNewUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { auth } from "../middlewares/auth.js";

import { getUserByEmail } from "../models/user/UserModel.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  //always execute
  console.log("from all");
  next();
});

// Create new user
router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created",
        })
      : res.json({
          status: "error",
          message: "Unable to create Try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another User alraedy associated with this Email,  change your email and try again ";
      error.status = 200;
    }
    next(error);
  }
});

// All the publi handlers

// login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.includes("@") || !password) {
      throw new Error("Invalid Login Credenials");
    }

    // find user by email
    const user = await getUserByEmail(email);
    if (user?._id) {
      const isPassMatched = comparePassword(password, user.password);
      if (isPassMatched) {
        return res.json({
          status: "success",
          message: "user Authenticated",
          tokens: {
            accessJWT: signAccessJWT({ email }),
            refreshJWT: signRefreshJWT({ email }),
          },
        });
      }
    }

    return res.json({
      status: "error",
      message: "Invalid Login Credentials",
    });

    // check if pw match
  } catch (error) {
    next(error);
  }
});

// Private controllers
// return the user profile

router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    res.json({
      status: "success",
      message: "user Profile",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
