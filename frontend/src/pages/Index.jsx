import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ScheduleView from '../components/ScheduleView';
import '../css/Index.css'
import SavedSchedule from '../components/SavedSchedule';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class Index extends Component {
    constructor(props){
      super(props);
    }

    state={
      
    }
    render() {
      const StyledTableCell = withStyles(theme => ({
        head: {
          backgroundColor: '#006A4E',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles(theme => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
          },
        },
      }))(TableRow);
      
      function createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
        return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
      }
      
      const rows = [
        createData(2258, 'INOVATE', 'S17', 'DELA CRUZ, JUAN', 'TH', '12:45', '14:15', 'GK210', 45, 45),
        createData(2259, 'INOVATE', 'S18', 'DELA CRUZ, JUAN', 'TH', '14:30', '16:00', 'GK210', 45, 40),
        createData(2043, 'TREDTRI', 'S17', 'TORRES, MARIA', 'TH', '14:30', '16:00', 'GK301', 30, 30),
        createData(2044, 'TREDTRI', 'S18', 'TORRES, MARIA', 'TH', '12:45', '14:15', 'GK301', 30, 28)
      ];

      return (
        <div>
          {this.props.menu()}

          <div>
                <center><h3 >FIRST TRIMESTER, AY 2019 - 2020</h3></center>
          
              <Row horizontal="center">
               
                <Column >
                  <div class="sidemenu">
                    <center><input type="submit" class="btn btn-success change-term-sched" value="AY1920 T1" /></center>
                    <center><input type="submit" class="btn btn-success change-term-sched" value="AY1819 T3" /></center>
                  </div>
                </Column>

                <Column >
                  <div class='savedSchedContent'>
                    <center><SavedSchedule/></center>
                  </div>
                  <Row horizontal='center'>
                    <div className="viewCourses">
                      <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell> Class Number </StyledTableCell>
                              <StyledTableCell> Course </StyledTableCell>
                              <StyledTableCell> Section </StyledTableCell>
                              <StyledTableCell> Faculty </StyledTableCell>
                              <StyledTableCell> Day </StyledTableCell>
                              <StyledTableCell> Time </StyledTableCell>
                              <StyledTableCell> Room </StyledTableCell>
                              <StyledTableCell> Capacity </StyledTableCell>
                              <StyledTableCell> Enrolled </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map(row => (
                              <StyledTableRow key={row.classNmbr}>
                                <StyledTableCell> {row.classNmbr} </StyledTableCell>
                                <StyledTableCell> {row.course} </StyledTableCell>
                                <StyledTableCell> {row.section} </StyledTableCell>
                                <StyledTableCell> {row.faculty} </StyledTableCell>
                                <StyledTableCell> {row.day} </StyledTableCell>
                                <StyledTableCell> {row.startTime} - {row.endTime} </StyledTableCell>
                                <StyledTableCell> {row.room} </StyledTableCell>
                                <StyledTableCell align="right"> {row.capacity} </StyledTableCell>
                                <StyledTableCell align="right"> {row.enrolled} </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Row>
                </Column>

                <Column >
                <div class='optionList'>
                    <center><input type="submit" class="btn btn-success option-choices" value="EDIT" /></center>
                    <center><input type="submit" class="btn btn-success option-choices" value="CUSTOMIZE" /></center>
                    <center><input type="submit" class="btn btn-success option-choices" value="IMPORT" /></center>
                  </div>
                </Column>
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