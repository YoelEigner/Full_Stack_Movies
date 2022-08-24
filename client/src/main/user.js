import { useEffect, useState } from "react";
import { Card, Container, Col, Row, Alert } from "react-bootstrap";
import ChangeUsers from "../BLs/EditUsers";
import DeleteUser from './../BLs/DeleteUsers';
import HeadersConf from './../configs/APIConfig';
import { useDispatch } from 'react-redux';

const User = (props) => {
  const [user, setUsers] = useState(props.user);
  const [edit, setEdit] = useState(true);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [msg, setMsg] = useState("")
  const [alertvisible, setAlertvisible]= useState(true)
  const dispatch = useDispatch()
  const handleDelete = (e) => {
    DeleteUser(props.user.id)
    props.delete(props.user.id)

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, created, timeOut, viewSubs, createSubs, delSubs, viewMovies, createMovies, delMovie, admin } = e.target.elements;
    const tempName = name.value.split(" ");
    let user = {
      id : props.user.id, fName: tempName[0], lName: tempName[1], created : created.value,timeOut: timeOut.value,};
    let UserLogin = {username: username.value,};
    let userPermissions = {id: props.user.id,permissions: {admin : admin.checked, viewSubs: viewSubs.checked,createSubs: createSubs.checked
      ,delSubs: delSubs.checked,viewMovies: viewMovies.checked,createMovies: createMovies.checked,delMovies: delMovie.checked,},};
    let resp = await ChangeUsers(props.user.id, userPermissions, user, UserLogin);
    if(resp.status === 200){
      dispatch({type : "PERMISSIONS" , payload : userPermissions.permissions})
      setMsg("User has been updated!")
      setAlertvisible(false)
      window.setTimeout(()=>{setAlertvisible(true)},8000)
    }
    else{
      setMsg(resp.status)
    }
    setEdit(!edit)
    setHiddenBtn(!hiddenBtn);

  };
  const handleCancel = () => {
    setEdit(!edit);

    setHiddenBtn(!hiddenBtn);
  };
  const handleEdit = () => {
    setEdit(!edit);
    setHiddenBtn(!hiddenBtn);
  }

  return (
    <div>
      <Container>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Card style={{ width: "30rem" }}>
            Name : <input name="name" disabled={edit} defaultValue={user.fName + " " + user.lName} />
            Username : <input name="username" disabled={edit} defaultValue={user.username} />
            Session Timeout :<input name="timeOut" disabled={edit} defaultValue={user.timeOut} />
            Date Created : <input name="created" disabled={true} defaultValue={user.created} />
            Permissions :
            {user.permissions.map((x, index) => {
              return (
                <div key={index}>
                  <label>
                    Admin : <input name="admin" type="checkbox" disabled={edit} defaultChecked={x.admin} />
                  </label>
                  <br />
                  <label>
                    View Subscriptions : <input name="viewSubs" type="checkbox" disabled={edit} defaultChecked={x.viewSubs} />
                  </label>
                  <br />
                  <label>
                    Create Subscriptions : <input name="createSubs" type="checkbox" disabled={edit} defaultChecked={x.createSubs} />
                  </label>
                  <br />
                  <label>
                    Delete Subscriptions : <input name="delSubs" type="checkbox" disabled={edit} defaultChecked={x.delSubs} />
                  </label>
                  <br />
                  <label>
                    View Movies : <input name="viewMovies" type="checkbox" disabled={edit} defaultChecked={x.viewMovies} />
                  </label>
                  <br />
                  <label>
                    Create Movies : <input name="createMovies" type="checkbox" disabled={edit} defaultChecked={x.createMovies} />
                  </label>
                  <br />
                  <label>
                    Delete Movies : <input name="delMovie" type="checkbox" disabled={edit} defaultChecked={x.delMovie} />
                  </label>
                  <br />
                </div>
              );
            })}
            <br />
            <Row>
              <Col>
                <input type="button" value="Edit" hidden={!hiddenBtn} onClick={() => handleEdit()} />
              </Col>
              <Col>
                <input type="button" value="Delete" hidden={!hiddenBtn} onClick={(e) => handleDelete(e)} />
              </Col>
            </Row>
            {/* ////test */}
            <Row>
              <Col>
                <input type="button" hidden={hiddenBtn} value="Cancel" onClick={() => handleCancel()} />
              </Col>
              <Col>
                <input type="submit" hidden={hiddenBtn} value="Update" />
              </Col>
            </Row>
            <br />
            <Col>       
                <Alert hidden={alertvisible} variant={"success"}>
                  {msg}
            </Alert>
            </Col>

          </Card>
        </form>
        <br />
      </Container>
    </div>
  );
};

export default User;
