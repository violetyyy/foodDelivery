import { verifyAccessToken } from "../utils/functions/jwt.js";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .json({ success: false, message: "Access token required" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Access token required" });
    }
    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid access token" });
    }
};
