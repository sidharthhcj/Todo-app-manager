import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  const isLoggedIn = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!isLoggedIn) {
    return res.status(401).send("Session Expired");
  }
  const user = await User.findById(isLoggedIn.id);
  if (!user) {
    return res.status(401).send("User not logged in");
  }
  req.user = user;
  next();
};

export { authUser };
