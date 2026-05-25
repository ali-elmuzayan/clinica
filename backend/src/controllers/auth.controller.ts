import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { response } from "../utils/response.js";
import { registerSchema } from "../validators/auth.validator.js";


/**
 * Register a new user & 
 * @param req - The request object
 * @param res - The response object
 * @returns - The response object
 */
export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    console.log("register result", result);

    if (!result.success) {
        return response.validationError(res, "Validation failed", result.error.flatten().fieldErrors);
    }

    const { name, email, password } = result.data;

    try {
        const user = await User.create({ name, email, password });
        return response.createdSuccessfully(res, "User created successfully", user);
    } catch (error) {
        console.error(error);
        return response.serverError(res);
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; 
        // const user = await User.findOne({ email });
        res.status(200).json({ message: "User logged in successfully", user: {
            email,
            password,
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const logout = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; 
        // const user = await User.findOne({ email });
        res.status(200).json({ message: "User logged out successfully", user: {
            email,
            password,
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const me = async ( req: Request, res: Response ) => {
    try {
         
        res.status(200).json({ message: "User fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const refreshToken = async (req: Request, res: Response) => {
    try {
        // const user = await User.findOne({ refreshToken });
        res.status(200).json({ message: "Token refreshed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const verifyToken = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Token verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const resetPassword = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};