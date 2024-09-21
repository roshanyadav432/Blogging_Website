/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

function Register({ handleRegister, registerError }) {
  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const rePassRef = useRef();
  const [passerror, setPassError] = useState(false);
  function handleRegisterForm(e) {
    try {
      e.preventDefault();
      if (passRef.current.value !== rePassRef.current.value) {
        setPassError(true);
      } else {
        const formData = {
          userName: userRef.current.value,
          email: emailRef.current.value,
          password: passRef.current.value,
        };
        handleRegister(formData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <body className="text-center">
      <main className="form-signin">
        <form onSubmit={handleRegisterForm}>
          <h1 className="h3 mb-3 fw-normal">Please Register Here:</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="nameText"
              placeholder="name@example.com"
              autoComplete="true"
              required
              ref={userRef}
            />
            <label htmlFor="nameText"> User Name</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              autoComplete="true"
              required
              ref={emailRef}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="true"
              required
              ref={passRef}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {/* confirm password */}
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Password"
              autoComplete="true"
              required
              ref={rePassRef}
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>
          {/*Register button */}
          {passerror && (
            <p style={{ color: "red" }}>Both password are not same</p>
          )}
          {registerError && (
            <p style={{ color: "red" }}>Email is already present</p>
          )}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
          <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
        </form>
      </main>
    </body>
  );
}

export default Register;
