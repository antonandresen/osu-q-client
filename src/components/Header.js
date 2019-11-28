import React, { Fragment, Profiler } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions";
import Profile from "./Profile";

const Header = props => {
  const signOut = () => {
    props.SignOut();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ marginBottom: "30px" }}
    >
      <Link className="navbar-brand" to="/">
        osu-q
      </Link>

      <div className="collapse navbar-collapse">
        {/*
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        */}

        <ul className="nav navbar-nav ml-auto">
          {!props.isAuthenticated ? (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/signin" onClick={signOut}>
                  Sign Out
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, actions)(Header);
