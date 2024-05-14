import mongoose from "mongoose";
export const connectMongoDB = () => {
  try {
    const con = mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};
