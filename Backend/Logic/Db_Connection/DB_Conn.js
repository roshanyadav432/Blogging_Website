const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Post")
  .then((res) => {
    console.log("connected!!");
  })
  .catch(() => {
    console.log("error while connecting");
  });
