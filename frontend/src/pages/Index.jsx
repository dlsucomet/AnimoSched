import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';

class Index extends Component {
    constructor(props){
      super(props);
      console.log("hello")
      console.log(this.props.menu)
    }
    render() {
      return (
        <div>
          {this.props.menu}
  
          <Column flexGrow={1}>
  
            <Row vertical='center'>
              <Column flexGrow={1}>
                <Row horizontal='center'>
                  <h1>Create your schedule!</h1>
                </Row>
  
                <Row>
                  <Column flexGrow={1}>
                    <h3> Icon 1 </h3>
                  </Column>
  
                  <Column flexGrow={1}>
                    <span> Enter your <b>courses</b>,</span>
                    <span> set your <b>preferences</b>, </span>
                    <span> and choose a <b>schedule</b>, </span>
                    <span> generated automatically. </span>
                  </Column>
                </Row>
  
                <br></br>
  
                <Row>
                  <Column flexGrow={1}>
                    <h3> Icon 2 </h3>
                  </Column>
  
                  <Column flexGrow={1}>
                    <span> <b>Customize</b> the look </span>
                    <span> of your schedule and </span>
                    <span> save it as an image. </span>
                  </Column>
                </Row>
  
                <br></br>
                
                <Row>
                  <Column flexGrow={1}>
                    <h3> Icon 3 </h3>
                  </Column>
  
                  {/* CHANGE THIS DESCRIPTION SINCE WE CHANGED THIS FUNCTIONALITY. */}
                  <Column flexGrow={1}>
                    <span> <b>Collaborate</b> with friends </span>
                    <span> and create schedules </span>
                    <span> as a group. </span>
                  </Column>
                </Row>
              </Column>
              
              <Column flexGrow={1} horizontal='center'>
                <button type="button" class="btn btn-success">Create Schedule</button>
                <br/>
                OR
                {/* IS IT ADVISEABLE TO USE BREAK POINTS */}
                <br/>
                <br/>
                <button type="button" class="btn btn-success">Check Flowchart</button>
              </Column>
            </Row>
          </Column>
        </div>        
      );
    }
  }
  export default Index;