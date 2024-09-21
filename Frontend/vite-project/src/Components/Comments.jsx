import { useRef } from "react";
import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
function Comments({
  post,
  handlePostComment,
  handleDeleteComment,
  handleCommentLike,
  loggedUserId,
}) {
  const inputUserRef = useRef();
  let isUserLikedComment;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${post.postId}`}
        onClick={() => {
          console.log("postId: ", post.postId);
        }}
      >
        Comments
      </button>
      <div
        className="modal fade"
        id={post.postId}
        tabIndex="-1"
        aria-labelledby={post.postId}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={post.postId}>
                Comments section:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  console.log("postId: ", post.postId);
                }}
              ></button>
            </div>
            <div className="modal-body">
              {post.Comments.map((comment) => {
                {
                  isUserLikedComment = comment.UsersLikedComment.find(
                    (user) => {
                      return user.UserId == loggedUserId;
                    }
                  );
                }
                return (
                  <div className="body" key={comment.commentId}>
                    <div
                      className="userInfo"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <VscAccount />
                      <Link to={`/Profile/${comment.UserId}`}>
                        {comment.UserId}
                      </Link>
                    </div>
                    <div
                      className="body"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p> {comment.body}</p>
                      <div style={{ display: "flex" }}>
                        <button
                          style={{
                            display: "flex",
                            height: "24px",
                            border: "0px",
                          }}
                          onClick={() => {
                            handleCommentLike(comment.commentId, post.postId);
                          }}
                        >
                          {isUserLikedComment ? (
                            <>
                              <VscThumbsupFilled />
                            </>
                          ) : (
                            <VscThumbsup />
                          )}
                        </button>
                        :{comment.like}
                      </div>
                      <button
                        style={{
                          color: "red",
                          borderRadius: "4px",
                          height: "28px",
                        }}
                        onClick={() => {
                          handleDeleteComment(post.postId, comment.commentId);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                );
              })}
              <div
                className="modal-footer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="text"
                  style={{ width: "80%" }}
                  ref={inputUserRef}
                />
                <button
                  onClick={() => {
                    if (inputUserRef.current.value == "") {
                      alert("write something to send");
                    } else {
                      handlePostComment(
                        post.postId,
                        inputUserRef.current.value
                      );
                      inputUserRef.current.value = "";
                    }
                  }}
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
