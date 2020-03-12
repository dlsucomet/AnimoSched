import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Register.svg';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            idNo: "",
            college: "RVRCOB",
            course: "",
            pass: "",
            passCon: "",
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    collectData = () =>{
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.email);
        console.log(this.state.idNo);
        console.log(this.state.college);
        console.log(this.state.course);
        console.log(this.state.pass);
        console.log(this.state.passCon);
        const data = {
            email: this.state.email,
            // username: this.state.idNo,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password1: this.state.pass,
            password2: this.state.passCon
        };
        axios.post('http://localhost:8000/api/auth/registration/', data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user.id);
        })
        .catch(error => {
            console.log(error.response)
        });
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
                    {/* <form> */}
                        First Name
                        <br/>
                        <input name = "firstName" value={this.state.firstName} onChange={e => this.handleChange(e)}/><br/><br/>

                        Last Name
                        <br/>
                        <input name = "lastName" value={this.state.lastName} onChange={e => this.handleChange(e)}/><br/><br/>

                        Email
                        <br/>
                        <input name = "email" value={this.state.email} onChange={e => this.handleChange(e)}/><br/><br/>

                        ID Number
                        <br/>
                        <input name = "idNo" value={this.state.idNo} onChange={e => this.handleChange(e)}/><br/><br/>

                        College
                        <br/>
                        <select id="college" name="college" value={this.state.college} onChange={e => this.handleChange(e)} >
                          <option value="RVRCOB">Ramon V. del Rosario College of Business (RVR COB)</option>
                          <option value="CCS">College of Computer Studies (CCS)</option>
                          <option value="GCOE">Gokongwei College of Engineering (GCOE)</option>
                          <option value="CLA">College of Liberal Arts (CLA)</option>
                          <option value="SOE">School of Economics (SOE)</option>
                          <option value="BAGCED">Br. Andrew Gonzales FSC College of Education (BAGCED)</option>
                          <option value="COS">College of Science (COS)</option>
                        </select>
                        <br/><br/>

                        Course
                        <br/>
                        <input name = "course" value={this.state.course} onChange={e => this.handleChange(e)}/><br/><br/>

                        Password
                        <br/>
                        <input type="password" name = "pass" value={this.state.pass} onChange={e => this.handleChange(e)}/><br/><br/>

                        Confirm Password
                        <br/>
                        <input type="password" name = "passCon" value={this.state.passCon} onChange={e => this.handleChange(e)}/><br/><br/>

                        <input type="submit" class="btn btn-success" value="Register" onClick={this.collectData}/>
                    {/* </form> */}
                    
                    <br/>
                    
                    <p><a href="{% url 'password_reset' %}">Forgot your password?</a></p>
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Register;