import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User  from "../models/user.model";
import { z } from "zod";
import {Request, Response} from "express"

// Zod schema for user validation
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});

    
export const register = async (req: Request, res: Response) => {
    try{
        const { email, password } = userSchema.parse(req.body);
        const existingUser = await User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        console.log(user);
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string,{
            expiresIn: "1d"
        });
        res.cookie("authToken", token, {httpOnly: true});
        return res.status(201).json('User created successfully');
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login =  async (req: Request, res: Response) => {
    try {
        const {email, password} = userSchema.parse(req.body);
        const user = await User.findOne({ email });
        if(!user)
            return res.status(404).json({ message: "User not found" });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword)
            return res.status(401).json({ message: "Invalid password" });
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {
            expiresIn: "1d"
        })
        res.status(200).json('User logged in successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        localStorage.removeItem("authToken");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}