// frontend/src/App.js

import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// PAGES
import MainPage from "./pages/Index.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ProfilePage from "./pages/Profile.jsx";
import FlowchartPage from "./pages/Flowchart.jsx";
import GenerateSchedulePage from "./pages/GenerateSchedule.jsx";
import CourseDnD from "./components/CourseDnD";
import PreferencesPage from "./pages/Preferences.jsx";
import SearchCoursesPage from "./pages/SearchCourses.jsx";

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
          <Route exact path="/generateSchedule" component={GenerateSchedulePage} />
          <Route exact path="/courseDNDTestingPurposes" component={CourseDnD} />
          <Route exact path="/preferences" component={PreferencesPage} />
          <Route exact path="/search_courses" component={SearchCoursesPage} />
          {/* <Route exact path="/404" component={MainPage} /> change to 404 page */}
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}
export default App;
