/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Followings({ userInfo }) {
  return (
    <>
      <h5 data-bs-toggle="modal" data-bs-target={`#1234`}>
        Followers
      </h5>
      <div
        className="modal fade"
        id="1234"
        tabIndex="-1"
        aria-labelledby="1234"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="1234">
                Users :
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {userInfo.following.map((user) => {
                return (
                  <div key={user._id}>
                    <Link to={`/Profile/${user.UserId}`}>{user.UserId}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Followings;
