import generateJwtToken from "../helper/jwt_token.js";
import { encryptPassword, verifyPassword } from "../helper/password_hash.js";
import User_model from "../models/model.user.js";

const registerData = async (req, res) => {
  try {
    const { username, userid, userpassword, role } = req.body;
    if (username == "" || userid == "" || userpassword == "" || role == "") {
      return res.json({ message: "All fields are required", status: 400 });
    }

    const user_exist = await User_model.findOne({ userid });
    if (user_exist) {
      return res.json({ message: "User already exist", status: 409 });
    }
    const password = await encryptPassword(userpassword);

    const new_user = new User_model({ username, userid, password, role });
    await new_user.save();
    res.json({ message: "New user stored", status: 201 });
  } catch (error) {
    res.json({ Error: `Error on Registration : ${error}`, status: 500 });
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
      return res.json({ message: "User not exist", status: 404 });
    }

    const { password, role } = user_exist;
    const verify_password = await verifyPassword(userpassword, password);
    if (!verify_password) {
      return res.json({ message: "invalid password", status: 401 });
    }

    const token = generateJwtToken(userid, role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.json({ message: `User Logged`, status: 200 });
  } catch (error) {
    res.json({ Error: `Error on Login - ${error}` });
  }
};

export { loginData, registerData };
