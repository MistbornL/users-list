import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export const SignUp = () => {
  const userName = React.useRef();
  const password = React.useRef();
  const email = React.useRef();
  const url = "https://server-list-user.herokuapp.com";
  const [response, setResponse] = useState(false);
  let config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (response) {
    return (window.location.href = "/");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      !userName.current.value ||
      !password.current.value ||
      !email.current.value
    ) {
      alert("Please fill all the fields");
    }
    axios
      .post(
        `${url}/user/signup`,
        {
          username: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        config
      )

      .then(function (response) {
        response.status === 200 ? setResponse(true) : setResponse(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.request.response.includes("keyPattern")) {
          alert("Email already exists");
        } else if (!error.request.response.includes("ValidatorError")) {
          alert("fill all the fields");
        } else {
          alert("Something went wrong");
        }
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
              <label htmlFor="exampleInputUserName">User Name</label>
              <input
                ref={userName}
                type="text"
                className="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
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
              <label htmlFor="exampleInputPassword1">Password</label>
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
