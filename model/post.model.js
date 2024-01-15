const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    device: {
      type: String,
      enum: ["Laptop", "Tablet", "Mobile"],
      require: true,
    },
    no_of_comments: { type: Number, require: true },
    userID: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = {
  postModel,
};

`
title ==> String
body ==> String
device ==> String
no_of_comments ==> Number

==> Where device is the one from which the post has been made, it can be "Laptop", "Tablet", "Mobile"
`;
