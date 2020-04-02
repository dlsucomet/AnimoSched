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
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

class SearchCourses extends Component {
    constructor(props){
      super(props);
      this.state = {
        fields: {},
        database: [],
        siteData: [],
        courseList: [],
        selectedCourses: []
      }
    }

    componentWillMount(){
        axios.get('http://localhost:8000/api/courses/')
        .then(res => {
            res.data.map(course => {
                var courses = this.state.courseList;
                courses.push({'id':course.id, 'course_code':course.course_code})
                this.setState({courseList: courses})
            })
        })
    }

    createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
      return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
    }

    handleChange = (field, e) => {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      console.log(field);
      this.setState({fields});
    }

    handleFilter = (field, e) => {
      let option = e.target.value;

      let filteredList = [];

      if(option == "all"){
        console.log("all");
        filteredList = this.state.database;

        this.setState({siteData: filteredList});

        console.log(filteredList);
      }
      else if(option == "open"){
        console.log("open");

        var i;
        for(i = 0; i < this.state.database.length; i++) {
          if(this.state.database[i].enrolled < this.state.database[i].capacity){
            // console.log(this.state.database[i]);
            filteredList.push(this.state.database[i]);
          }
        }

        this.setState({siteData: filteredList});

        console.log(filteredList);
      }
      else{
        console.log("closed");

        var i;
        for(i = 0; i < this.state.database.length; i++) {
          if(this.state.database[i].enrolled >= this.state.database[i].capacity){
            // console.log(this.state.database[i]);
            filteredList.push(this.state.database[i]);
          }
        }

        this.setState({siteData: filteredList});

        console.log(filteredList);
      }

    }

    searchCourses = () =>{
      this.setState({siteData: []})
      this.state.selectedCourses.map(course =>{
        axios.get('http://localhost:8000/api/courseofferingslist/'+course.id+'/')
        .then(res => {
            res.data.map(offering => {
                const newSiteData = this.state.siteData;
                offering = this.createData(offering.id, offering.course, offering.section, offering.faculty, offering.day, offering.timeslot_begin, offering.timeslot_end, offering.room, offering.max_enrolled, offering.current_enrolled);
                newSiteData.push(offering)
                this.setState({siteData: newSiteData})
            })
        })
      })
    }

    handleSearch = (e, val) =>{
      this.setState({selectedCourses: val})
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

      return (
          <div>
            {this.props.menu()}

            <div className="search-container">

                <div className="searchBar">
                  <h2>Search all your courses in one go!</h2>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <ComboBox style={{width: "-webkit-fill-available"}} page="search" onChange={this.handleSearch} courseList={this.state.courseList} />
                      <Button
                            variant="contained"
                            color = "Primary"
                            style={{backgroundColor: "green", color:"white"}}
                            onClick={this.searchCourses}>
                            <SearchIcon/>  
                      </Button>
                    </div>
                    
                  
                </div>

                <div className="filters">
                    <center>
                      <span className="filterLabel">Filters:</span>
                      
                      <label className="radio-description" for="all">
                        <input type="radio" id="all" name="filter" value="all" onChange={this.handleFilter.bind(this, "filter")} />
                        All Sections
                      </label>

                      <label className="radio-description" for="open">
                        <input type="radio" id="open" name="filter" value="open" onChange={this.handleFilter.bind(this, "filter")} />
                        Open Sections
                      </label>

                      <label className="radio-description" for="closed">
                        <input type="radio" id="closed" name="filter" value="closed" onChange={this.handleFilter.bind(this, "filter")} />
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
                        {this.state.siteData.map(row => (
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