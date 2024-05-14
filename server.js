import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

// Connect MongoD

import { connectMongoDB } from "./src/config/mongoConfig.js";
connectMongoDB();

//middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  //you can leave this for the prod as well to track the user req
  app.use(morgan("dev"));
}

//routers
import userRouter from "./src/routers/userRouter.js";

app.use("/api/v1/users", userRouter);

// Server Status
app.get("/", (req, res, next) => {
  res.json({
    message: "Server running healthy",
  });
  app.use("*", (req, res, next) => {
    const err = new Error("404 Not Found");
    err.status = 404;
    next(err);
  });
});

//global error handler

app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
