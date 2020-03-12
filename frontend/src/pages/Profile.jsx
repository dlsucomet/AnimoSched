import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import '../css/Profile.css';

class Profile extends Component {
    render() {
      return (
          <div>
            <Menu />

            <div className="profile-category">
                <h2>Account Profile</h2>

                <div className="profile-category-content">
                    Full Name
                    <br/>
                    <input/><br/><br/>

                    ID Number
                    <br/>
                    <input/><br/><br/>

                    College
                    <br/>
                    <input/><br/><br/>

                    Course
                    <br/>
                    <input/><br/><br/>

                    Email
                    <br/>
                    <input/><br/><br/>
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