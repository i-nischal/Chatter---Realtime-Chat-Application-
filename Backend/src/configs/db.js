import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/Chatter`);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Database Connection Error : ", err.message);
    process.exit(1);
  }
};

export default connectDB;
