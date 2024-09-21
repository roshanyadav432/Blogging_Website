const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("./Db_Connection/DB_Conn");
const PostModel = require("./Schemas/PostSchema");
const UserModel = require("./Schemas/UsersSchema");
//json we token:
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//middleware:
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

//secret key:
const secret_key = "hello_this_is_my_secret_key_for_all_users";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/"); //Specify the directory where files will be stored)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
app.get("/posts", async (req, res) => {
  try {
    const Data = await PostModel.find({});
    if (Data) {
      res.status(200).send(Data);
    } else {
      res.status(400).send("There is no posts to show");
    }
  } catch (error) {
    res.status(400).send("error while retrieving all posts");
  }
});

app.post("/createPost", upload.single("file"), async (req, res) => {
  try {
    const Token = req.cookies.Token;
    const verification = jwt.verify(Token, secret_key);
    console.log(verification);
    if (verification) {
      const { title, desc, tags, category } = req.body;
      const ImagePath = req.file.path;
      const UserName = verification.userName;
      const UserId = verification.userId;
      const Data = await new PostModel({
        postId: uuidv4(),
        ImagePath,
        UserName,
        UserId,
        title,
        category,
        body: desc,
        tags,
      });
      await Data.save();
      res.status(200).send("Blog Posted Successfully!!");
    } else {
      res.status(400).send("secret key is not matching!!");
    }
  } catch (error) {
    res.status(400).send(`login first post ${error}`);
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { userName, email, password } = req.body;
    const isEmailPresent = await UserModel.findOne({ email });
    // console.log(isEmailPresent);
    if (isEmailPresent) {
      res.status(400).send("email is already present");
    } else {
      const Data = await new UserModel({
        userId: uuidv4(),
        userName,
        email,
        password,
      });
      await Data.save();
      res.status(200).send("User Registered Successfully");
    }
  } catch (error) {
    res.status(400).status("error while registering");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const Data = await UserModel.findOne({ email });
    console.log(Data);
    if (Data) {
      console.log(Data.password);
      if (Data.password === password) {
        const token = jwt.sign(
          { userName: Data.userName, email: Data.email, userId: Data.userId },
          secret_key
        );
        res.cookie("Token", token);
        res.status(200).send(Data.userId);
      } else {
        res.status(401).send("wrong pass or email");
      }
    } else {
      res.status(400).send("No Account Matched!!");
    }
  } catch (error) {
    res.status(500).send("server error!!");
  }
});

app.put("/forgetPass", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const Data = await UserModel.findOne({ email });
    if (Data) {
      Data.password = password;
      await Data.save();
      res.status(200).send("updated successfully!!");
    } else {
      res.status(400).send("No account is registered with this email");
    }
  } catch (error) {
    res.status(500).send("server error!!");
  }
});

app.put("/like/:PostId", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    const postId = req.params.PostId;
    const verification = jwt.verify(Token, secret_key);
    if (verification) {
      console.log("PostId:", postId);
      console.log(verification.userId);
      const Data = await PostModel.findOne({ postId });
      console.log(Data.like);
      if (Data) {
        const isUserAlreadyLiked = Data.UsersLiked.find((user) => {
          return user.UserId == verification.userId;
        });
        if (isUserAlreadyLiked) {
          const newArray = Data.UsersLiked.filter((user) => {
            return verification.userId !== user.UserId;
          });
          Data.like -= 1;
          Data.liked = true;
          Data.UsersLiked = newArray;
          await Data.save();
          res.status(200).send("liked");
        } //user did not like:
        else {
          console.log("Liked", Data.liked);
          Data.like += 1;
          Data.liked = true;
          Data.UsersLiked.push({
            UserId: verification.userId,
          });
          await Data.save();
          res.status(200).send("liked");
        }
      }
    } else {
      res.status(400).send("No Post is Presend ");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(` Login first to like this post:,${error}`);
  }
});

app.post("/postComment/:postId", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      if (verification) {
        const postId = req.params.postId;
        const { body } = req.body;
        const UserId = verification.userId;
        const Data = await PostModel.findOne({ postId });
        if (Data) {
          console.log(Data);
          console.log(postId);
          Data.Comments.push({
            commentId: uuidv4(),
            UserId,
            body,
            like: 0,
          });
          await Data.save();
          res.status(200).send("you commented");
        } else {
          res.status(400).send("post not found");
        }
      }
    } else {
      res.status(400).send("login to comment");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// app.get("/getComments/:postId", async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     console.log(postId);
//     const Data = await PostModel.find({ postId });
//     if (Data) {
//       res.status(200).send(Data);
//     }
//   } catch (error) {
//     res.status(400).send.json(error);
//   }
// });

app.delete("/deleteComment", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      if (verification) {
        const commentId = req.query.commentId;
        const postId = req.query.postId;
        // console.log(postId);
        const Data = await PostModel.findOne({ postId });
        if (Data) {
          //checking whether users have commented or not
          const isUserCommented = Data.Comments.find((comment) => {
            return comment.UserId == verification.userId;
          });
          //if commented then
          if (isUserCommented) {
            const newArray = Data.Comments.filter((comment) => {
              if (comment.UserId == verification.userId) {
                //checking userId coz users can delete only his posts
                return comment.commentId !== commentId;
              } else {
                return comment;
              }
            });
            Data.Comments = newArray;
            await Data.save();
            res.status(200).send("deleted");
          }
          //if usersh ave not commented then:
          else {
            res.status(400).send("you can only delete your post");
          }
        } else {
          res.status(400).send("no post found");
        }
      }
    } else {
      res.status(400).send("login to delete");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

app.put("/commentLike", async (req, res) => {
  try {
    const token = req.cookies.Token;
    if (token) {
      const verification = jwt.verify(token, secret_key);
      if (verification) {
        const { commentId } = req.body;
        const { postId } = req.body;
        const UserId = verification.userId;
        const Data = await PostModel.findOne({ postId });
        if (Data) {
          const obj = Data.Comments.find((comment) => {
            return comment.commentId == commentId;
          });
          if (obj) {
            // console.log(obj);
            const usersAlreadyLiked = obj.UsersLikedComment.find((user) => {
              return user.UserId == verification.userId;
            });
            if (usersAlreadyLiked) {
              const newArray = obj.UsersLikedComment.filter((user) => {
                return user.UserId !== verification.userId;
              });

              obj.like -= 1;
              obj.UsersLikedComment = newArray;
              await Data.save();
              res.status(200).send("dislike");
            } else {
              obj.like += 1;
              obj.UsersLikedComment.push({ UserId });
              await Data.save();
              res.status(200).send("liked");
            }
          } else {
            res.status(400).send(`No comment found`);
          }
        } else {
          res.status(400).send(`No post found`);
        }
      }
    } else {
      res.status(400).send(`Login first to like the comment`);
    }
  } catch (error) {
    res.status(400).send(`error${error}`);
  }
});

app.get("/getSpecificPost/:category", async (req, res) => {
  try {
    const category = req.params.category;
    console.log(category);
    const Data = await PostModel.find({ category });
    if (Data.length > 0) {
      res.status(200).send(Data);
      console.log(Data);
    } else {
      res.status(400).send(`No posts are present for this category`);
    }
  } catch (error) {
    res.status(400).send("some error occured");
  }
});

app.get("/mostLiked", async (req, res) => {
  try {
    const Data = await PostModel.find({});
    const mostLikedPost = Data.sort((a, b) => {
      return b.like - a.like;
    });
    //console.log(mostLikedPost);
    res.send(mostLikedPost);
  } catch (error) {}
});

app.get("/leastLiked", async (req, res) => {
  try {
    const Data = await PostModel.find({});
    const leastLikedPost = Data.sort((a, b) => {
      return a.like - b.like;
    });
    //console.log(leastLikedPost);
    res.send(leastLikedPost);
  } catch (error) {}
});

//handling searching operations:
app.get("/search/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const newTitle = title.charAt(0).toUpperCase() + title.substring(1);
    console.log(newTitle);
    console.log(title.length);
    const Data = await PostModel.find({});
    const newArray = Data.filter((tit) => {
      return tit.title.includes(newTitle);
    });
    if (newArray.length > 0) {
      res.status(200).send(newArray);
    } else {
      res
        .status(400)
        .send("No posts present make sure to write name same as title of post");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/getProfile/:UserId", async (req, res) => {
  try {
    const UserId = req.params.UserId;
    //console.log("UserId: ", UserId);
    const Token = req.cookies.Token;
    // console.log("Token: ", UserId);
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      if (verification) {
        const loggedUser = verification.userId;
        const userId = UserId;
        const Data = await PostModel.find({ UserId });
        const Info = await UserModel.findOne({ userId });
        if (!Info) {
          res.status(400).send("No Uesr Exist");
        } else {
          const payload1 = {
            UserPostData: Data,
            UserInfo: Info,
            isMy: false,
          };
          const payload2 = {
            UserPostData: Data,
            UserInfo: Info,
            isMy: true,
          };
          if (loggedUser == UserId) {
            res.status(200).send(payload2);
          } else {
            res.status(200).send(payload1);
          }
        }
      } else {
        res.status(400).send("Not verified user");
      }
    } else {
      res.status(400).send("login to see profile");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//handle Follow:
app.put("/handleFollow", async (req, res) => {
  try {
    const { userId, loggedUserId } = req.body;
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      if (verification) {
        const UserData = await UserModel.findOne({ userId });
        const LoggedUser = await UserModel.findOne({ userId: loggedUserId });
        if (UserData) {
          UserData.followers.push({
            UserId: loggedUserId,
          });
          UserData.totalFollowers += 1;
          await UserData.save();
        }
        if (LoggedUser) {
          LoggedUser.following.push({
            UserId: userId,
          });
          LoggedUser.totalfollowings += 1;
          await LoggedUser.save();
          res.status(200).send("Following!!");
        }
      }
    } else {
      res.status(400).send("Login First");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.put("/handleUnfollow", async (req, res) => {
  try {
    const { userId, loggedUserId } = req.body;
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      if (verification) {
        const UserData = await UserModel.findOne({ userId });
        const LoggedUser = await UserModel.findOne({ userId: loggedUserId });
        if (UserData) {
          const newArray = UserData.followers.filter((user) => {
            return user.UserId !== loggedUserId;
          });
          UserData.followers = newArray;
          UserData.totalFollowers -= 1;
          await UserData.save();
        }
        if (LoggedUser) {
          const newArray = LoggedUser.following.filter((user) => {
            return user.UserId !== userId;
          });
          LoggedUser.following = newArray;
          LoggedUser.totalfollowings -= 1;
          await LoggedUser.save();
          res.status(200).send("UnFollowing!!");
        }
      }
    } else {
      res.status(400).send("Login First");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});
// app.get("/ShowWhoLikedOnPost", async (req, res) => {
//   //const postId = req.params.postId;
//   try {
//     const Token = req.cookies.Token;
//     const verification = jwt.verify(Token, secret_key);
//     const userId = verification.userId;
//     const Data = await UserModel.findOne({ userId });
//     if (Data) {
//       console.log(Data);
//       res.status(200).send(Data);
//     } else {
//       res.status(400).send("No users present");
//     }
//   } catch (error) {}
// });
app.listen(8000, () => {
  console.log("listening on port 8000");
});
