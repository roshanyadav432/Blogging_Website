const mongoose = require("mongoose");
const MySchema = mongoose.Schema({
  userId: String,
  userName: String,
  email: String,
  password: String,
  following: [{ UserId: String }],
  followers: [{ UserId: String }],
  totalFollowers: { type: Number, default: 0 },
  totalfollowings: { type: Number, default: 0 },
});

const UserModel = new mongoose.model("User", MySchema);
module.exports = UserModel;
