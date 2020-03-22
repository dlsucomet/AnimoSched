import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Login.svg';
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props){
        super();

        this.state = {
            email: "",
            pass: "",
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    // test = () =>{
    //     console.log(this.state.token)
    //     axios.get('http://localhost:8000/api/auth/user/',
    //     {
    //         headers: {
    //             'X-CSRF-TOKEN': this.state.token,
    //         }
    //     })
    //     .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }
    
    state = {
        redirect: false
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

      handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.pass
        }
        this.props.handle_login(data);
        this.setRedirect();
      }
    render() {
      return (
        <div>
            <div class="sidenav">
                <a href="/">
                    <svg class="bi bi-backspace" width="3em" height="3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8.603 4h7.08a1 1 0 011 1v10a1 1 0 01-1 1h-7.08a1 1 0 01-.76-.35L3 10l4.844-5.65A1 1 0 018.603 4zm7.08-1a2 2 0 012 2v10a2 2 0 01-2 2h-7.08a2 2 0 01-1.519-.698L2.241 10.65a1 1 0 010-1.302L7.084 3.7A2 2 0 018.603 3h7.08z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M7.83 7.146a.5.5 0 000 .708l5 5a.5.5 0 00.707-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M13.537 7.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.707 0z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                <img class='img-responsive' id='lower' src={SidebarIMG}/>
            </div>

            <div class="sidenav-main">
                <div id="signup-message">
                    <h5>Not a member? <a href="/register">Sign up!</a></h5>
                </div>
                
                <div id="signup-form">
                    <form onSubmit={this.handleSubmit}>
                        Email
                        <br/>
                        <input name="email" onChange={e => this.handleChange(e)}></input>
                        <br/>
                        <br/>

                        Password
                        <br/>
                        <input type="password" name="pass" onChange={e => this.handleChange(e)}></input>
                        <br/>
                        <br/>

                        {this.renderRedirect()}
                        <input type="submit" class="btn btn-success" value="Login" />
                    </form>
                    
                    <br/>
                    
                    <p><a href="/reset_password">Forgot your password?</a></p>
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Login;