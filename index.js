require("dotenv").config();
const express = require("express");
const { connection } = require("./connection/db.connection");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.route");
const { auth } = require("./middleware/auth.middleware");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is homepage!" });
});

app.use("/user", userRouter);
app.use("/posts", auth, postRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server is connected to DB");
    console.log(`server is running port at ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
