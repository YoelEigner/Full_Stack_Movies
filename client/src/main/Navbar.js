import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navbar, Nav, Col, Container, Row } from "react-bootstrap";
import Movies from "./Movies";
import UserMgmt from "./UserMgmt";

import SubscriptionsId from './SubscriptionsById'

const NavBar = (props) => {
  const storeData = useSelector((state) => state);
  const [user] = useState(storeData.user);
  const [usrMgmt, setUsrMgmt] = useState(false);
  const [movies, setMovies] = useState(true);
  const [subs, setSubs] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState()


  const handleMovieClick = async () => {
    setUsrMgmt(false);
    setMovies(true);
    setSubs(false);
  };
  const handleUserClick = () => {
    setUsrMgmt(true);
    setMovies(false);
    setSubs(false);
  };
  const handleSubsClick = () => {
    setUsrMgmt(false);
    setMovies(false);
    setSubs(true);
  };
  const handleSignOutClick = () => {
    dispatch({ type: "AUTH", payload: false });
    dispatch({ type: "MOVIES", payload: "" })
    props.history.push("/");
  };

  return (
    <div>
      <Nav
        className="sub-nav"
        activeKey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
      >
        <Navbar fixed="top" bg="dark" variant="dark" margin-top="100rem">
          <Container>
            {storeData.permissions.viewMovies && <Navbar.Brand eventkey="home" onClick={() => handleMovieClick()}>Movies</Navbar.Brand>}
            <Nav className="me-auto">
              {storeData.permissions.admin  &&  <Nav.Link eventkey="userMgmt" onClick={() => handleUserClick()}>User Managment</Nav.Link>}
              {storeData.permissions.viewSubs && <Nav.Link eventkey="subs" onClick={() => handleSubsClick()}>Subscriptions</Nav.Link>}

              <Nav.Link onClick={() => handleSignOutClick()}>Sign Out</Nav.Link>
            </Nav>

            <Nav>
              <Row>
                <Col>
                  <Navbar.Text>Name : {user.username}</Navbar.Text>
                </Col>
              </Row>
            </Nav>
          </Container>
        </Navbar>
        <br />
        <br />
        <br />
        {props.children}
        <br />
        <br />
        <br />

      </Nav>

      {usrMgmt && storeData.permissions.admin &&<UserMgmt />}
      {movies &&  storeData.permissions.viewMovies && <Movies />}
      {subs && storeData.permissions.viewSubs && <SubscriptionsId />}
    </div>
  );
};

export default NavBar;
