import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Expect token in headers: { token: "JWT_TOKEN_HERE" }
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, login required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request body
    req.body.userId = decoded.id;

    next(); // continue to the controller
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;