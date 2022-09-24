import axios from "axios";
import React, { useEffect } from "react";

export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const token = console.log(users);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/", {
        headers: {
          "content-type": "application/json",
          // "Authorization":
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <div className="d-flex justify-content-space-between align-items-center">
        <button type="button" class="btn btn-danger btn-lg">
          Block
        </button>
        <img src="" alt="unblock" />
        <img src="" alt="delete" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date Of Registration</th>
            <th scope="col"> Date of last authorization</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
