import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import Login from "./Components/Login";
import ForgetPass from "./Components/ForgetPass";
import Posts from "./Components/Posts";
import Profile from "./Components/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function App() {
  const navigate = useNavigate();
  const [loggedUserId, setLoggedUserId] = useState();
  const [userName, setUserName] = useState();
  const [LoginError, setLoginError] = useState(false);
  const [forgetErr, setForgetErr] = useState();
  const [registerError, setRegisterError] = useState();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
    const cookieValue = document.cookie;
    if (cookieValue) {
      const Decode = jwtDecode(cookieValue);
      setLoggedUserId(Decode.userId);
    }
  }, []);

  async function getAllPosts() {
    try {
      const Data = await axios.get("http://localhost:8000/posts");
      console.log(Data.data);
      setAllPosts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleCreatePost(formData) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/createPost",
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(Data.data);
      alert(Data.data);
      getAllPosts();
      navigate("/posts");
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleRegister(UserInfo) {
    try {
      const Data = await axios.post("http://localhost:8000/register", UserInfo);
      console.log(Data.data);

      if (Data.status == 200) {
        navigate("/login");
      }
    } catch (err) {
      setRegisterError(err.response.data);
      console.log(err);
    }
  }

  async function handleLogin(UserCredentials) {
    console.log(UserCredentials);
    try {
      const Data = await axios.post(
        "http://localhost:8000/login",
        UserCredentials,
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      if (Data.status == 200) {
        setUserName(Data.data);
        navigate("/");
      }
    } catch (err) {
      setLoginError(err.response.data);
      console.log(err.response.data);
    }
  }

  async function handleForgetPass(formData) {
    console.log(formData);
    try {
      const Data = await axios.put(
        "http://localhost:8000/forgetPass",
        formData
      );
      console.log(Data.data);
      if (Data.status == 200) {
        navigate("/login");
      }
    } catch (err) {
      setForgetErr(err.response.data);
      console.log(err.response.data);
    }
  }

  // async function handleGetCookies() {
  //   try {
  //     const Data = await axios.get("http://localhost:8000/getCokies", {
  //       withCredentials: true,
  //     });
  //     console.log(Data.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }

  //handleLikes:
  async function handleLike(PostId) {
    try {
      const Data = await axios.put(
        `http://localhost:8000/like/${PostId}`,
        { payload: "increment" },
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllPosts();
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  }

  async function handlePostComment(postId, body) {
    try {
      const Data = await axios.post(
        `http://localhost:8000/postComment/${postId}`,
        { body },
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllPosts();
    } catch (error) {
      alert("login first to comment on post", error.response.data);
    }
  }

  async function handleDeleteComment(postId, commentId) {
    try {
      const Data = await axios.delete(
        `http://localhost:8000/deleteComment?postId=${postId}&commentId=${commentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllPosts();
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleCommentLike(commentId, postId) {
    try {
      const Data = await axios.put(
        `http://localhost:8000/commentLike`,
        { commentId, postId },
        { withCredentials: true }
      );
      console.log(Data.data);
      getAllPosts();
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function getSpecificPost(postCategory) {
    try {
      const Data = await axios.get(
        `http://localhost:8000/getSpecificPost/${postCategory}`,
        {
          withCredentials: true,
        }
      );
      //console.log(Data.data);
      setAllPosts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function leastLiked() {
    try {
      const Data = await axios.get("http://localhost:8000/leastLiked");
      setAllPosts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function getMostLikedPost() {
    try {
      const Data = await axios.get("http://localhost:8000/mostLiked");
      console.log(Data.data);
      setAllPosts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleSearch(title) {
    try {
      const Data = await axios.get(`http://localhost:8000/search/${title}`);
      setAllPosts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home userName={userName} getSpecificPost={getSpecificPost} />
          }
        />
        <Route
          path="/signUp"
          element={
            <Register
              handleRegister={handleRegister}
              registerError={registerError}
            />
          }
        />
        <Route
          path="/createPost"
          element={<CreatePost handleCreatePost={handleCreatePost} />}
        />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} LoginError={LoginError} />}
        />

        <Route
          path="/posts"
          element={
            <Posts
              allPosts={allPosts}
              handleLike={handleLike}
              loggedUserId={loggedUserId}
              handlePostComment={handlePostComment}
              handleDeleteComment={handleDeleteComment}
              handleCommentLike={handleCommentLike}
              getMostLikedPost={getMostLikedPost}
              leastLiked={leastLiked}
              handleSearch={handleSearch}
            />
          }
        />
        <Route
          path="/ForgetPass"
          element={
            <ForgetPass
              handleForgetPass={handleForgetPass}
              forgetErr={forgetErr}
            />
          }
        />
        <Route
          path="/Profile/:userId"
          element={
            <Profile
              loggedUserId={loggedUserId}
              setAllPosts={setAllPosts}
              getAllPosts={getAllPosts}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
