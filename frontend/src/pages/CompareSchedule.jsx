import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import '../css/CompareSchedule.css';

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
      marginLeft: "5px",
    '&:hover': {
        color: "#d3d3d3"
      },
    },
  });

class CompareSchedule extends Component {
    state = {  }
    render() {
        const { classes } = this.props; 
        return (  
            <div>
                <div class="sidenav">
                    <a className="backBtn" href="/view_friends">
                    <div className={"backBtn"}></div>
                    <ArrowBackIosIcon fontSize="large"className={classes.backBtn} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
                    </a>
                    {/* <img class='img-responsive' id='lower' src={SidebarIMG}/> */}
                </div>

            </div>
        );
    }
}

CompareSchedule.propTypes={
    classes: PropTypes.object.isRequired,
  };
    export default withStyles(styles)(CompareSchedule);