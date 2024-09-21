/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Link } from "react-router-dom";
function Login({ handleLogin, LoginError }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleLoginForm(e) {
    e.preventDefault();

    try {
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      handleLogin(formData);
    } catch (error) {
      console.log("error in login");
    }
  }
  return (
    <body className="text-center">
      <main className="form-signin">
        <form onSubmit={handleLoginForm}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
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
              placeholder="Password"
              required
              ref={passwordRef}
              autoComplete="true"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {LoginError && <p style={{ color: "red" }}>{LoginError}</p>}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <Link to={"/ForgetPass"}>Forget Password</Link>
          <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
        </form>
      </main>
    </body>
  );
}

export default Login;
