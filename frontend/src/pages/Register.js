import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Register.svg';

class Register extends Component {
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
                    <form>
                        First Name
                        <br/>
                        <input/><br/><br/>

                        Last Name
                        <br/>
                        <input/><br/><br/>

                        Email
                        <br/>
                        <input/><br/><br/>

                        ID Number
                        <br/>
                        <input/><br/><br/>

                        College
                        <br/>
                        <select id="college" name="college">
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
                        <input/><br/><br/>

                        Password
                        <br/>
                        <input type="password"/><br/><br/>

                        Confirm Password
                        <br/>
                        <input type="password"/><br/><br/>

                        <input type="submit" class="btn btn-success" value="Register" />
                    </form>
                    
                    <br/>
                    
                    <p><a href="{% url 'password_reset' %}">Forgot your password?</a></p>
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Register;