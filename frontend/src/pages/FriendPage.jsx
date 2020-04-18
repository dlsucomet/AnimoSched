import React, { Component } from "react";
import '../css/FriendPage.css';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import SidebarIMG from '../images/FriendPage.svg';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
    ListGroup,
    ListGroupItem,
    Table
} from 'reactstrap';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import SchedViewHome from '../components/SchedViewHome';

import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import groupArray from 'group-array'
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactLoading from 'react-loading';

import friendDef from '../assets/friend2.png';
import { Chip } from "@material-ui/core";
const styles = theme => ({
    pencilIcon:{ 
        marginLeft: "10px",
        '&:hover': {
            backgroundColor: "white",
            color: "gray"
          },
    },
    checkIcon:{
        color: "green", 
        '&:hover': {
            backgroundColor: "white",
            color: "#79c879"
          },
    },

    unfriendBtnStyle:{
        textTransform: "none",
        width: "20px",
        borderRadius: "100px",
        // padding: "10px",
        // paddingLeft: "10px",
        // paddingRight: "10px",
        // backgroundColor: "#16775D",
        // border: "none",
        // color: "white",
        // boxShadow: "6px 5px #e8f4ea",
        border: "2px solid #16775D",
        borderStyle: "solid",
        borderColor: "#16775D",
        // marginTop: "20px",
        justifyContent: 'center',
        backgroundColor: "white",
        color: "#16775D",
        '&:hover:after': {
           content: "Unfriend"
          },
    },

    buttonStyle:{
        textTransform: "none",
        width: "200px",
        borderRadius: "25px",
        padding: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        backgroundColor: "#16775D",
        border: "none",
        color: "white",
        boxShadow: "6px 5px #e8f4ea",
        borderStyle: "solid",
        borderColor: "#16775D",
        marginTop: "20px",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
        marginBottom: "5em",
        '&:hover': {
            backgroundColor: "white",
            color: "#16775D"
          },
    },
  });
const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class FriendPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            requests: [],
            currentPage: 0,
            // currentContent: "",
            // generatedContents: [],
            currentContent: "",
            generatedContents: [],
            pagesCount: 1,
            dataReceived: false, //whole page
            allowEdit: false,
            openAlert: false,
            selectedFriend: "",
            hasSelectedFriend: false, //right side
            contentSelected: false,
            schedules: [],
            profList: [],

            daysList:[
                {   id: 1,
                    day_code: "M",
                    day: "Monday",
                    checked: false,},
                { 
                    id: 2,
                    day_code: "T",
                    day: "Tuesday",
                    checked: false,},
                {
                    id: 3,
                    day_code: "W",
                    day: "Wednesday",
                    checked: false,},
                {
                    id: 4, 
                    day_code: "H",
                    day: "Thursday",
                    checked: false,},
                {
                    id: 5,
                    day_code: "F",
                    day: "Friday",
                    checked: false,},
                { 
                    id: 6,
                    day_code: "S",
                    day: "Saturday",
                    checked: false,},

                ],
            
            buildingList:[{   
                id: 2,
                bldg_code: "LS",
                building: "St. La Salle Hall",
                checked: false,},
            { 
                id: 3,
                bldg_code: "Y",
                building: "Enrique Yuchengco Hall",
                checked: false,},
            {
                id: 4,
                bldg_code: "J",
                building: "St. Joseph Hall",
                checked: false,},
            {
                id: 5, 
                bldg_code: "V",
                building: "Velasco Hall",
                checked: false,},
            {
                id: 6,
                bldg_code: "M",
                building: "St. Miguel Hall",
                checked: false,},
            { 
                id: 7,
                bldg_code: "MU",
                building: "St. Mutien Marie Hall",
                checked: false,},
            {
                id: 1,
                bldg_code: "GK",
                building: "Gokongwei Hall",
                checked: false,},
            { 
                id: 8,
                bldg_code: "A",
                building: "Br. Andrew Gonzales Hall",
                checked: false,},],

            college: '', 
            degree: '',
            idnum: '',
            earliest_class_time: '',
            latest_class_time: '',
            break_length: '',

        }

    }
    createTimeslot = (day, hour, minute) =>{
        if(day == 'M'){
            return new Date(2018, 5, 25, hour, minute);
        }else if(day == 'T'){
            return new Date(2018, 5, 26, hour, minute);
        }else if(day == 'W'){
            return new Date(2018, 5, 27, hour, minute);
        }else if(day == 'H'){
            return new Date(2018, 5, 28, hour, minute);
        }else if(day == 'F'){
            return new Date(2018, 5, 29, hour, minute);
        }else if(day == 'S'){
            return new Date(2018, 5, 30, hour, minute);
        }
    }
    createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
        return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
    }
    createRequests(firstName, lastName, status, id, college, degree, id_num) {
        return { firstName, lastName, status, id, college, degree, id_num};
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

    setSchedInfo = () => {
        console.log(this.state.schedules)
        const palette = JSON.parse(localStorage.getItem('palette'))
        var generatedContents = this.state.schedules.map((item, index) =>
            <SchedViewHome key={item.id} id={item.id} offerings={item.offerings} tableContent={item.tableContent} scheduleContent={item.scheduleContent} titleName={item.title} allowEdit={this.state.allowEdit} palette={palette}/>
        );
        // this.setState({hideGenContent: false});
        this.setState({generatedContents}, ()=>{
            this.setState({currentContent: generatedContents[0]}, () => {
                this.setState({hasSelectedFriend: true})
                
            })
            this.setState({pagesCount: generatedContents.length});
            this.setState({currentPage: 0})
        });
    
      }
    
    componentDidMount(){
        axios.get('https://archerone-backend.herokuapp.com/api/friendlist/'+localStorage.getItem('user_id')+'/')
        .then(res => {
            const requests = []
            res.data.map(friend => {
                requests.push(this.createRequests(friend.first_name, friend.last_name, "accept", friend.id, friend.college, friend.degree, friend.id_num))
            })
            this.setState({requests, dataReceived: true})
        })
    }

    handleClickOpenAlert = (friend) => {
        this.setState({openAlert: true});
        this.setState({selectedFriend: friend});
        
    }
     
       handleCloseAlert = () => {
         this.setState({openAlert: false});
    }

    handleClick = (e, i) => {
        this.setState({contentSelected: true})
        const requests = this.state.requests
        axios.get('https://archerone-backend.herokuapp.com/api/schedulelist/'+requests[i].id+'/')
        .then(res => {
            const schedules = []
            res.data.map(newSchedule =>{
                var count = 0;
                const scheduleContent = []
                const tableContent = []
                var earliest = 9
                var latest = 17
                var arranged = groupArray(newSchedule.courseOfferings, 'classnumber');
                for (let key in arranged) {
                  var days = []
                  var day = ''
                  var classnumber = ''
                  var course = ''
                  var section = ''
                  var faculty = ''
                  var timeslot_begin = ''
                  var timeslot_end = ''
                  var room = ''
                  var max_enrolled = ''
                  var current_enrolled = ''
                  arranged[key].map(offering => {
                    days.push(offering.day)
                    classnumber = offering.classnumber
                    course = offering.course
                    section = offering.section
                    faculty = offering.faculty
                    timeslot_begin = offering.timeslot_begin
                    timeslot_end = offering.timeslot_end
                    room = offering.room
                    max_enrolled = offering.max_enrolled
                    current_enrolled = offering.current_enrolled
                  })
                  days.map(day_code => {
                    day += day_code;
                  })
                  const newTableContent = this.createData(classnumber, course, section, faculty, day, timeslot_begin, timeslot_end, room, max_enrolled, current_enrolled);
                  tableContent.push(newTableContent)
                }
                newSchedule.courseOfferings.map(offering=>{
                    var startTime = offering.timeslot_begin.split(':');
                    var endTime = offering.timeslot_end.split(':');
                    const newContent = 
                    {
                        id: count,
                        title: offering.course + ' ' + offering.section,
                        section: offering.section,
                        startDate: this.createTimeslot(offering.day,startTime[0],startTime[1]),
                        endDate: this.createTimeslot(offering.day,endTime[0],endTime[1]),
                        location: offering.room,
                        professor: offering.faculty,
                        startTime: offering.timeslot_begin,
                        endTime: offering.timeslot_end,
                        days: offering.day,
                        classCode: offering.classnumber 
                    }
                    if(earliest > Number(startTime[0])){
                        earliest = Number(startTime[0])
                    }
                    if(latest < Number(endTime[0]) + 1){
                        latest = Number(endTime[0]) + 1
                    }
                    scheduleContent.push(newContent);
  
                    count += 1;
                })
                schedules.push({
                    id: newSchedule.id,
                    title: newSchedule.title,
                    scheduleContent: scheduleContent,
                    tableContent: tableContent, 
                    prefContent: [],
                    conflictsContent: newSchedule.information,
                    earliest: earliest,
                    latest: latest,
                    offerings: newSchedule.courseOfferings
                });
            })
            axios.get('https://archerone-backend.herokuapp.com/api/preferencelist/'+requests[i].id+'/')
            .then(res => {
                const profList = []
                const sectionList = []
                console.log(res.data)
                res.data.map(preference =>{
                    if(preference.earliest_class_time != null){
                        this.setState({earliest_class_time:preference.earliest_class_time})
                    }
                    if(preference.latest_class_time != null){
                        this.setState({latest_class_time:preference.latest_class_time})
                    }
                    if(preference.preferred_days != null){
                        const newDaysList = [];
                        this.state.daysList.map(day => {
                            if(preference.preferred_days == day.id){
                                newDaysList.push({'id':day.id, 'day_code':day.day_code, 'day':day.day, 'checked':true})
                            }else{
                                newDaysList.push(day);
                            }
                        })
                        this.setState({daysList: newDaysList})
                    }
                    if(preference.break_length != null){
                        this.setState({break_length:preference.break_length})
                    }
                    if(preference.min_courses != null){
                        this.setState({min_courses:preference.min_courses})
                    }
                    if(preference.max_courses != null){
                        this.setState({max_courses:preference.max_courses})
                    }
                    if(preference.preferred_faculty != null){
                        var prof = preference.preferred_faculty
                        profList.push(prof);
                    }
                    if(preference.preferred_buildings != null){
                        const newBuildingList = [];
                        this.state.buildingList.map(bldg => {
                            if(preference.preferred_buildings == bldg.id){
                                newBuildingList.push({'id':bldg.id, 'bldg_code':bldg.bldg_code, 'building':bldg.building, 'checked':true})
                            }else{
                                newBuildingList.push(bldg);
                            }
                        })
                        this.setState({buildingList: newBuildingList})
                    }
                    if(preference.preferred_sections != null){
                        var section = preference.preferred_sections 
                        sectionList.push(section);
                    }
                })
                console.log(profList)
                this.setState({sectionList, profList, schedules, college: requests[i].college, degree: requests[i].degree, idnum: requests[i].id_num}, () => {
                    this.setSchedInfo();
                })
            });
            // this.setState({success: true});
            // this.setState({loading: false});
            // this.setState({dataReceived: true})
        }).catch(error => {
            console.log(error)
            // this.setState({success: false});
            // this.setState({loading: false});
        })

    }
       
    render() {
        const friendList = [];
        const { classes } = this.props;

        for(var i=0; i < this.state.requests.length; i++){
            if(this.state.requests[i].status == "accept")
                friendList.push(this.state.requests[i]);
        }
        
        return (
            <div>
                {this.props.menu()}
                {this.state.dataReceived ? 
                <div>
                    <div class="friendMenu">
                        <div class="titleRow">
                            <center>
                                <h1>FRIENDS</h1>
                                <svg class="bi bi-people-fill" width="75" height="75" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"></path>
                                </svg>
                            </center>
                        </div>

                        <div style={{height: "100%"}}>
                        
                            <div style={{justifyContent:"center", justify: "center", justifyItems: "center", margin: "auto"}}>
                                <TextField
                                    key={"friendPage_searchFriends"}
                                    id="friendPage_searchFriends"
                                    variant= "outlined"
                                    // options={friendList}
                                    // getOptionLabel={(option) => option.firstName + " " + option.lastName}
                                    style={{ width: "95%", marginBottom: "10%", justifyContent: "center" }}
                                    filterSelectedOptions
                                    label="Search Friends" 
                                    placeholder="FirstName LastName"
                                    // onChange={this.handleEditChange}
                                    /*renderInput={(params) => <TextField {...params} label="Search Friends" variant="outlined" placeholder="FirstName LastName"/>}*/
                                    />
                                    {/* <input style={{marginBottom: "10%"}}></input> */}
                            </div>

                            <ListGroup flush style={{height: "50%", overflowX: "hidden"}}>
                                {friendList.map((friend, index) => (
                                    <ListGroupItem type="button" tag="a" onClick={(e) => this.handleClick(e, index)} action>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <span> {friend.firstName} {friend.lastName} </span>
                                            </Col>

                                            <Col xs={6} md={4}>
                                                <div className={"friend_btn"}>
                                                    {/* <Button
                                                    variant="contained"
                                                    className={classes.buttonStyle}
                                                    onClick={()=>this.handleClickOpenAlert(friend)}
                                                    >

                                                        <CheckIcon fontSize="small"/>
                                                    </Button> */}
                                                    <svg onClick={()=>this.handleClickOpenAlert(friend)} class="bi bi-check-circle" width="24" height="24" viewBox="0 0 16 16" fill="#006A4E" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path>
                                                        <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                            </Col>
                                        </Row>            
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                            <Dialog
                                open={this.state.openAlert}
                                onClose={this.handleCloseAlert}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Remove From Friend List"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you want to unfriend "{this.state.selectedFriend.firstName} {this.state.selectedFriend.lastName}"?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleCloseAlert} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.deleteSchedule} color="primary" autoFocus>
                                    Unfriend
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    {this.state.contentSelected ? 
                        <div>
                        {this.state.hasSelectedFriend ?
                        <div class="sidemenu-main">
                            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                                <Tab eventKey="details" title="Details">
                                    <div className="friendName">
                                        <Typography gutterBottom variant="h4" align="center" style={{color:"black"}}>
                                            Name                
                                        </Typography>
                                        {/* <center><h1> Name </h1></center> */}
                                    </div>

                                    <div className="friendDetails">
                                        <div class="column" style={{float: "left", width: "65%"}}>
                                            <div>
                                                <Typography gutterBottom variant="h5" align="left" style={{color:"black"}}>
                                                    Details
                                                </Typography>
                                                {/* <h3> Details </h3> */}
                                                <Table responsive size="sm">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">College</th>
                                                            <td>{this.state.college}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Degree</th>
                                                            <td>{this.state.degree}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">ID Number</th>
                                                            <td>{this.state.idnum}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>

                                        <div>
                                            <Typography gutterBottom variant="h5" align="left" style={{color:"black"}}>
                                                Preferences
                                            </Typography>
                                            {/* <h3> Preferences </h3> */}
                                            <Table responsive size="sm" style={{overflow:"hidden"}}>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Earliest Time</th>
                                                        <td>{this.state.earliest_class_time}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Latest Time</th>
                                                        <td>{this.state.latest_class_time}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Break Length</th>
                                                        <td>{this.state.break_length}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Minimum Courses</th>
                                                        <td>{this.state.min_courses}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Maximum Courses</th>
                                                        <td>{this.state.max_courses}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Faculty</th>
                                                        <td>
                                                        {this.state.profList.map(prof => (
                                                            <Chip label={prof.full_name}></Chip>
                                                        ))}
                                                        {/* <Autocomplete
                                                            multiple
                                                            disabled
                                                            id="combo-box-demo"
                                                            options={this.state.profList}
                                                            getOptionLabel={option => option.full_name}
                                                            style={{ width: 400 }}
                                                            renderInput={params => <TextField {...params} label="" variant="outlined" />}
                                                            value={this.state.profList}
                                                        /> */}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Section</th>
                                                        <td>
                                                        {this.state.sectionList.map(section => (
                                                            <Chip label={section.section_code}></Chip>
                                                        ))}
                                                        {/* <Autocomplete
                                                            multiple
                                                            disabled
                                                            id="combo-box-demo"
                                                            options={this.state.sectionList}
                                                            getOptionLabel={option => option.section_code}
                                                            style={{ width: 400 }}
                                                            renderInput={params => <TextField {...params} label="" variant="outlined" />}
                                                            value={this.state.sectionList}
                                                        /> */}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Days</th>
                                                        <td>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.daysList[0].checked} onChange={this.handleDayChange} id={this.state.daysList[0].id} color="primary"/>}label="M" />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.daysList[1].checked} onChange={this.handleDayChange} id={this.state.daysList[1].id} color="primary"/>}label="T" />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.daysList[2].checked} onChange={this.handleDayChange} id={this.state.daysList[2].id} color="primary"/>}label="W" />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.daysList[3].checked} onChange={this.handleDayChange} id={this.state.daysList[3].id} color="primary"/>}label="H" />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.daysList[4].checked} onChange={this.handleDayChange} id={this.state.daysList[4].id} color="primary"/>}label="F" />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.daysList[5].checked} onChange={this.handleDayChange} id={this.state.daysList[5].id} color="primary"/>}label="S" />
                                                            </FormGroup>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Buildings</th>
                                                        <td>
                                                            <Grid container spacing={6}>
                                                                <Grid item xs={6}>

                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.buildingList[0].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[0].id}  color="primary"/>}label={this.state.buildingList[0].building} />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.buildingList[1].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[1].id} color="primary"/>}label={this.state.buildingList[1].building} />
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.buildingList[2].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[2].id} color="primary"/>}label={this.state.buildingList[2].building}/>
                                                                    <FormControlLabel
                                                                    control = {<GreenCheckbox checked={this.state.buildingList[3].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[3].id} color="primary"/>}label={this.state.buildingList[3].building} />
                                                                </FormGroup>
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                <FormGroup>
                                                                <FormControlLabel
                                                                control = {<GreenCheckbox checked={this.state.buildingList[4].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[4].id} color="primary"/>}label={this.state.buildingList[4].building}/>
                                                                <FormControlLabel
                                                                control = {<GreenCheckbox checked={this.state.buildingList[5].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[5].id} color="primary"/>}label={this.state.buildingList[5].building} />
                                                                    <FormControlLabel
                                                                control = {<GreenCheckbox checked={this.state.buildingList[6].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[6].id} color="primary"/>}label={this.state.buildingList[6].building}/>
                                                                <FormControlLabel
                                                                control = {<GreenCheckbox checked={this.state.buildingList[7].checked} onChange={this.handleBuildingChange} id={this.state.buildingList[7].id} color="primary"/>}label={this.state.buildingList[7].building} />
                                                                </FormGroup>
                                                                </Grid>
                                                            </Grid>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </Table>
                                            </div>
                                        </div>

                                        <div class="columnn" style={{float: "left", width: "35%"}}>
                                            <center><img id='loweeer' src={SidebarIMG}/></center>
                                        </div>
                                    </div>
                                </Tab>

                                <Tab eventKey="schedule" title="Schedule">
                                <Grid container >
                                    <Grid item xs={12}>
                                        <br></br>
                                            <Typography gutterBottom variant="h3" align="center" style={{color:"black"}}>
                                            FIRST TRIMESTER, AY 2019 - 2020
                                            </Typography>
                                    </Grid>

                                    <Grid item xs={12} className={'gridSavedContent'}>
                                        <div id='savedContent' className='savedContent' style={{height: "75em", color:"black"}}>
                                            <span>{this.state.currentContent}</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} justify="center" alignItems="center" justifyContent="center" alignContent="center">
                                        <div className = "paginationContainer" style={(this.state.generatedContents != null) ? {} : {display: "none"}}>
                                                <Pagination aria-label="Page navigation example" style={{justifyContent: "center"}}>
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
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} justify="center" alignItems="center" justifyContent="center" alignContent="center">
                                        <center>
                                        <a className="backBtn" href="/compare_schedule">
                                            <Button
                                            variant="contained"
                                            className={classes.buttonStyle}
                                            >
                                                Compare Schedules
                                            </Button>
                                        </a>
                                        </center>
                                    </Grid>
                                </Grid>
                                </Tab>
                            </Tabs>
                        </div>
                        
                        : 
                        <div className={"sidemenu-main"} style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh"}}>
                            <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
                        </div>}
                    </div>
                    :
                    <div className={"sidemenu-main"} /*style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh"}}*/>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <img src={friendDef} style={{height: "10em", display:"block", whiteSpace: "pre", marginTop:"10em"}}/>
                        </div >
                        <br></br>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
                        <h3>Select a friend to see their schedule!</h3>
                        </div>
                    </div>
                    }
                </div>
                : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
                    <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
                </div>}
            </div>     
        );
    }
}

  FriendPage.propTypes={
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(FriendPage);