/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

function CreatePost({ handleCreatePost }) {
  const [file, setFile] = useState(null);
  const titleRef = useRef();
  const descRef = useRef();
  const tagsRef = useRef();
  const selectRef = useRef();

  function handleFile(e) {
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }
  function handleForm(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("desc", descRef.current.value);
      formData.append("tags", tagsRef.current.value.split(" "));
      formData.append("file", file);
      formData.append("category", selectRef.current.value);
      handleCreatePost(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="card text-center">
      <div className="card-body">
        <form onSubmit={handleForm}>
          <div className="mb-3">
            <label htmlFor="exampleInputFile" className="form-label">
              <h1 className="navbar-brand"> Add Post Image</h1>
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputFile"
              accept=".jpg,.jpeg"
              required
              onChange={(e) => {
                handleFile(e);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputTitle" className="form-label">
              <h1 className="navbar-brand"> Title</h1>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputTitle"
              placeholder="specift Title ofpost"
              required
              ref={titleRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputDesc" className="form-label">
              <h1 className="navbar-brand"> Description</h1>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputDesc"
              placeholder="write the body of your post"
              required
              ref={descRef}
            />
          </div>
          {/* select category of post: */}
          <div className="mb-3">
            <label htmlFor="exampleInputSelect" className="form-label">
              <h1 className="navbar-brand"> select category</h1>
            </label>
            <select
              className="form-control"
              id="exampleInputSelect"
              required
              ref={selectRef}
            >
              <option>Sports</option>
              <option>Bussiness</option>
              <option>News</option>
              <option>Education</option>
              <option>Medical</option>
            </select>
          </div>
          {/* ends here: */}
          <div className="mb-3">
            <label htmlFor="exampleInputTags" className="form-label">
              <h1 className="navbar-brand"> Tags</h1>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputTags"
              required
              placeholder="specify tags with space"
              ref={tagsRef}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
