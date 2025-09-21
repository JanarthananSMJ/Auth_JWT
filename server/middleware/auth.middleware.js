import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token " });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
  } catch (error) {
    return res.status(401).json({ Error: `Unauthorized - ${error}` });
  }
};

export default verifyToken;
