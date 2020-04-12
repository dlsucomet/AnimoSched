import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import '../css/Index.css'

import SchedViewHome from '../components/SchedViewHome';

import Background from '../assets/Gradient_BG.png'
import calendarIcon from '../assets/calendar.png'
import attachIcon from '../assets/attach.png'
import laughIcon from '../assets/laugh.png'
import whiteBlob from '../assets/whiteBlob.png'
// import { Container, Row, Col } from 'reactstrap';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { isThisMonth } from "date-fns/esm";
import groupArray from 'group-array';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import html2canvas from 'html2canvas';

// import Modal from '@material-ui/core/Modal';

import GetAppIcon from '@material-ui/icons/GetApp';
import PaletteIcon from '@material-ui/icons/Palette';
import DeleteIcon from '@material-ui/icons/Delete';
import DateRangeIcon from '@material-ui/icons/DateRange';

import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactLoading from 'react-loading';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const styles = theme => ({
  buttonStyle:{
      textTransform: "none",
      width: "150px",
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
      '&:hover': {
          backgroundColor: "white",
          color: "#16775D"
        },
  },

    deleteButtonStyle:{
      textTransform: "none",
      width: "150px",
      borderRadius: "25px",
      padding: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
      backgroundColor: "#D3D3D3",
      border: "##D3D3D3",
      color: "black",
      boxShadow: "6px 5px #e8f4ea",
      borderStyle: "solid",
      borderColor: "#D3D3D3",
      marginTop: "20px",
      '&:hover': {
          backgroundColor: "#d11a2a",
          borderStyle: "solid",
          color: "white",
          // borderColor: "#D3D3D3",
        },
    },
    
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // transform: 'translate(-50px, -50px)',
      backgroundColor: "white",
      top:"50%",
      left:"50%",
      transform: "translate(-50%,-50%)",

    },
    
    paper: {
      position: 'absolute',
      width: "400px",
      height: "300px",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

});

var sectionStyle = {
  // width: "100%",
  minHeight: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "hidden",
  backgroundImage:  "url(" + Background + ")"
};

class Index extends Component {
    constructor(props){
      super(props);
      
    }

    state={
      openAlert: false,
      snackBarVariables: [
        {snackBarDelete: false}, {snackBarFailedDelete: false}],
      // snackBarDelete: false,
      // snackBarFailedDelete: false,
      currentPage: 0,
      currentContent: "",
      generatedContents: [],
      // currentContent: <SchedViewHome/>,
      // generatedContents: [<SchedViewHome/>,<SchedViewHome/>,<SchedViewHome/>],
      pagesCount: 1,
      dataReceived: false,
      schedules: [],
      openModal: false,
      paletteChoices: [],
      chosenPalette: ['#9BCFB8', '#7FB174', '#689C97', '#072A24', '#D1DDDB', '#85B8CB', '#1D6A96', '#283B42','#FFB53C', '#EEB3A3', '#F3355C', '#FAA98B', '#E6AECF', '#AEE0DD', '#01ACBD','#FED770', ' #F29F8F', '#FB7552', '#076A67','#324856', '#4A746A', '#D18237', '#D66C44', '#FFA289', '#6A92CC', '#706FAB', '#50293C'],
      classboxDetailsList: [
        {id: 1, title: "showFaculty", checked: true},
        {id: 2, title: "showTime", checked: true},
        {id: 3, title: "showRoom", checked: true}
      ]
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

  componentWillMount(){
    axios.get('https://archerone-backend.herokuapp.com/api/schedulelist/'+localStorage.getItem('user_id')+'/')
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
        console.log(schedules)
        this.setState({schedules});
        this.setSchedInfo();
        this.setState({success: true});
        this.setState({loading: false});
        this.setState({dataReceived: true})
    }).catch(error => {
        console.log(error)
        this.setState({success: false});
        this.setState({loading: false});
    })
  }

  setSchedInfo = () => {
    console.log(this.state.schedules)
    var generatedContents = this.state.schedules.map((item, index) =>
        <SchedViewHome key={item.id} id={item.id} offerings={item.offerings} tableContent={item.tableContent} scheduleContent={item.scheduleContent} titleName={item.title} updateSchedTitle={this.updateSchedTitle} palette={this.state.chosenPalette}/>
    );
    this.setState({currentPage: 0})
    this.setState({generatedContents});
    // this.setState({hideGenContent: false});
    this.setState({pagesCount: generatedContents.length});
    this.setState({currentContent: generatedContents[0]})

  }

  updateSchedTitle=(text)=>{
    var newArray = [];
    const currentContent = this.state.currentContent;
    // var index = newArray.findIndex(this.state.currentContent);
    axios.patch('https://archerone-backend.herokuapp.com/api/schedules/'+currentContent.props.id+'/',{
      title: text
    }).catch(err => {
      console.log(err.response)
    })
    const newContent = <SchedViewHome key={currentContent.props.id} id={currentContent.props.id} scheduleContent={currentContent.props.scheduleContent} tableContent={currentContent.props.tableContent} prefContent={currentContent.props.prefContent} conflictsContent={currentContent.props.conflictsContent} titleName={text} updateSchedTitle={this.updateSchedTitle}/>

    this.state.generatedContents.map(value=>{
        if(value.key == this.state.currentContent.key){
            newArray.push(newContent)
        }else{
            newArray.push(value)
        }
    })

    this.setState({generatedContents: newArray});
  }

 deleteSchedule=()=>{
  var newSchedule = [...this.state.generatedContents];
  var currentPage = this.state.currentPage;
  var index = currentPage;

  axios.delete('https://archerone-backend.herokuapp.com/api/schedules/'+this.state.currentContent.props.id+'/')
  .catch(err => {
    console.log(err.response)
  })
  
  if(index !== -1){
    newSchedule.splice(index, 1);
  }
  this.setState({generatedContents: newSchedule})

  if(currentPage == this.state.generatedContents.length - 1){
    currentPage = currentPage - 1;
    this.setState({currentPage});
    this.setState({currentContent: this.state.generatedContents[currentPage-1]});

  }
    this.setState({openAlert: false});

    let snackBarVariables = [...this.state.snackBarVariables];
    snackBarVariables[0].snackBarDelete = true;
    // snackBarVariables[1].snackBarFailedDelete = true;
    this.setState({snackBarVariables});
    console.log(snackBarVariables);
 }

 handleClickOpenAlert = () => {
   this.setState({openAlert: true});
  }

  handleCloseAlert = () => {
    this.setState({openAlert: false});
  }

  handleCloseSnackBar = (event, reason, snackBarIndex) => {
    console.log(event);
    console.log(reason);

    if (reason === 'clickaway') {
      return;
    }
    
  
    let snackBarVariables = [...this.state.snackBarVariables];
    if(snackBarIndex == 0){
      snackBarVariables[0].snackBarDelete = false;
    }else if(snackBarIndex == 1){
      snackBarVariables[1].snackBarFailedDelete = false;
    }
    this.setState({snackBarVariables});
  }

  exportSched = () => {
    html2canvas(document.querySelector("#savedSchedContent")).then(canvas => {
      document.location.href = canvas.toDataURL().replace('image/png', 'image/octet-stream');
    });
  }

  handleCloseModal = ()=>{
    this.setState({openModal: false})
  }

  handleOpenModal = ()=>{
    console.log("Hello opening modal");
    this.setState({openModal: true})
    console.log(this.state.openModal);
  }

  toggleModal = () => {
    var openModalVar = this.state.openModal;
    this.setState({openModal: !openModalVar});
  }

  processPaletteChoices = (title, paletteArray) => {
    const colorDiv = paletteArray.map(function(palColor, index){
                        var newstyle = {backgroundColor: palColor, color: palColor, width:"50px", fontSize:"8px", padding: "1em", display: "table-cell"};
                        if(index == 0){
                          newstyle = {backgroundColor: palColor, color: palColor, width:"50px", fontSize:"8px", padding: "1em", display: "table-cell", borderRadius: "100px 0px 0px 100px" };
                        }else if(index == paletteArray.length - 1){
                          newstyle = {backgroundColor: palColor, color: palColor, width:"50px", fontSize:"8px", padding: "1em", display: "table-cell", borderRadius: "0px 100px 100px 0px" };
                        }
                      return(
                        <div key={index} style= {newstyle}>
                          {palColor}
                        </div>
                      )
                    });

      const paletteDiv = <div className={"colorContainer"} style={{width: "50%", display: "table"}}> {colorDiv}</div>

      var paletteChoices = this.state.paletteChoices;
      paletteChoices.push({id: this.state.paletteChoices.length, title: title, paletteDiv: paletteDiv, paletteArray: paletteArray});
      console.log(paletteChoices);
      this.setState({paletteChoices});
  }
  
  componentDidMount=()=>{
    var pal1 = ['#EAC9C0', '#DAB2D3', '#9EDAE3', '#65C4D8', '#FFD0D6', '#B7DDE0', '#FEE19F', '#735b69'];
    var pal2 = ['#A9DFED', '#EBD6E8', '#84C0E9', '#37419A', '#7CCAAE', '#A299CA', '#FFb69B', '#ECEC84'];
    var pal3 = ['#9BCFB8', '#7FB174', '#689C97', '#072A24', '#D1DDDB', '#85B8CB', '#1D6A96', '#283B42', ];
    this.processPaletteChoices('Pastel Blossoms', pal1);
    this.processPaletteChoices('Halographic', pal2);
    this.processPaletteChoices('Plantita', pal3);
  }

  handlePaletteChange=(event)=>{
    var chosenPalette = event.target.value;
    this.setState({chosenPalette});
    console.log(chosenPalette);
  }

  handleClassBoxChange = (event) => {
    var newDetailsList = [...this.state.classboxDetailsList];
    newDetailsList.map(value=>{
        if(value.id === Number(event.target.id)){
            value.checked = event.target.checked;
        }
    })
    this.setState({classboxDetailsList: newDetailsList});
    // this.setState({[event.target.name]: event.target.checked });
  };

    render() {
        this.state.pagesCount = this.state.generatedContents.length;
        this.state.currentContent = this.state.generatedContents[this.state.currentPage];

        const { classes } = this.props;

      return (
        <div style={!this.props.logged_in? sectionStyle : {}}>
          {this.props.menu()}

          {this.state.dataReceived ? 
          <div className={"homepage"} style={this.props.logged_in ? {} : {display: "none"}}>
            <div className={"hasContent"} style={(this.state.generatedContents.length > 0) ? {} : {display: "none"}}>

              
            <Grid container>
              <Grid item xs={12}>
                <br></br>
                    <Typography gutterBottom variant="h3" align="center">
                      FIRST TRIMESTER, AY 2019 - 2020
                    </Typography>
              </Grid>

              <Grid item xs={2}>
              </Grid>

              <Grid item xs={6}>
                <div id='savedContent' className='savedContent'>
                    <span>{this.state.currentContent}</span>
                </div>
              </Grid>

              {/* <Grid item xs={1}>
              </Grid> */}
       
              <Grid item xs={4} align="center" alignItems="center" alignContent="center" direction="column">
                <div class='optionList'>
                  <Grid item xs={1} direction="column" align="center">
                    <Button
                      variant="contained"
                      className={classes.buttonStyle}
                      endIcon={<DateRangeIcon/>}
                      >
                      Edit
                    </Button>
                  </Grid>

                  <Grid item xs={1} direction="column" align="center">
                    <Button
                    variant="contained"
                    className={classes.buttonStyle}
                    onClick={this.handleOpenModal}
                    endIcon={<PaletteIcon/>}
                    >
                      Customize
                    </Button>
                    <Modal isOpen={this.state.openModal} toggle={this.toggleModal} returnFocusAfterClose={false} backdrop="static" data-keyboard="false">
                      <ModalHeader toggle={this.toggleModal}>Customize Schedule</ModalHeader>
                      <ModalBody>
                        <h4>Color Palette</h4>
                        Select a class box color palette
                  
                        <div>
                        <TextField
                            id="outlined-select-break"
                            select
                            label="class box color palette"
                            onChange={this.handlePaletteChange}
                            
                            helperText="Choose a color palette"
                            variant="outlined"
                            style={{width: "100%", marginTop: "20px", marginBottom: "20px"}}
                            >
                            
                            {/* <MenuItem key={1} value={"option.value"}>
                                {trycolor}
                            </MenuItem> */}
                                  
                            {this.state.paletteChoices.map((option) => (
                                <MenuItem key={option.title} value={option.paletteArray}>
                                {option.paletteDiv}
                                </MenuItem>
                                    ))}
                        </TextField>
                        </div>
                        
                        <h4>Class Box Details</h4>
                        <div>
                          <FormGroup>
                              <FormControlLabel
                              control = {<GreenCheckbox checked={this.state.classboxDetailsList[0].checked} onChange={this.handleClassBoxChange} id={this.state.classboxDetailsList[0].id} color="primary"/>}label="Show name of faculty" />
                              <FormControlLabel
                              control = {<GreenCheckbox checked={this.state.classboxDetailsList[1].checked} onChange={this.handleClassBoxChange} id={this.state.classboxDetailsList[1].id} color="primary"/>}label="Show start and end time" />
                              <FormControlLabel
                              control = {<GreenCheckbox checked={this.state.classboxDetailsList[2].checked} onChange={this.handleClassBoxChange} id={this.state.classboxDetailsList[2].id} color="primary"/>}label="Show room assigned" />
                          </FormGroup>
                        </div>
                      </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggleModal}>Save Changes</Button>{' '}
                      <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                  </Modal>    
                  </Grid>

                  <Grid item xs={1} direction="column" align="center">
                    <Button
                      variant="contained"
                      className={classes.buttonStyle}
                      onClick={this.exportSched}
                      endIcon={ <GetAppIcon/>}
                      >
                      Export
                    </Button>
                  </Grid>

                  <Grid item xs={1} direction="column" align="center">
                    <Button
                      variant="contained"
                      className={classes.deleteButtonStyle}
                      onClick={this.handleClickOpenAlert}
                      endIcon={<DeleteIcon/>}
                      >
                      Delete
                    </Button>
                      {this.state.currentContent != null ?
                      <Dialog
                        open={this.state.openAlert}
                        onClose={this.handleCloseAlert}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{"Schedule Deletion"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you deleting "{this.state.currentContent.props.titleName}" from your saved schedules?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleCloseAlert} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={this.deleteSchedule} color="primary" autoFocus>
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                      : null }

                      <Snackbar open={this.state.snackBarVariables[0].snackBarDelete} autoHideDuration={4000} onClose={(event, reason)=>this.handleCloseSnackBar(event, reason,0)}>
                        <Alert onClose={(event, reason)=>this.handleCloseSnackBar(event, reason, 0)} severity="success">
                          Your schedule has been successfully discarded!
                        </Alert>
                      </Snackbar>

                      <Snackbar open={this.state.snackBarVariables[1].snackBarFailedDelete} autoHideDuration={4000} onClose={(event, reason)=>this.handleCloseSnackBar(event, reason, 1)}>
                        <Alert onClose={(event, reason)=>this.handleCloseSnackBar(event, reason, 1)} severity="error">
                        Delete failed
                        </Alert>
                      </Snackbar> 
                  </Grid>

                  </div>
              </Grid>

              <Grid item xs={12} justify="center" alignItems="center">
              <Row horizontal='center'>
              <div className = "paginationContainer" style={(this.state.generatedContents != null) ? {} : {display: "none"}}>
                
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
                
              </div>
              </Row>
              </Grid>

            </Grid>

            </div> 
                          
                        
            <div className={"hasNoContent"} style={(this.state.generatedContents.length <= 0) ? {} : {display: "none"}}>
              <Typography gutterBottom variant="h4" align="center" style={{marginTop: "30px"}}>
                    You haven't made any schedules yet!
              </Typography>
                <center>
                  <a href="/generateSchedule" style={{textDecoration: "none"}}>
                  <Button
                    variant="contained"
                    className={classes.buttonStyle}
                    >
                    Create Schedule
                  </Button>
                </a>
              </center>
            </div>

          </div>
          :
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
            <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
          </div>
          
          }

          <div className={"landingpage"} style={!this.props.logged_in? {height:"100%"} : {display: "none"}}>
          
          <img src={whiteBlob} className={"whiteBlob"}/>
          <Grid container spacing={3}>
            <Grid item xs={6}>
                  <Typography gutterBottom variant="h3" align="center">
                    Create your schedule!
                  </Typography>
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
              <img src={calendarIcon} className={"iconStyle"}/>
            </Grid>
            <Grid item xs={3}>
                            <Typography variant="body1" gutterBottom>
                              Enter your courses, 
                              set your schedule, 
                              and choose your schedule, 
                              generate automatically
                          </Typography>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={2} style={{zIndex:"100"}}>
              {/* <center><button type="button" class="btn btn-success">Create Schedule</button></center> */}
              <center>
                <Button
                  variant="contained"
                  className={classes.buttonStyle}
     
                  // style={{backgroundColor: "green"}}
                  >
                  Create Schedule
                </Button>
              </center>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
              <img src={attachIcon} className={"iconStyle"}/>
            </Grid>
            <Grid item xs={3}>
                            <Typography variant="body1" gutterBottom>
                            Customize the look of your
                            schedule and save it as an image.
                          </Typography>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={2} style={{zIndex:"100"}}>
              <br></br>
              <Typography variant="body1" gutterBottom align="center" style={{color:"gray"}}>
                OR
              </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
              <img src={laughIcon} className={"iconStyle"}/>
            </Grid>
        
            <Grid item xs={3}>
                            <Typography variant="body1" gutterBottom>
                            Share your schedules,
                            view your friends' schedules, 
                            making schedule coordination easier
                            {/* collaborate with friends
                            and create schedules
                            as a group. */}
                          </Typography>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={2} style={{zIndex:"100"}}>
              {/* <center><button type="button" class="btn btn-success">Check Flowchart</button></center> */}
              <center>
                <Button
                  variant="contained"
                  className={classes.buttonStyle}
     
                  // style={{backgroundColor: "green"}}
                  >
                  Check Flowchart
                </Button>
              </center>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>
          </div>
        </div>        
      );
    }
  }

  Index.propTypes={
  classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Index);