import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import '../css/Profile.css';
import axios from 'axios';
import ResetPassword from "./ResetPassword.jsx";

class Profile extends Component {
    constructor(props){
      super(props);
      this.state = {
          email: '',
          first_name: '',
          last_name: '',
          college: '',
          degree: '',
          id_num: '',
      }
    }

    componentWillMount(){
        axios.get('http://localhost:8000/api/auth/user/',
        {
            headers: {
            Authorization: `JWT ${localStorage.getItem('token')}` 
            },
            withCredentials: true
        })
        .then(res => {
            this.setState({
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            id_num: '', 
            })
            const college = res.data.college;
            const degree = res.data.degree;
            axios.get('http://localhost:8000/api/colleges/'+college+'/')
            .then(res => {
              this.setState({college: res.data.college_name})
              axios.get('http://localhost:8000/api/degrees/'+degree+'/')
              .then(res => {
                this.setState({degree: res.data.degree_name});
              })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
      return (
          <div>
            {this.props.menu()}

            <div className="profile-category">
                <h2>Account Profile</h2>

                <div className="profile-category-content">
                    First Name
                    <br/>
                    <input value={this.state.first_name}/><br/><br/>

                    Last Name
                    <br/>
                    <input value={this.state.last_name}/><br/><br/>

                    ID Number
                    <br/>
                    <input value={this.state.id_num}/><br/><br/>

                    College
                    <br/>
                    <input value={this.state.college}/><br/><br/>

                    Degree
                    <br/>
                    <input value={this.state.degree}/><br/><br/>

                    Email
                    <br/>
                    <input value={this.state.email}/><br/><br/>
                </div>
            </div>

            <div className="profile-category">
                <h2>Notification Settings</h2>

                <div className="profile-category-content">
                    Receive notifications when

                    <form>
                        <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                        <label className="checkbox-description" for=""> The status of your chosen sections in your schedule has changed. </label><br/>

                        <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                        <label className="checkbox-description" for=""> Course conflicts in your schedule. </label><br/>

                        <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                        <label className="checkbox-description" for=""> Your friends make changes to their schedules and preferences. </label>

                        <center>
                        <input class="btn btn-success submit-form" type="submit" value="Submit"/>
                        </center>
                    </form>

                </div>
            </div>

            <div className="profile-category">
                <h2>Data Privacy Settings</h2>

                <div className="profile-category-content">
                    Allow friends to view

                    <form>
                        <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                        <label className="checkbox-description" for=""> Your saved schedules. </label><br/>

                        <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                        <label className="checkbox-description" for=""> Your schedule preferences. </label><br/>

                        <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                        <label className="checkbox-description" for=""> College and course details. </label>

                        <center>
                            <input class="btn btn-success submit-form" type="submit" value="Submit"/>
                        </center>
                    </form>
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Profile;