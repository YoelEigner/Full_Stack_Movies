import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "../main/Login";
import signup from "../main/NewUser";
import Movie from "./../main/movie";
import Member from '../main/Member';
import NavBar from "../main/Navbar";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const RequireAuth = ({ match: { path }, isAuthenticated }) =>
    !isAuthenticated ? (
    <Redirect to="/login" />
  ) : (
    <div>
        <Route exact path={`${path}/home`}  component={NavBar} />
        <Route exact path={`${path}/movie/:id/`} component={Movie} />
        <Route exact path={`${path}/user/:id/`}component={Member} />
    </div>
  );

export default connect(state => ({
  isAuthenticated: state.isAuthenticated
}))(RequireAuth);



