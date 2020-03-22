// frontend/src/App.js

import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// PAGES
import MainPage from "./pages/Index.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";
import ResetPasswordDonePage from "./pages/ResetPasswordDone.jsx";
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
      id_num: '',
      colleges:{},
      degrees:{}
    };
  }

  // this.state.logged_in --> indicates if user is logged in or not

  componentDidMount(){
    if(this.state.logged_in){
      axios.get('http://localhost:8000/api/auth/user/',
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}` 
        },
        withCredentials: true
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          logged_in: true,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          id_num: ''
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  handle_login = (data, _callback) => {
    axios.post('http://localhost:8000/api/auth/login/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data);
        console.log(res.data.user.first_name);
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          id_num: ''
        })
        _callback(true);
    })
    .catch(error => {
        console.log(error.response)
        _callback(false);
    });
  }

  handle_register = (data, _callback) => {
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
        _callback(true);
    })
    .catch(error => {
        console.log(error.response)
        _callback(false);
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

  resetPasswordPage = () => {
    return (
      <ResetPasswordPage
        handle_resetPassword={this.handle_resetPassword}
      />
    );
  }

  resetPasswordDonePage = () => {
    return (
      <ResetPasswordDonePage
        handle_resetPasswordDone={this.handle_resetPasswordDone}
      />
    );
  }

  menu = () => {
    return (
      <Menu
        handle_logout={this.handle_logout}
        logged_in={this.state.logged_in}
        first_name={this.state.first_name}
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

  profilePage = () => {
    return (
      <ProfilePage
        menu={this.menu}
      />
    )
  }

  generateSchedulePage = () => {
    return (
      <GenerateSchedulePage
        menu={this.menu}
      />
    )
  }

  preferencesPage = () => {
    return (
      <PreferencesPage
        menu={this.menu}
      />
    )
  }

  searchCoursesPage = () => {
    return (
      <SearchCoursesPage
        menu={this.menu}
      />
    )
  }

  flowchartPage = () => {
    return (
      <FlowchartPage
        menu={this.menu}
      />
    )
  }

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.mainPage} />
          <Route exact path="/login" component={this.loginPage}/>
          <Route exact path="/register" component={this.registerPage} />
          <Route exact path="/reset_password" component={this.resetPasswordPage} />
          <Route exact path="/reset_password_done" component={this.resetPasswordDonePage} />
          {this.state.logged_in && 
          <Route exact path="/profile" component={this.profilePage} />
          }
          {this.state.logged_in && 
          <Route exact path="/flowchart" component={this.flowchartPage} />
          }
          {this.state.logged_in && 
          <Route exact path="/generateSchedule" component={this.generateSchedulePage} />
          }
          {this.state.logged_in && 
          <Route exact path="/preferences" component={this.preferencesPage} />
          }
          {this.state.logged_in && 
          <Route exact path="/search_courses" component={this.searchCoursesPage} />
          }
          {/* <Route exact path="/404" component={MainPage} /> change to 404 page */}
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}
export default App;
