/* eslint-disable react/prop-types */
// import { useRef, useState } from "react";
import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import ShowAllLikes from "./ShowAllLikes";
import { useRef } from "react";

// import { Button, Modal } from "react-bootstrap";

function Posts({
  allPosts,
  handleLike,
  loggedUserId,
  handlePostComment,
  handleDeleteComment,
  handleCommentLike,
  getMostLikedPost,
  CommentsOnPost,
  leastLiked,
  handleSearch,
}) {
  const likeFilterRef = useRef();
  const serchRef = useRef();
  let isUserPresent;
  function handleLiekFilter() {
    try {
      if (likeFilterRef.current.value == "mostLiked") {
        getMostLikedPost();
      } else {
        leastLiked();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLikeClick(PostId) {
    console.log("liked clicked", PostId);
    handleLike(PostId);
  }

  return (
    <div className="main">
      {/* upper part search and filter */}
      <div
        className="upper"
        style={{
          display: "flex",
          gap: "0 10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="filter">
          <select onChange={handleLiekFilter} ref={likeFilterRef}>
            like:
            <option value="leastLiked">Least Liked Posts</option>
            <option value="mostLiked">Most Liked Posts</option>
          </select>
        </div>
        {/* handling search */}
        <div style={{ display: "flex", width: "70%", flexWrap: "wrap" }}>
          <input type="text" style={{ width: "70%" }} ref={serchRef} />
          <button
            onClick={() => {
              if (serchRef.current.value !== "") {
                handleSearch(serchRef.current.value);
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
      {/* all post starting from here: */}
      <center>
        {allPosts.length > 0 ? (
          <>
            {allPosts.map((post) => {
              {
                isUserPresent = post.UsersLiked.find((user) => {
                  return user.UserId == loggedUserId;
                });
              }
              return (
                <div
                  className="card"
                  style={{
                    width: "50%",
                    marginTop: "20px",
                  }}
                  key={post.postId}
                >
                  <div
                    className="author"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <VscAccount />
                    <Link to={`/Profile/${post.UserId}`}>{post.UserName}</Link>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title " style={{ color: "#3f4145" }}>
                      {post.title}
                    </h2>
                    <img
                      className="card-img-top"
                      style={{ width: "50%" }}
                      src={`http://localhost:8000/${
                        ("Logic/uploads", post.ImagePath)
                      }`}
                      alt="image"
                    />

                    <p className="card-text">{post.body}</p>
                  </div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <button
                        style={{ border: "0px" }}
                        onClick={() => {
                          handleLikeClick(post.postId);
                        }}
                      >
                        {isUserPresent ? (
                          <VscThumbsupFilled />
                        ) : (
                          <VscThumbsup />
                        )}
                      </button>
                      : {post.like}
                      <br />
                      {/* showing all the users who liked on the blog: */}
                      <ShowAllLikes post={post} loggedUserId={loggedUserId} />
                    </li>

                    <li className="list-group-item">
                      Category:
                      <span style={{ color: "green" }}>{post.category}</span>
                    </li>
                    <li className="list-group-item">
                      Tags:
                      {post.tags.map((tag) => {
                        return (
                          <span key={tag} style={{ color: "blue" }}>
                            {tag}
                          </span>
                        );
                      })}
                    </li>
                    {/* creating modal for comment */}
                    <li className="list-group-item">
                      <Comments
                        post={post}
                        handlePostComment={handlePostComment}
                        handleDeleteComment={handleDeleteComment}
                        handleCommentLike={handleCommentLike}
                        CommentsOnPost={CommentsOnPost}
                        loggedUserId={loggedUserId}
                      />
                    </li>
                  </ul>
                </div>
              );
            })}
          </>
        ) : (
          <h1>Loading..</h1>
        )}
      </center>
    </div>
  );
}

export default Posts;
