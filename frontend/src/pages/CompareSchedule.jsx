import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import '../css/CompareSchedule.css';

import Grid from '@material-ui/core/Grid';

import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import SchedViewHome from '../components/SchedViewHome';


const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    backBtn:{
      color: "white",
      /*marginLeft: "5px",*/
    '&:hover': {
        color: "#d3d3d3"
      },
    },
  });

class CompareSchedule extends Component {
     constructor(props){
        super(props);

        this.state = {
            currentPageUser: 0,
            currentContentUser: "Hello User",
            generatedContentsUser: ["I'm", "Not", "Okay"],
            pagesCountUser: 1,
            currentPageFriend: 0,
            currentContentFriend: "Hello Friend",
            generatedContentsFriend: ["I'm", "Okay", "Now"],
            pagesCountFriend: 1,
            schedulesUser: [],
            schedulesFriend: [],
            }
    }
    
    handlePageChange = (e,index, type) => {
        
        if(type == "user"){
            this.setState(state =>{
            var currentContentUser = state.generatedContentsUser[index];
            return {currentContentUser};
          });

          this.setState({currentPageUser: index});
          this.setState(state =>{
            var currentPageUser = index;
            return {currentPageUser};
          });
          console.log("pressed page " + index);
          console.log(this.state.generatedContentsUser[index]);
        }else if (type == "friend"){
            this.setState(state =>{
            var currentContentFriend = state.generatedContentsFriend[index];
            return {currentContentFriend};
          });

          this.setState({currentPageFriend: index});
          this.setState(state =>{
            var currentPageFriend = index;
            return {currentPageFriend};
          });
          console.log("pressed page " + index);
          console.log(this.state.generatedContentsFriend[index]);
        }
      
  }
    
componentWillMount(){
    this.setState({pagesCountUser: this.state.generatedContentsUser.length});
    this.setState({pagesCountFriend: this.state.generatedContentsFriend.length});
    this.setState({currentContentUser: this.state.generatedContentsUser[this.state.currentPageUser]});
    this.setState({currentContentFriend: this.state.generatedContentsFriend[this.state.currentPageFriend]});
    
}

setSchedInfo = (type) => {
    console.log(this.state.schedules)
    const palette = JSON.parse(localStorage.getItem('palette'))
    
    if(type == "user"){
         var generatedContentsUser = this.state.schedulesUser.map((item, index) =>
        <SchedViewHome key={item.id} id={item.id} offerings={item.offerings} tableContent={item.tableContent} scheduleContent={item.scheduleContent} titleName={item.title} allowEdit={this.state.allowEdit} palette={palette}/>
        );
        // this.setState({hideGenContent: false});
        this.setState({generatedContentsUser}, ()=>{
            this.setState({currentContentUser: generatedContentsUser[0]}, () => {
//                this.setState({hasSelectedFriend: true})

            })
            this.setState({pagesCountUser: generatedContentsUser.length});
            this.setState({currentPageUser: 0})
        });

    }else if(type == "friend"){
         var generatedContentsFriend = this.state.schedulesFriend.map((item, index) =>
        <SchedViewHome key={item.id} id={item.id} offerings={item.offerings} tableContent={item.tableContent} scheduleContent={item.scheduleContent} titleName={item.title} allowEdit={this.state.allowEdit} palette={palette}/>
        );
        // this.setState({hideGenContent: false});
        this.setState({generatedContentsFriend}, ()=>{
            this.setState({currentContentFriend: generatedContentsFriend[0]}, () => {
//                this.setState({hasSelectedFriend: true})

            })
            this.setState({pagesCountFriend: generatedContentsFriend.length});
            this.setState({currentPageFriend: 0})
         });
    }

  }
    
    render() {

        
        const { classes } = this.props; 
        return (  
            <div>
                <div class="header" style={{backgroundColor: "#006A4E", padding:"10px"}}>
                    <a className="backBtn" href="/view_friends">
                    <div className={"backBtn"} style={{marginTop: "5px"}}></div>
                    <ArrowBackIosIcon fontSize="large"className={classes.backBtn} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
                    </a>
                    <div style={{color:"white"}}>
                        <center><h5 >FIRST TRIMESTER, AY 2019 - 2020</h5></center>
                    </div>
                    {/* <img class='img-responsive' id='lower' src={SidebarIMG}/> */}
                </div>

                <div>
                     <Grid container style={{marginTop: "30px"}}>
                          <Grid item xs={6}>

                           <center><h6>Your Schedule</h6></center>
                           <center><span>{this.state.currentContentUser}</span></center>
                              <div className = "paginationContainer" style={(this.state.generatedContentsUser != null) ? {} : {display: "none"}}>
                                  <Pagination aria-label="Page navigation example" style={{justifyContent: "center"}}>
                                      <PaginationItem disabled={this.state.currentPageUser <= 0}>
                                          <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPageUser - 1, "user")}
                                              previous/>
                                      </PaginationItem>
                                      {[...Array(this.state.pagesCountUser)].map((page, i) => 
                                          <PaginationItem active={i === this.state.currentPageUser} key={i} className={'paginationItemStyle'}>
                                              <PaginationLink onClick={e => this.handlePageChange(e, i, "user")} className={'paginationLinkStyle'}>
                                              {i + 1}
                                              </PaginationLink>
                                          </PaginationItem>
                                          )}
                                      <PaginationItem disabled={this.state.currentPageUser >= this.state.generatedContentsUser.length - 1}>
                                          <PaginationLink
                                              onClick={e => this.handlePageChange(e, this.state.currentPageUser + 1, "user")}
                                              next
                                          />

                                          </PaginationItem>
                                  </Pagination>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
  
                            <center><h6>Friend's Schedule</h6></center>
                            <center><span>{this.state.currentContentFriend}</span></center>
                            <div className = "paginationContainer" style={(this.state.generatedContentsFriend != null) ? {} : {display: "none"}}>
                              <Pagination aria-label="Page navigation example" style={{justifyContent: "center"}}>
                                  <PaginationItem disabled={this.state.currentPageFriend <= 0}>
                                      <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPageFriend - 1, "friend")}
                                          previous/>
                                  </PaginationItem>
                                  {[...Array(this.state.pagesCountFriend)].map((page, i) => 
                                      <PaginationItem active={i === this.state.currentPageFriend} key={i} className={'paginationItemStyle'}>
                                          <PaginationLink onClick={e => this.handlePageChange(e, i, "friend")} className={'paginationLinkStyle'}>
                                          {i + 1}
                                          </PaginationLink>
                                      </PaginationItem>
                                      )}
                                  <PaginationItem disabled={this.state.currentPageFriend >= this.state.generatedContentsFriend.length - 1}>
                                      <PaginationLink
                                          onClick={e => this.handlePageChange(e, this.state.currentPageFriend + 1, "friend")}
                                          next
                                      />

                                      </PaginationItem>
                              </Pagination>
                            </div>
                      
                          </Grid>
                      </Grid>
                </div>

            </div>
        );
    }
}

CompareSchedule.propTypes={
    classes: PropTypes.object.isRequired,
  };
    export default withStyles(styles)(CompareSchedule);