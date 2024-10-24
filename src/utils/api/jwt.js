import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export function generateToken(payload, expiresIn = "999h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
