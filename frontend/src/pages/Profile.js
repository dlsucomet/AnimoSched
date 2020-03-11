import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu';
import '../css/Profile.css';

class Profile extends Component {
    render() {
      return (
          <div>
            <Menu />

            <div className="profile-category">
                <h2>Account Profile</h2>

                <div className="profile-category-content">
                    Forms
                </div>
            </div>

            <div className="profile-category">
                <h2>Notification Settings</h2>

                <div className="profile-category-content">
                    Receive notifications when
                </div>
            </div>

            <div className="profile-category">
                <h2>Data Privacy Settings</h2>

                <div className="profile-category-content">
                    Forms
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Profile;