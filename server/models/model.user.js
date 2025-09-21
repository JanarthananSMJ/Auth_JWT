import mongoose from "mongoose";

const user_scheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const User_model = mongoose.model("Users", user_scheme);

export default User_model;
