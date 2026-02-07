// import jwt from "jsonwebtoken";
// import { User } from "../models/user.models.js";

// const authUser = async (req, res, next) => {
//   const { token } = req.cookies;
//   const isLoggedIn = jwt.verify(token, process.env.TOKEN_SECRET);
//   if (!isLoggedIn) {
//     return res.status(401).send("Session Expired");
//   }
//   const user = await User.findById(isLoggedIn.id);
//   if (!user) {
//     return res.status(401).send("User not logged in");
//   }
//   req.user = user;
//   next();
// };

// export { authUser };
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const authUser = async (req, res, next) => {
  // ✅ Allow CORS preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  const token = req.cookies?.token;

  // ✅ If token missing, DO NOT crash
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  next();
};

export { authUser };
