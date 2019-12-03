import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import MapPool from "./components/MapPool";

import authGuard from "./components/HOCs/authGuard";

import reducers from "./store/reducers";

// Grab token if it exists when we start the web app.
const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        // Initial state object.
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false
        },
        profile: {
          osuUsername: "",
          errorMessage: ""
        }
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/mappool" component={MapPool} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        <Route exact path="/profile" component={authGuard(Profile)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
