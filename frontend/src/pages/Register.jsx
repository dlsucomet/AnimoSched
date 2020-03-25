import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Register.svg';
import { Redirect } from "react-router-dom";

import ComboBox from '../components/ComboBox.jsx';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
            colleges: [],
            degrees: [],
        }

    }
    componentWillMount(){
        axios.get('http://localhost:8000/api/colleges/')
        .then(res => {
          var newArray = [];
          res.data.map(college=>{
              newArray.push(college);
          })
          this.setState({colleges: newArray})
        })
        axios.get('http://localhost:8000/api/degrees/')
        .then(res => {
          var newArray = [];
          res.data.map(degree=>{
              newArray.push(degree);
          })
          this.setState({degrees: newArray});
          console.log(newArray);
        })
      }

    handleChange = (field, e) => {
        // this.setState({
        //     [e.target.name]: e.target.value
        // })

        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    handleAutoCompleteChange = (e, val) => {
        let fields = this.state.fields;
        fields['degree'] = val.id;
        console.log(val.id);
        this.setState({fields});
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        // FIRSTNAME
        if(!fields["firstName"]){
            formIsValid = false;
            errors["firstName"] = "Required First Name"
        }

        // LASTNAME
        if(!fields["lastName"]){
            formIsValid = false;
            errors["lastName"] = "Required Last Name"
        }

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

        // ID NUMBER
        if(!fields["idNo"]){
            formIsValid = false;
            errors["idNo"] = "Required ID Number"
        }
  
        // PASSWORD
        if(!fields["pass"]){
          formIsValid = false;
          errors["pass"] = "Required Password"
        }

        // CONFIRM PASSWORD
        if(!fields["passCon"]){
            formIsValid = false;
            errors["passCon"] = "Required Confirm Password"
        }
  
        this.setState({errors: errors});
        return formIsValid;
    }

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

                // START EDITING HERE

                email: this.state.fields['email'],
                // username: this.state.idNo,
                first_name: this.state.fields['firstName'],
                last_name: this.state.fields['lastName'],
                password1: this.state.fields['pass'],
                password2: this.state.fields['passCon'],
                college: Number(this.state.fields['college']),
                degree: Number(this.state.fields['degree'])
            };
            console.log(data);
            this.props.handle_register(data, (res) => {
                if(res){
                    this.setRedirect();
                }else{
                }
            });
        }else{
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
                    <h5>Already have an account? <a href="/login">Log in!</a></h5>
                </div>
                
                <div id="signup-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        First Name
                        <br/>
                        <input name="firstName" placeholder="John" value={this.state.fields["firstName"]} onChange={this.handleChange.bind(this, "firstName")}/>
                        <span className="error">{this.state.errors["firstName"]}</span>
                        <br/><br/>

                        Last Name
                        <br/>
                        <input name="lastName" placeholder="Dela Cruz" value={this.state.fields["lastName"]} onChange={this.handleChange.bind(this, "lastName")}/>
                        <span className="error">{this.state.errors["lastName"]}</span>
                        <br/><br/>

                        Email
                        <br/>
                        <input name="email" placeholder="john_delacruz@dlsu.edu.ph" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                        <span className="error">{this.state.errors["email"]}</span>
                        <br/><br/>

                        ID Number
                        <br/>
                        <input name="idNo" placeholder="11612345" onChange={this.handleChange.bind(this, "idNo")} value={this.state.fields["idNo"]}/>
                        <span className="error">{this.state.errors["idNo"]}</span>
                        <br/><br/>

                        College
                        <br/>
                        <select id="college" name="college" value={this.state.fields["college"]} onChange={this.handleChange.bind(this, "college")} >
                            <>
                            
                            {this.state.colleges.map(college => (
                                <option value={college.id}>{college.college_name}</option>
                            ))}
                            </>
                        </select>
                        <br/><br/>

                        <br/>
                        <ComboBox page="register" name="degree" value={this.state.fields["degree"]} onChange={this.handleChange.bind(this, "degree")} college={this.state.fields["college"]} degrees={this.state.degrees}/><br/>
<!--                         <ComboBox name="degree" handleAutoCompleteChange={this.handleAutoCompleteChange} college={this.state.fields["college"]} degrees={this.state.degrees}/><br/> -->

                        Password
                        <br/>
                        <input type="password" name="pass" placeholder="●●●●●●●●" onChange={this.handleChange.bind(this, "pass")} value={this.state.fields["pass"]}/>
                        <span className="error">{this.state.errors["pass"]}</span>
                        <br/><br/>

                        Confirm Password
                        <br/>
                        <input type="password" name="passCon" placeholder="●●●●●●●●" onChange={this.handleChange.bind(this, "passCon")} value={this.state.fields["passCon"]}/>
                        <span className="error">{this.state.errors["passCon"]}</span>
                        <br/><br/>

                        {this.renderRedirect()}
                        <input type="submit" class="btn btn-success" value="Register" />
                    </form>
                    
                    <br/>
                    
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Register;