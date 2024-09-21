/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Followes({ userId, userInfo }) {
  return (
    <>
      <h5 data-bs-toggle="modal" data-bs-target={`#123`}>
        Followers
      </h5>
      <div
        className="modal fade"
        id="123"
        tabIndex="-1"
        aria-labelledby="123"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="123">
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
              {userInfo.followers.map((user) => {
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

export default Followes;
