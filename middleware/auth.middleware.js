require("dotenv").config();
const jwt = require("jsonwebtoken");
const { blackListModel } = require("../model/user.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.trim().split(" ")[1];

  try {
    const isLogout = await blackListModel.findOne({ token });
    if (isLogout) {
      res.status(200).json({ msg: "Please login first" });
    } else {
      const decoded = jwt.verify(token, `${process.env.ACCESS_KEY}`);
      if (decoded) {
        req.body.userID = decoded._id;
        req.body.username = decoded.username;
        next();
      } else {
        res.status(200).json({ msg: "You are not authorised" });
      }
    }
  } catch (error) {
    res.status(200).json({ error });
  }
};

module.exports = {
  auth,
};
