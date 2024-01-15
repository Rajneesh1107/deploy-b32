const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel, blackListModel } = require("../model/user.model");
require("dotenv").config();
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "all users data" });
});

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(200).json({ msg: "User already exist, please login" });
    } else {
      const hash = bcrypt.hashSync(password, 5);
      const user = new userModel({ ...req.body, password: hash });
      await user.save();
      res
        .status(200)
        .json({ msg: "user is register successfully", user: req.body });
    }
  } catch (error) {
    res.status(200).json({ error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      res.status(200).json({ msg: "User is not exist, please register" });
    } else {
      const isPassCorrect = bcrypt.compareSync(password, userExist.password);
      if (isPassCorrect) {
        const token = jwt.sign(
          {
            _id: userExist._id,
            username: userExist.name,
          },
          `${process.env.ACCESS_KEY}`,
          { expiresIn: "7d" }
        );
        res.status(200).json({ msg: "login Success", token });
      }
    }
  } catch (error) {
    res.status(200).json({ error });
  }
});

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization.trim().split(" ")[1];
  try {
    if (token) {
      const blacklist = new blackListModel({ token });
      await blacklist.save();
      res.status(200).json({ msg: "Logged out" });
    } else {
      res.status(200).json({ msg: "invailid token" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = {
  userRouter,
};
