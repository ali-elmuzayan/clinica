import { Request, Response } from "express"; 


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body; 
        // const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User created successfully", user: {
            name,
            email,
            password,
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
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