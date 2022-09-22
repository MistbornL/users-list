import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <header>
        <h1 className="display1 text-center">Users List</h1>
      </header>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <div
          class="card bg-light text-black"
          style={{
            width: "40rem",
          }}
        >
          <form
            style={{
              padding: "2rem",
              boxSizing: "border-box",
              width: "40rem",
              alignItems: "center",
            }}
          >
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <p>
              Don't Have An Account? <Link to="/sign-up">Sign Up</Link>
            </p>
            <button type="submit" class="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
