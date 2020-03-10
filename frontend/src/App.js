// frontend/src/App.js

import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// PAGES
import MainPage from "./pages/Index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          {/* <Route exact path="/404" component={MainPage} /> change to 404 page */}
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}
export default App;
