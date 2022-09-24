import axios from "axios";
import React, { useEffect } from "react";
import unblock from "../../assets/png-transparent-padlock-line-padlock-white-technic-castle.png";
import del from "../../assets/png-clipart-trash-can-illustration-computer-icons-icon-design-delete-button-miscellaneous-text.png";
export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const token = localStorage.getItem("token");
  console.log(users);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="App">
      <div className="d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-danger btn-lg">
          Block
        </button>
        <img
          style={{ width: "60px", height: "60px" }}
          src={unblock}
          alt="unblock"
        />
        <img style={{ width: "60px", height: "60px" }} src={del} alt="delete" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date Of Registration</th>
            <th scope="col"> Date of last authorization</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.dateRegister}</td>
                <td>{user.dateLastAuthorization}</td>
                <td>{user.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
