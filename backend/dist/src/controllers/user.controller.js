import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/functions/hash.js";
import { generateAccessToken } from "../utils/functions/jwt.js";
export const signUp = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            });
            return;
        }
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
            role: "user",
            isVerified: false,
        });
        const accessToken = generateAccessToken({
            userId: newUser._id,
            email: newUser.email,
        });
        res.status(201).json({
            success: true,
            data: {
                user: newUser,
                token: accessToken
            }
        });
    }
    catch (err) {
        next(err);
    }
};
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
            return;
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
            return;
        }
        const accessToken = generateAccessToken({
            userId: user._id,
            email: user.email,
        });
        res.status(200).json({
            success: true,
            data: {
                user: user,
                token: accessToken
            }
        });
    }
    catch (err) {
        next(err);
    }
};
