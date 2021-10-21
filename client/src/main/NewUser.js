import { Form, Button, Container, Row } from "react-bootstrap";
import Signup from "../BLs/CreateUser";
import { useState, useEffect } from "react";

const NewUser = (props) => {
  const [respMsg, setRespMsg] = useState();
  const [value, setValue] = useState(props.isSignup);
  const [permissions, setPermissions] = useState({ viewSubs: false, createSubs: false, delSubs: false, viewMovies: false, createMovies: false, delMovie: false });
  useEffect(() => {
    
    if (props.isSignup === undefined) {
      setValue("Signup");
      // setPermissions();
    }
  }, [props.isSignup]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {username, password, fName, lName, timeOut } = e.target.elements;
    Signup({ username: username.value, password: password.value, fName: fName.value, lName: lName.value, timeOut: timeOut.value }, permissions).then(
      (resp) => {
        if (resp.status === 200) {
          if(props.isSignup !== undefined){
            props.userAdded()
          }else{
            props.history.push("/");
          }
        } else {
          setRespMsg("Error " + String(resp.statusText));
        }
      }
    );
  };
  return (
    <div>
      <Container>
        <Row lg={2}>
          <Form onSubmit={(e) => handleSignUp(e)}>
            <h3>{value}</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>First name</Form.Label>
              <Form.Control name="fName" type="text" placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lName" type="text" placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Timeout</Form.Label>
              <Form.Control name="timeOut" type="text" placeholder="60" />
            </Form.Group>

            {props.isSignup && (
              <div>
                <label>
                  View Subscriptions : <input name="viewSubs" type="checkbox" onChange={(e) => setPermissions({...permissions, viewSubs : e.target.checked})}/>
                </label>
                <br />
                <label>
                  Create Subscriptions : <input name="createSubs" type="checkbox" onChange={(e) => setPermissions({...permissions, createSubs : e.target.checked})}/> 
                </label>
                <br />
                <label>
                  Delete Subscriptions : <input name="delSubs" type="checkbox" onChange={(e) => setPermissions({...permissions, delSubs : e.target.checked})}/>
                </label>
                <br />
                <label>
                  View Movies : <input name="viewMovies" type="checkbox" onChange={(e) => setPermissions({...permissions, viewMovies : e.target.checked})}/>
                </label>
                <br />
                <label>
                  Create Movies : <input name="createMovies" type="checkbox" onChange={(e) => setPermissions({...permissions, createMovies : e.target.checked})}/>
                </label>
                <br />
                <label>
                  Delete Movies : <input name="delMovie" type="checkbox" onChange={(e) => setPermissions({...permissions, delMovie : e.target.checked})}/>
                </label>
                <br />
              </div>
            )}
            <Button variant="primary" type="submit">
              {value}
            </Button>
            <br />
            <br />
          </Form>
          <br />
          <br />
          {respMsg}
        </Row>
      </Container>
    </div>
  );
};

export default NewUser;
