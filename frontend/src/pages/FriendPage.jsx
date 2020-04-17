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
            dataReceived: false,
            allowEdit: false,
            openAlert: false,
            selectedFriend: "",
            hasSelectedFriend: false,
            schedules: [],

            college: '', 
            degree: '',
            idnum: '',
        }
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
        this.setState({currentPage: 0})
        this.setState({generatedContents});
        // this.setState({hideGenContent: false});
        this.setState({pagesCount: generatedContents.length});
        this.setState({currentContent: generatedContents[0]})
    
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
        const requests = this.state.requests
        this.setState({college: requests[i].college, degree: requests[i].degree, idnum: requests[i].id_num}, () => {
            this.setState({hasSelectedFriend: true})
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

                    {this.state.hasSelectedFriend ?
                    <div class="sidemenu-main">
                        <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                            <Tab eventKey="details" title="Details">
                                <div className="friendName">
                                    <center><h1> Name </h1></center>
                                </div>

                                <div className="friendDetails">
                                    <div class="columnn" style={{float: "left", width: "65%"}}>
                                        <div>
                                            <h3> Details </h3>
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
                                            <h3> Preferences </h3>
                                            <Table responsive size="sm">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Earliest Time</th>
                                                        <td>07:30 AM</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Latest Time</th>
                                                        <td>09:00 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Break Length</th>
                                                        <td>15 Minutes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Faculty</th>
                                                        <td>
                                                        <Autocomplete
                                                            disabled
                                                            // multiple
                                                            id="combo-box-demo"
                                                            // options={this.state.programList}
                                                            // getOptionLabel={option => option.name}
                                                            // style={{ width: 500 }}
                                                            renderInput={params => <TextField {...params} label="" variant="outlined" />}
                                                            // value={this.state.value}
                                                            // inputValue={this.state.value}
                                                            // searchText={this.state.value}
                                                            // onChange={this.props.onChange}
                                                        />
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
                                        <Typography gutterBottom variant="h3" align="center">
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
                    : null}
                </div>
                : null}
            </div>     
        );
    }
}

  FriendPage.propTypes={
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(FriendPage);