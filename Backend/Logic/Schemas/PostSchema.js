const mongoose = require("mongoose");
const MySchema = mongoose.Schema({
  postId: String,
  ImagePath: String,
  UserName: String,
  UserId: String,
  title: String,
  body: String,
  category: String,
  like: { type: Number, default: 0 },
  UsersLiked: [
    {
      UserId: String,
    },
  ],

  tags: [],
  Comments: [
    {
      commentId: String,
      UserId: String,
      body: String,
      like: { type: Number, default: 0 },
      UsersLikedComment: [{ UserId: String }],
    },
  ],
});

const PostModel = new mongoose.model("Post", MySchema);
module.exports = PostModel;
