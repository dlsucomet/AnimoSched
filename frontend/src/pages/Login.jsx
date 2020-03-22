import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Login.svg';
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props){
        super();

        this.state = {
            fields: {},
            errors: {}
        }

    }

    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }

    handleValidation = () => {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      // EMAIL
      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Required Email"
      }

      if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Invalid Email";
        }
      }

      // PASSWORD
      if(!fields["pass"]){
        formIsValid = false;
        errors["pass"] = "Required Password"
      }

      this.setState({errors: errors});
      return formIsValid;
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
        if(this.handleValidation()){
          const data = {
              email: this.state.fields["email"],
              password: this.state.fields["pass"]
          }
          this.props.handle_login(data, (res) => {
            if(res){
              this.setRedirect();
            }
          });
        }
        else{
          alert("Form has invalid input.");
        }
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
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        Email
                        <br/>
                        <input name="email" placeholder="john_delacruz@dlsu.edu.ph" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}></input>
                        <span className="error">{this.state.errors["email"]}</span>

                        <br/>
                        <br/>

                        Password
                        <br/>
                        <input type="password" name="pass" placeholder="●●●●●●●●" onChange={this.handleChange.bind(this, "pass")} value={this.state.fields["pass"]}></input>
                        <span className="error">{this.state.errors["pass"]}</span>

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