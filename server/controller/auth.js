import generateJwtToken from "../helper/jwt_token.js";
import { encryptPassword, verifyPassword } from "../helper/password_hash.js";
import User_model from "../models/model.user.js";

const registerData = async (req, res) => {
  try {
    const { username, userid, userpassword, role } = req.body;
    if (username == "" || userid == "" || userpassword == "" || role == "") {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user_exist = await User_model.findOne({ userid });
    if (user_exist) {
      return res.status(409).json({ message: "User already exist" });
    }
    const password = await encryptPassword(userpassword);

    const new_user = new User_model({ username, userid, password, role });
    await new_user.save();
    res.status(201).json({ message: "New user stored" });
  } catch (error) {
    res.status(500).json({ Error: `Error on Registration : ${error}` });
  }
};

const loginData = async (req, res) => {
  try {
    const { userid, userpassword } = req.body;
    if (userid == "" || userpassword == "") {
      return res.json({ message: "All Fields are Required" });
    }

    const user_exist = await User_model.findOne({ userid }).select(
      "password role"
    );
    if (!user_exist) {
      return res.status(404).json({ message: "User not exist" });
    }

    const { password, role } = user_exist;
    const verify_password = await verifyPassword(userpassword, password);
    if (!verify_password) {
      return res.status(401).json({ message: "invalid password" });
    }

    const token = generateJwtToken(userid, role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.json({ message: `User Logged` });
  } catch (error) {
    res.json({ Error: `Error on Login - ${error}` });
  }
};

export { loginData, registerData };
