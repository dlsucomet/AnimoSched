import React, { Component } from "react";
import '../css/Preferences.css';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
// import { IconButton, InputAdornment } from "@material-ui/core";
// import DateFnsUtils from '@date-io/date-fns';

import { green, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import HomeIcon from '@material-ui/icons/Home';

import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';

const GreenRadio = withStyles({
    root: {
      '&$checked': {
        color: green[600],
      },
      // '&label': {
      //   color: green[600],
      // }
    },
    checked: {},
    // label: {},
  })((props) => <Radio color="default" {...props} />)

  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const styles = theme => ({
    homeButton:{
        color: "green", 
        marginLeft: "10px",
        '&:hover': {
            color: "#79c879"
          },
    },

    iconStyle:{ 
        margin: "10px", 
          '&:hover': {
            color: green[500],
        },
    },
    buttonStyle:{
        marginBottom: "50px",
        textTransform: "none",
        width: "160px",
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
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: "white",
            color: "#16775D"
        },
    }
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

class Preferences extends Component {
    constructor(props){
        super(props)
        this.state = {

            selectedValue: 0,
            dataReceived: true
        }
    }

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
        

    }

    render() {
        const { classes } = this.props;
        const valuetext = "1";
        const marks = [
            {
              value: 0,
              label: 'Not at all hard to do',
            },
            {
              value: 10,
              label: 'Not very hard to do',
            },
            {
              value: 20,
              label: 'A bit hard to do',
            },
            {
              value: 30,
              label: 'Fairly hard to do',
            },
          ];
      return (
        <div>
            {this.props.menu('preferences')}

                {this.state.dataReceived ? 
                <div className="preference-category">

                        <div>
                        </div>
                            <div className="timePreferences">
                                <h2>Likert Scales
                                </h2>
                                <div className="preference-category-content">
                                    <div className="scale">
                                        <span>I think I would like to use this system frequently</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Strongly Disagree</span>
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="4"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="5"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                        <span>Strongly Agree</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span>I think I would like to use this system frequently</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Strongly Disagree</span>
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="4"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="5"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                        <span>Strongly Agree</span>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>

                            <div className="workloadPreferences">
                                <h2>Subjective Mental Effort Questionnaire (SMEQ)
                                </h2>
                                
                                <div className="preference-category-content" >

                                <div className="scale" style={{height: 500}}>
                                <PrettoSlider
                                valueLabelDisplay="auto"
                                orientation="vertical"
                                // getAriaValueText={valuetext}
                                defaultValue={0}
                                aria-labelledby="vertical-slider"
                                marks={marks}
                                />
                                </div>
                                    
                                </div>
                            </div>

                </div>
                : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh"}}>
                    <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
                </div> }
            {/* </div> */}

        </div>        
      );
    }
  }

  Preferences.propTypes={
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Preferences);