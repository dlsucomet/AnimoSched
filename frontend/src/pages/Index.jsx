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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
          backgroundColor: "white",
          borderStyle: "solid",
          borderColor: "#D3D3D3",
        },
  }
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
      schedules: []
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
    axios.get('http://localhost:8000/api/schedulelist/'+localStorage.getItem('user_id')+'/')
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
        <SchedViewHome key={item.id} id={item.id} offerings={item.offerings} tableContent={item.tableContent} scheduleContent={item.scheduleContent} titleName={item.title} updateSchedTitle={this.updateSchedTitle}/>
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
    axios.patch('http://localhost:8000/api/schedules/'+currentContent.props.id+'/',{
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

  axios.delete('http://localhost:8000/api/schedules/'+this.state.currentContent.props.id+'/')
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

              
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <br></br>
                    <Typography gutterBottom variant="h3" align="center">
                      FIRST TRIMESTER, AY 2019 - 2020
                    </Typography>
              </Grid>

              <Grid item xs={1}>
              </Grid>

              <Grid item xs={7}>
                <div id='savedContent' className='savedContent'>
                    <span>{this.state.currentContent}</span>
                </div>
              </Grid>

              {/* <Grid item xs={1}>
              </Grid> */}

              <Grid item xs={4} align="center" direction="column">
                <div class='optionList'>
                  <Button
                      variant="contained"
                      className={classes.buttonStyle}
                      >
                      Edit
                    </Button>
                    <Button
                    variant="contained"
                    className={classes.buttonStyle}
                    >
                    Customize
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.buttonStyle}
                    onClick={this.exportSched}
                    >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.deleteButtonStyle}
                    onClick={this.handleClickOpenAlert}
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
              
              {/* <Row horizontal="center">
                  <div style={(this.state.generatedContents != null) ? {paddingTop:"20px"} : {display: "none"}}>
                    <center ><h3 >FIRST TRIMESTER, AY 2019 - 2020</h3></center>
                  </div>
                </Row>
              <Row horizontal="center"> */}
               
                {/* <Column flexShrink={1} >
                  <div class="sidemenu" >
                    <div style={(this.state.generatedContents != null) ? {} : {display: "none"}}>
                      <center><input type="submit" class="btn btn-success change-term-sched" value="AY1920 T1" /></center>
                      <center><input type="submit" class="btn btn-success change-term-sched" value="AY1819 T3" /></center>
                    </div>
                  </div>
                </Column> */}

                {/* <div className='savedContent'>
                  <Column flexGrow={1}>
                    <span>{this.state.currentContent}</span>
                  </Column>
                </div>

                <Column >
                <div class='optionList'>
                  <Button
                      variant="contained"
                      className={classes.buttonStyle}
                      >
                      Edit
                    </Button>
                    <Button
                    variant="contained"
                    className={classes.buttonStyle}
                    >
                    Customize
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.buttonStyle}
                    >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.deleteButtonStyle}
                    >
                    Delete
                  </Button>
                  </div>
                </Column>

              </Row>

              <Row horizontal='center'>
              <div className = "paginationContainer" style={(this.state.generatedContents != null) ? {} : {display: "none"}}>
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
            </Row>*/}
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
          : null }

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