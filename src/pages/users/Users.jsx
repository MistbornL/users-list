import axios from "axios";
import React, { Fragment, useEffect } from "react";
import unblock from "../../assets/png-transparent-padlock-line-padlock-white-technic-castle.png";
import del from "../../assets/png-clipart-trash-can-illustration-computer-icons-icon-design-delete-button-miscellaneous-text.png";
import { useParams } from "react-router-dom";
export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const token = localStorage.getItem("token");
  const { userId } = useParams();
  const url = "https://server-list-user.herokuapp.com";
  console.log(userId);
  useEffect(() => {
    axios

      .get(`${url}/user/signup/users/`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDelete = () => {
    const selectedUsers = users.filter((user) => user.isChecked);

    selectedUsers.forEach((user) => {
      axios
        .delete(`${url}/users/delete/${user.id}`, {
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

      if (user.id === userId) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
    const updatedUsers = users.filter((user) => !user.isChecked);
    setUsers(updatedUsers);
  };

  const handleBlock = () => {
    const selectedUsers = users.filter((user) => user.isChecked);

    selectedUsers.forEach((user) => {
      axios
        .post(
          `${url}/user/signup/block/${user.id}`,
          {},
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      if (user.id === userId) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
    const updatedUsers = users.map((user) => {
      if (user.isChecked) {
        return { ...user, status: "Blocked" };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };

  const handleUnblock = () => {
    const selectedUsers = users.filter((user) => user.isChecked);

    selectedUsers.forEach((user) => {
      axios
        .post(
          `${url}/user/signup/unlock/${user.id}`,
          {},
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const updatedUsers = users.map((user) => {
      if (user.isChecked) {
        return { ...user, status: "offline" };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <h1 style={{ cursor: "pointer" }} onClick={handleLogOut}>
          LogOut
        </h1>
      </nav>
      <div className="App">
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={handleBlock}
            type="button"
            className="btn btn-danger btn-lg"
          >
            Block
          </button>
          <img
            style={{ cursor: "pointer", width: "60px", height: "60px" }}
            src={unblock}
            onClick={handleUnblock}
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
    </>
  );
};
