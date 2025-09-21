import mongoose from "mongoose";

const connectDb = async (DB_URL) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

export default connectDb;
