import axios from "axios";
import React, { Fragment, useEffect } from "react";
import unblock from "../../assets/png-transparent-padlock-line-padlock-white-technic-castle.png";
import del from "../../assets/png-clipart-trash-can-illustration-computer-icons-icon-design-delete-button-miscellaneous-text.png";
export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const token = localStorage.getItem("token");
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

  const handleChecked = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    if (name === "allSelect") {
      const updatedUsers = users.map((user) => {
        return {
          ...user,
          isChecked: isChecked,
        };
      });
      setUsers(updatedUsers);
    } else {
      const updatedUsers = users.map((user) => {
        if (user.username === name) {
          return { ...user, isChecked: isChecked };
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
    }
  };

  const handleDelete = () => {
    const selectedUsers = users.filter((user) => user.isChecked);

    selectedUsers.forEach((user) => {
      axios
        .delete(`http://localhost:5000/users/delete/${user.id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const updatedUsers = users.filter((user) => !user.isChecked);
    setUsers(updatedUsers);
  };
  return (
    <div className="App">
      <div className="d-flex justify-content-between align-items-center">
        <button type="button" className="btn btn-danger btn-lg">
          Block
        </button>
        <img
          style={{ width: "60px", height: "60px" }}
          src={unblock}
          alt="unblock"
        />
        <img
          onClick={handleDelete}
          style={{ cursor: "pointer", width: "60px", height: "60px" }}
          src={del}
          alt="delete"
        />
      </div>
      <table className="table ">
        <thead>
          <tr>
            <input
              className="form-check-input"
              type="checkbox"
              name="allSelect"
              checked={
                users.filter((user) => user?.isChecked !== true).length < 1
              }
              onChange={handleChecked}
              id="flexCheckDefault"
            />

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
              <Fragment key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={user.username}
                  checked={user?.isChecked || false}
                  onChange={handleChecked}
                  id="flexCheckDefault"
                />

                <tr>
                  <th scope="row"></th>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.dateRegister}</td>
                  <td>{user.dateLastAuthorization}</td>
                  <td>{user.status}</td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
