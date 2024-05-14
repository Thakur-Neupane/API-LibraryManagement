import express from "express";
const app = express();
import userRouter from "./src/routers/userRouter.js";

const PORT = process.env.PORT || 8000;

// MongoDB connect
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

import morgan from "morgan";
if (process.env.NODE_ENV !== "production") {
  //dev environment
  app.use(morgan("dev"));
}

// middlewares
import cors from "cors";
app.use(express.json());
app.use(cors());

// Routers
app.use("/", (req, res) => {
  res.json({
    message: "Server running healthy",
  });
});

// global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const errorCode = error.errorCode || 500;
  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server runing at http://localhost:${PORT}`);
});
