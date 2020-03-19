import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import '../css/SearchCourses.css';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SearchCourses extends Component {
    render() {
      const StyledTableCell = withStyles(theme => ({
        head: {
          backgroundColor: theme.palette.common.black,
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

      function testing(value) {
        if (value == 0){
          return alert(0);
        }
        else if (value == 1){
          return alert(1);
        }
        else{
          return alert(2);
        }
      }

      return (
          <div>
            <Menu />

            <div className="search-container">
                <center>
                  <h2>Search all your courses in one go!</h2>
                  <input/><br/>
                </center>

                <div className="filterss">
                  <center>
                    <form onSubmit="testing(0)">
                      <p>Filters:</p>
                      <input type="radio" name="filter" value="All" /> All
                      <input type="radio" name="filter" value="Open" /> Open
                      <input type="radio" name="filter" value="Closed" /> Closed
                      <p><input type="submit" value="Submit" /></p>
                    </form>

                  </center>


                    {/* <center>
                      <span className="filterLabel">Filters:</span>
                      
                      <input type="radio" id="all" name="gender" value="male" onclick="testing(0)"/>
                      <label className="radio-description" for="all">All Sections</label>

                      
                      <input type="radio" id="open" name="gender" value="male" onclick="testing(1)"/>
                      <label className="radio-description" for="open">Open Sections</label>

                      
                      <input type="radio" id="closed" name="gender" value="male" onclick="testing(2)"/>
                      <label className="radio-description" for="closed">Closed Sections</label>
                    </center> */}
                </div>

                <div className="filters">
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

                          // classNmbr, course, section, faculty, day, time, room, capacity, enrolled) {

                          <StyledTableRow key={row.classNmbr}>
                            <StyledTableCell> {row.classNmbr} </StyledTableCell>
                            <StyledTableCell> {row.course} </StyledTableCell>
                            <StyledTableCell> {row.section} </StyledTableCell>
                            <StyledTableCell> {row.faculty} </StyledTableCell>
                            <StyledTableCell> {row.day} </StyledTableCell>
                            <StyledTableCell> {row.startTime} - {row.startTime} </StyledTableCell>
                            <StyledTableCell> {row.room} </StyledTableCell>
                            <StyledTableCell align="right"> {row.capacity} </StyledTableCell>
                            <StyledTableCell align="right"> {row.enrolled} </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
            </div>
        </div>        
      );
    }
  }
  export default SearchCourses;