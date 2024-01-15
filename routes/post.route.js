const express = require("express");
const { postModel } = require("../model/post.model");

require("dotenv").config();
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const { device } = req.query;

    if (device) {
      let response = await postModel.find({ device, userId: req.body.userId });
      res.status(200).json({ msg: "all the post here", posts: response });
    } else {
      let response = await postModel.find({ userId: req.body.userId });
      res.status(200).json({ msg: "all the post here", posts: response });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

postRouter.post("/add", async (req, res) => {
  try {
    let createdPost = new postModel({ ...req.body });
    await createdPost.save();
    res.status(200).json({ msg: "post is created", post: req.body });
  } catch (error) {
    res.status(400).json({ error });
  }
});

postRouter.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    let post = await postModel.findOne({ _id });
    if (!post) {
      res.status(200).json({ msg: "Post Not found!" });
    } else {
      let deletedPost = await postModel.findByIdAndDelete({ _id });
      res
        .status(200)
        .json({ msg: "post deleted successfully!", deletedPost: post });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
postRouter.patch("/update/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    let post = await postModel.findOne({ _id });
    if (!post) {
      res.status(200).json({ msg: "Post Not found!" });
    } else {
      let deletedPost = await postModel.findByIdAndUpdate(
        { _id },
        { ...req.body }
      );
      res
        .status(200)
        .json({ msg: "post deleted successfully!", updatedPost: post });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
postRouter.get("/top", async (req, res) => {
  try {
    let post = await postModel.aggregate([
      { $sort: { no_of_comments: -1 } },
      { $limit: 3 },
    ]);

    res.status(200).json({ msg: "top 3 posts!", top_three_posts: post });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = {
  postRouter,
};
