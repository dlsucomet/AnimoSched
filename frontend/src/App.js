// frontend/src/App.js

import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// PAGES
import MainPage from "./pages/Index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import FlowchartPage from "./pages/Flowchart";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/flowchart" component={FlowchartPage} />
          {/* <Route exact path="/404" component={MainPage} /> change to 404 page */}
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}
export default App;
