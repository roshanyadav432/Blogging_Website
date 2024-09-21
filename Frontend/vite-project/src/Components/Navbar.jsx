import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand" style={{ color: "green" }}>
            Blogger.com
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link"
                  activeclassname="active-link"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/createPost"}
                  className="nav-link"
                  activeclassname="active-link"
                >
                  Create_Post
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/posts"}
                  className="nav-link"
                  activeclassname="active-link"
                >
                  Posts
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="nav-link"
                  activeclassname="active-link"
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/signUp"}
                  className="nav-link"
                  activeclassname="active-link"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
