import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import '../css/Index.css'

import SchedViewHome from '../components/SchedViewHome';

import Background from '../assets/Gradient_BG.png'
import calendarIcon from '../assets/calendar.png'
import attachIcon from '../assets/attach.png'
import laughIcon from '../assets/laugh.png'
// import { Container, Row, Col } from 'reactstrap';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

var sectionStyle = {
  // width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage:  "url(" + Background + ")"
};

class Index extends Component {
    constructor(props){
      super(props);
    }

    state={
      currentPage: 0,
      currentContent: <SchedViewHome/>,
      generatedContents: [<SchedViewHome/>,<SchedViewHome/>,<SchedViewHome/>],
    }

    handlePageChange = (e,index) => {
  
      this.setState(state =>{
          var currentContent = state.generatedContents[index];
          return {currentContent};
          });
      
      this.setState({currentPage: index});
      this.setState(state =>{
          var currentPage = index;
          return {currentPage};
          });
      console.log("pressed page " + index);
      console.log(this.state.generatedContents[index]);
  }

    render() {
      this.state.pagesCount = this.state.generatedContents.length;
        this.state.currentContent = this.state.generatedContents[this.state.currentPage];
      return (
        <div style={!this.props.logged_in? sectionStyle : {}}>
          {this.props.menu()}

          <div className={"homepage"} style={this.props.logged_in ? {} : {display: "none"}}>
              <Row horizontal="center">
                  <div style={{paddingTop:"20px"}}>
                    <center ><h3 >FIRST TRIMESTER, AY 2019 - 2020</h3></center>
                  </div>
                </Row>
              <Row horizontal="center">
               
                <Column flexShrink={1}>
                  <div class="sidemenu">
                    <center><input type="submit" class="btn btn-success change-term-sched" value="AY1920 T1" /></center>
                    <center><input type="submit" class="btn btn-success change-term-sched" value="AY1819 T3" /></center>
                  </div>
                </Column>

                <div className='savedContent'>
                  <Column flexGrow={1}>
                    <span>{this.state.currentContent}</span>
                  </Column>
                </div>

                <Column >
                <div class='optionList'>
                    <center><Button color="success" className="option-choices">EDIT</Button></center>
                    <center> <Button color="success" className="option-choices">CUSTOMIZE</Button></center>
                    <center><Button color="success" className="option-choices">EXPORT</Button></center>
                    <center><Button color="secondary" className="option-choices">DELETE</Button></center>
                  </div>
                </Column>

              </Row>

              <Row horizontal='center'>
              <div className = "paginationContainer">
                <Row horizontal='center'>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={this.state.currentPage <= 0}>
                            <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPage - 1)}
                                previous/>
                        </PaginationItem>
                        {[...Array(this.state.pagesCount)].map((page, i) => 
                            <PaginationItem active={i === this.state.currentPage} key={i} className={'paginationItemStyle'}>
                                <PaginationLink onClick={e => this.handlePageChange(e, i)} className={'paginationLinkStyle'}>
                                {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                            )}
                        <PaginationItem disabled={this.state.currentPage >= this.state.generatedContents.length - 1}>
                            <PaginationLink
                                onClick={e => this.handlePageChange(e, this.state.currentPage + 1)}
                                next
                            />
                            
                            </PaginationItem>
                    </Pagination>
                </Row>
              </div>
            </Row>
           
          </div>
          <div className={"landingpage"} style={!this.props.logged_in? {} : {display: "none"}}>
          <Grid container spacing={3}>
        <Grid item xs={6}>
              <Typography gutterBottom variant="h3" align="center">
                Create your schedule!
              </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
       
        <Grid item xs={1}>
          <img src={calendarIcon} className={"iconStyle"}/>
        </Grid>
        {/* <Grid item xs={1}>
        </Grid> */}
        <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                          Enter your courses, 
                          set your schedule, 
                          and choose your schedule, 
                          generate automatically
                      </Typography>
        </Grid>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={1}>
          <img src={attachIcon} className={"iconStyle"}/>
        </Grid>
        {/* <Grid item xs={1}>
        </Grid> */}
        <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                        Customize the look of your
                        schedule and save it aS an image.
                      </Typography>
        </Grid>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={1}>
          <img src={laughIcon} className={"iconStyle"}/>
        </Grid>
        {/* <Grid item xs={1}>
        </Grid> */}
        <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                        collaborate with friends
                        and create schedules
                        as a group.
                      </Typography>
        </Grid>
      </Grid>
            {/* <Grid container spacing={2}>
              
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2} style={{padding:"20px", margin: "20px"}}>
                <Grid item xs={6}>
                  <img src={calendarIcon} className={"iconStyle"}/>
                </Grid>
                  <Grid item xs>
                    <Typography gutterBottom variant="h3" align="center">
                      Create your schedule!
                    </Typography>
                    <Grid item xs={12} sm={6}>
                      
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                          Enter your courses, 
                          set your schedule, 
                          and choose your schedule, 
                          generate automatically
                      </Typography>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="body1" color="textSecondary">
                    Customize the look of your
                    schedule and save it aS an image.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                    collaborate with friends
                    and create schedules
                    as a group.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item >
                <h1>Buttons here</h1>
              </Grid>
            </Grid> */}
            {/* <Column flexGrow={1}>
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
                    </Column> */}
    
                    {/* CHANGE THIS DESCRIPTION SINCE WE CHANGED THIS FUNCTIONALITY. */}
                    {/* <Column flexGrow={1}>
                      <span> <b>Collaborate</b> with friends </span>
                      <span> and create schedules </span>
                      <span> as a group. </span>
                    </Column>
                  </Row>
                </Column>                 
                 <Column flexGrow={1} horizontal='center'>
                  <button type="button" class="btn btn-success">Create Schedule</button>
                  <br/>
                  OR */}
                  {/* IS IT ADVISEABLE TO USE BREAK POINTS */}
                  {/* <br/>
                  <br/>
                  <button type="button" class="btn btn-success">Check Flowchart</button>
                </Column>
              </Row>
            </Column> */}
          </div>
        </div>        
      );
    }
  }
  export default Index;