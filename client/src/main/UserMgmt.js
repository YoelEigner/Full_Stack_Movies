import { useEffect, useState } from "react";
import Users from "../BLs/GetUserData";
import axios from "axios";
import { Card, Container, Col, Row, Alert } from "react-bootstrap";
import User from "./user";
import NewUser from "./NewUser";

const UserMgmt = () => {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(true);
  const [msg, setMsg] = useState("");
  const [alertvisible, setAlertvisible] = useState(true);
  const [addUser, setAdduser] = useState(false);

  const delUser = (id) => {
    let userIndex = users.findIndex((x) => x.id === id);
    let usersTemp = users.splice(userIndex, 1);

    setUsers([...users]);
    setMsg("User deleted!");
    setAlertvisible(false);
    window.setTimeout(() => {
      setAlertvisible(true);
    }, 8000);
  };
  const getUsers = () => {
    Users().then((data) => {
      setUsers(data.data);
    });
  };
  const handleNewUser = () => {
    setAdduser(!addUser);
    getUsers()
  };

  useEffect(() => {
    getUsers()
  }, []);
  return (
    <div>
      User Managment
      <br />
      <br />
      <br />
      <Container>
        <Row style={{ width: "20rem" }}>
          <Col>
            <input type="button" value="All Users" onClick={() => setAdduser(false)} />
          </Col>
          <Col>
            <input type="button" value="Add User" onClick={() => setAdduser(true)} />
          </Col>
        </Row>
      </Container>
      <br />
      <Alert hidden={alertvisible} variant={"success"}>
        {msg}
      </Alert>
      {!addUser &&
        users.map((x) => {
          return (
            <div key={x.id}>
              <Container>
                <User user={x} delete={(data) => delUser(data)} />
                <br />
              </Container>
            </div>
          );
        })}
      {addUser && (
        <NewUser
          isSignup={"Add User"}
          userAdded={() => {
            handleNewUser();
          }}
        />
      )}
    </div>
  );
};

export default UserMgmt;
