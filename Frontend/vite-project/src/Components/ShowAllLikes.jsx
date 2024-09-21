import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
function ShowAllLikes({ post }) {
  return (
    <div>
      <button
        style={{
          border: "0px",
          backgroundColor: "white",
          color: "#139428",
        }}
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#${post._id}`}
      >
        See who liked this Blog:
      </button>

      <div
        className="modal fade"
        id={post._id}
        tabIndex="-1"
        aria-labelledby={post._id}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={post._id}>
                All the Users who liked this Blog:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {post.UsersLiked.map((user) => {
                return (
                  <div
                    className="body"
                    key={user.UserId}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {/* {user.UserId} */}
                    <VscAccount />
                    <Link to={`/Profile/${user.UserId}`}>{user.UserId}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAllLikes;
