import { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authenticate from "../utils/login";
import GetMovies from "../BLs/GetMovies";
import GetSubscribers from "./../BLs/GetSubscribers";
import GetMembers from '../BLs/GetMembers';
import Users from "../BLs/GetUserData";

const Login = (props) => {
  const [loginmsg, setLoginmsg] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    const { username, password } = e.target.elements;
    e.preventDefault();
    authenticate({ username: username.value, password: password.value })
      .then(async (data) => {
        try {
          let user = data.data.resp.find((x) => x.username === username.value);
          user.authenticated = true;
          dispatch({ type: "USER", payload: user });
          dispatch({ type: "AUTH", payload: true });
  
          let getMovies = await GetMovies()
          let getMembers = await GetMembers()
          let getSubs = await GetSubscribers()
          //movies
          dispatch({ type: "MOVIES", payload: getMovies.data });
          let genres = [];
          getMovies.data.forEach((genresList) => {
          genresList.genres.forEach((x) => genres.push(x));
          });
          let uniq = [...new Set(genres)];
          dispatch({ type: "GENRES", payload: uniq });
          //members
          dispatch({ type: "MEMBERS", payload: getMembers.data });
          //subs
          dispatch({type : "SUBS", payload : getSubs.data})
          //permissions
          let userData = await Users()
          let permissions = userData.data.find(x => x.id === user._id)
          dispatch({ type : "PERMISSIONS" , payload : permissions.permissions[0]})
          props.history.push("/protected/home");
          
        } catch (error) {
          setLoginmsg(String(error))
        }
 
      }).catch((err) => 
      {
        setLoginmsg(String(err))
      });
  };
  // const deleteCache = () => {
  //   dispatch({ type: "MOVIES", payload: "" });
  //   dispatch({ type: "MEMBERS", payload: "" });
  //   dispatch({ type: "GENRES", payload: "" });
  //   dispatch({ type: "USER", payload: "" });
  //   dispatch({ type: "AUTH", payload: "" })
  //   dispatch({ type: "SUBS", payload: "" })
  //   console.log(storeData)
  // };
  return (
    <div>
      <Container>
        <Row lg={2}>
          <Form onSubmit={(e) => handleLogin(e)}>
            <h1>Log in</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="username" type="username" placeholder="User Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {/* <input type="button" value="delete cache" onClick={() => deleteCache()} /> */}

            <br />
            <br />

            <Link to="/signup">Create Account?</Link>
          </Form>
          <br />
          <br />
          {loginmsg}
        </Row>
      </Container>
    </div>
  );
};

export default Login;
