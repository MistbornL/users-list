import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const [response, setResponse] = useState(false);
  const [userId, setUserId] = useState("");

  if (response) {
    window.location.href = `/users/${userId}`;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        if (res.status === 200) {
          setResponse(true);
          setUserId(res.data.userId);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.request.response.includes("blocked")) {
          alert("User is blocked");
        } else if (err.request.response.includes("password")) {
          alert("Password is incorrect");
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
            onSubmit={handleLogin}
            style={{
              padding: "2rem",
              boxSizing: "border-box",
              width: "40rem",
              alignItems: "center",
            }}
          >
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
              Don't Have An Account? <Link to="/sign-up">Sign Up</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
