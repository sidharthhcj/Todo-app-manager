import express from "express";
import { validate } from "../utils/validate.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Password is wrong");
  }

  let token = await user.generateToken(user._id);
  return res
    .status(201)
    .cookie("token", token, { expires: process.env.TOKEN_EXIRY })
    .send("Logged In");
});
authRouter.post("/signup", async (req, res) => {
  validate(req);
  let { name, email, password } = req.body;
  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    return res.status(401).send("User exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const newUser = await createdUser.save();
  res.status(201).send(newUser);
});

export { authRouter };
