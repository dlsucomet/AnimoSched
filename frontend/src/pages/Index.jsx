import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import '../css/Index.css'

import SchedViewHome from '../components/SchedViewHome';

// import { Container, Row, Col } from 'reactstrap';

class Index extends Component {
    constructor(props){
      super(props);
    }

    state={
      currentPage: 0,
      currentContent: <SchedViewHome/>,
      generatedContents: [<SchedViewHome/>,<SchedViewHome/>,<SchedViewHome/>]
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
        <div>
          {this.props.menu()}

          <div>
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
                  </Column>
  
                  {/* CHANGE THIS DESCRIPTION SINCE WE CHANGED THIS FUNCTIONALITY. */}
                  {/* <Column flexGrow={1}>
                    <span> <b>Collaborate</b> with friends </span>
                    <span> and create schedules </span>
                    <span> as a group. </span>
                  </Column>
                </Row>
              </Column> */}
              
              {/* <Column flexGrow={1} horizontal='center'>
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
      );
    }
  }
  export default Index;