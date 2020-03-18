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
import PreferencesPage from "./pages/Preferences.jsx";
import SearchCoursesPage from "./pages/SearchCourses.jsx";
import Menu from "./components/Menu.jsx";

import axios from "axios";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      first_name: '',
      last_name: '',
      id_num: ''
    };
  }

  componentDidMount(){
    if(this.state.logged_in){
      axios.get('http://localhost:8000/api/auth/user',
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}` 
        }
      })
      .then(res => {
        console.log(res.data)
      })
    }
  }

  handle_login = (data) => {
    axios.post('http://localhost:8000/api/auth/login/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          id_num: ''
        })
    })
    .catch(error => {
        console.log(error.response)
    });
  }

  handle_register = (data) => {
    axios.post('http://localhost:8000/api/auth/registration/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          id_num: ''
        })
    })
    .catch(error => {
        console.log(error.response)
    });
  }

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({
      logged_in: false,
      first_name: '',
      last_name: '',
      id_num: '',
    });
  }

  loginPage = () => {
    return (
      <LoginPage
        handle_login={this.handle_login}
      />
    );
  }

  registerPage = () => {
    return (
      <RegisterPage
        handle_register={this.handle_register}
      />
    );
  }

  menu = () => {
    return (
      <Menu
        logged_in={this.state.logged_in}
      />
    )
  }

  mainPage = () => {
    return (
      <MainPage
        menu={this.menu}
      />
    )

  }

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={this.mainPage} />
          <Route exact path="/login" component={this.loginPage}/>
          <Route exact path="/register" component={this.registerPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/flowchart" component={FlowchartPage} />
          <Route exact path="/generateSchedule" component={GenerateSchedulePage} />
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
