/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Bussiness_Blog from "./Bussiness_Blog";
import Sport_Blog from "./Sport_Blog";
import Education_Blog from "./Education_Blog";
import News_Blogs from "./News_Blogs";
import Medical from "./Medical";
import Footer from "./Footer";
import { Link } from "react-router-dom";
function Home({ userName, getSpecificPost }) {
  useEffect(() => {
    setTimeout(() => {
      handleNext();
    }, 60000);
  });
  const Images = [
    {
      id: 0,
      BgImage: "https://cdn.wallpapersafari.com/64/81/SG3zxB.jpg",
    },
    {
      id: 1,
      BgImage: "https://images8.alphacoders.com/103/thumb-1920-1030893.jpg",
    },
    {
      id: 2,
      BgImage:
        "https://images.hdqwalls.com/wallpapers/colorful-sunset-minimal-4k-0q.jpg",
    },
    {
      id: 3,
      BgImage:
        "https://wallpaper-house.com/data/out/6/wallpaper2you_120001.jpg",
    },
  ];
  const [imageIndex, setImageIndex] = useState(0);

  function handleCategoryPost(category) {
    try {
      getSpecificPost(category);
      console.log("category", category);
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleNext() {
    setImageIndex((imageIndex) => {
      return imageIndex == Images.length - 1 ? 0 : imageIndex + 1;
    });
  }

  function handlePrev() {
    setImageIndex((imageIndex) => {
      return imageIndex == 0 ? Images.length - 1 : imageIndex - 1;
    });
  }
  return (
    <div>
      <h1>{userName}</h1>
      <div
        className="images"
        style={{
          backgroundImage: `url(${Images[imageIndex].BgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "70vh",
        }}
      >
        <div
          className="btns"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "92%",
          }}
        >
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div
          className="icons"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0px 4px",
            alignItems: "center",
          }}
        >
          {Images.map((img) => {
            return (
              <div key={img.id}>
                {imageIndex == img.id ? (
                  <input type="radio" checked={true} readOnly />
                ) : (
                  <input type="radio" checked={false} readOnly />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <center>
        <div
          className="Blogs"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px 12px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          <Link
            to={"/posts"}
            onClick={() => {
              handleCategoryPost("Bussiness");
            }}
          >
            <Bussiness_Blog />
          </Link>
          <Link
            to={"/posts"}
            onClick={() => {
              handleCategoryPost("Sports");
            }}
          >
            <Sport_Blog />
          </Link>

          <Link
            to={"/posts"}
            onClick={() => {
              handleCategoryPost("Education");
            }}
          >
            <Education_Blog />
          </Link>
          <Link
            to={"/posts"}
            onClick={() => {
              handleCategoryPost("News");
            }}
          >
            <News_Blogs />
          </Link>
          {/* medical */}
          <Link
            to={"/posts"}
            onClick={() => {
              handleCategoryPost("Medical");
            }}
          >
            <Medical />
          </Link>
        </div>
        <Footer />
      </center>
    </div>
  );
}

export default Home;
