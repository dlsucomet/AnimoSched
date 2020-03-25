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

import ComboBox from '../components/ComboBox.jsx';

class SearchCourses extends Component {
    constructor(props){
      super(props);
      this.state = {
        fields: {}
      }
    }

    handleChange = (field, e) => {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      console.log(field);
      this.setState({fields});
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

            <div className="search-container">

                <div className="searchBar">
                  <h2>Search all your courses in one go!</h2>
                  <ComboBox page="search" value={this.state.fields["courses"]} onChange={this.handleChange.bind(this, "courses")} />
                </div>

                <div className="filters">
                    <center>
                      <span className="filterLabel">Filters:</span>
                      
                      <label className="radio-description" for="all">
                        <input type="radio" id="all" name="filter" value="all"/>
                        All Sections
                      </label>

                      <label className="radio-description" for="open">
                        <input type="radio" id="open" name="filter" value="open"/>
                        Open Sections
                      </label>

                      <label className="radio-description" for="closed">
                        <input type="radio" id="closed" name="filter" value="closed"/>
                        Closed Sections
                      </label>
                    </center>
                </div>

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
            </div>
        </div>        
      );
    }
  }
  export default SearchCourses;