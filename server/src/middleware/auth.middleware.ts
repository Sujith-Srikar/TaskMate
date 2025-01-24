import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import CustomRequest from "../types/express";

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.get("authToken");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decodeToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
