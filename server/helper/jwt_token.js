import jwt from "jsonwebtoken";

const generateJwtToken = (userid, role) => {
  const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;
  const jwt_token = jwt.sign({ id: userid, role }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return jwt_token;
};

export default generateJwtToken;
