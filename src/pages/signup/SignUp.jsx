import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export const SignUp = () => {
  const userName = React.useRef();
  const password = React.useRef();
  const email = React.useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/signup", {
        username: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <header>
        <h1 className="display1 text-center">Users List</h1>
      </header>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <div
          className="card bg-light text-black"
          style={{
            width: "40rem",
          }}
        >
          <form
            onSubmit={handleRegister}
            style={{
              padding: "2rem",
              boxSizing: "border-box",
              width: "40rem",
              alignItems: "center",
            }}
          >
            <div className="form-group">
              <label for="exampleInputEmail1">User Name</label>
              <input
                ref={userName}
                type="text"
                className="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                ref={email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                ref={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <p>
              Have An Account? <Link to="/">Log In</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
