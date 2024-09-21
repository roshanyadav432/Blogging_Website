/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Followers from "./Followes";
import Followings from "./Followings";
function Profile({ loggedUserId, setAllPosts, getAllPosts }) {
  const navigate = useNavigate();
  const [myProfile, setMyProfile] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userPostData, setUserPostData] = useState([]);
  const { userId } = useParams();
  async function getProfile() {
    console.log("hello from getProfile");
    try {
      const Data = await axios.get(
        `http://localhost:8000/getProfile/${userId}`,
        {
          withCredentials: true,
        }
      );
      //  console.log(Data.data);
      setMyProfile(Data.data.isMy);
      setUserInfo(Data.data.UserInfo);
      setUserPostData(Data.data.UserPostData);
      getAllPosts();
    } catch (error) {
      alert(error.response.data);
    }
  }

  useEffect(() => {
    getProfile();
  }, [userId]);

  async function handleFollow(userId, loggedUserId) {
    try {
      const Data = await axios.put(
        `http://localhost:8000/handleFollow`,
        { userId, loggedUserId },
        { withCredentials: true }
      );
      // console.log(Data.data);
      alert(Data.data);
      getProfile();
    } catch (error) {
      alert(error);
    }
  }
  //handle Unfollow
  async function handleUnfollow(userId, loggedUserId) {
    try {
      const Data = await axios.put(
        `http://localhost:8000/handleUnfollow`,
        { userId, loggedUserId },
        { withCredentials: true }
      );
      // console.log(Data.data);
      alert(Data.data);
      getProfile();
    } catch (error) {
      alert(error);
    }
  }
  let isUserPresent = userInfo?.followers.find((user) => {
    return user.UserId == loggedUserId;
  });
  //console.log("isUserPresent: ", isUserPresent);
  return (
    <div>
      {userInfo ? (
        <>
          <div
            className="upper"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <img
              style={{ height: "120px", border: "2px solid red" }}
              src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
              alt="image"
            />

            <div
              className="followers"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5>
                <b>{userInfo.totalFollowers}</b>
              </h5>

              <Followers userId={userId} userInfo={userInfo} />
            </div>
            <div
              className="followers"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5>
                <b>{userInfo.totalfollowings}</b>
              </h5>
              <Followings userInfo={userInfo} />
            </div>
          </div>
          {/* {isUserPresent ? setIsFollow(true) : setIsFollow(false)} */}
          <b>Name: {userInfo.userName}</b>
          <br></br>
          <b>Id:{userInfo.userId}</b>
          <div>
            {/* logic to follow and unfollow */}
            {myProfile ? (
              <></>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {/* {isUserPresent ? setIsFollow(false) : setIsFollow(true)} */}
                  {isUserPresent ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleUnfollow(userId, loggedUserId);
                      }}
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={async () => {
                        handleFollow(userId, loggedUserId);
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </>
            )}
            <b>Posts by this User:</b>
          </div>
          {/*showing posts by users: */}
          {/* {console.log("isUserPresent", isUserPresent)} */}
          <div
            className="postsByUsers"
            style={{
              display: "flex",
              gap: "10px 10px",
              flexWrap: "wrap",
            }}
          >
            {userPostData.map((post) => {
              return (
                <div className="card" key={post._id} style={{ width: "10rem" }}>
                  <img
                    onClick={() => {
                      console.log([post]);
                      const SinglePost = [post];
                      setAllPosts(SinglePost);
                      navigate("/posts");
                    }}
                    style={{ width: "100%", height: "100%" }}
                    className="card-img-top"
                    src={`http://localhost:8000/${
                      ("Logic/uploads", post.ImagePath)
                    }`}
                    alt="image"
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
}

export default Profile;
