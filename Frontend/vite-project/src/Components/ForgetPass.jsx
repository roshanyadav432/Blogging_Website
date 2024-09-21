/* eslint-disable react/prop-types */
import { useRef } from "react";

function ForgetPass({ handleForgetPass, forgetErr }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  //function to handle form:
  function handleForgetForm(e) {
    e.preventDefault();
    try {
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      handleForgetPass(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <body className="text-center">
      <main className="form-signin">
        <form onSubmit={handleForgetForm}>
          <h1 className="h3 mb-3 fw-normal">Forget Password</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Enter your Email"
              required
              ref={emailRef}
              autoComplete="true"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Enter New Password"
              required
              ref={passwordRef}
              autoComplete="true"
            />
            <label htmlFor="floatingPassword">New Password</label>
          </div>
          {forgetErr && <p style={{ color: "red" }}>{forgetErr}</p>}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Update
          </button>
          <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
        </form>
      </main>
    </body>
  );
}

export default ForgetPass;
