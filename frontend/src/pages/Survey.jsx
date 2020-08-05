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
            dataReceived: true,
            wordList:[
              {
                id: 1,
                word: "Accessible",
                weight: 1,
                checked: false,},
              {   
                id: 2,
                weight: 1,
                word: "Advanced",
                checked: false,},
            { 
                id: 3,
                weight: 1,
                word: "Ambiguous",
                checked: false,},
            {
                id: 4,
                weight: 1,
                word: "Annoying",
                checked: false,},
            {
                id: 5, 
                weight: 1,
                word: "Appealing",
                checked: false,},
            {
                id: 6,
                weight: 1,
                word: "Approachable",
                checked: false,},
            { 
                id: 7,
                weight: 1,
                word: "Attractive",
                checked: false,},
            { 
                id: 8,
                weight: 1,
                word: "Awkward",
                checked: false,},
              {
                id: 9,
                word: "Boring",
                weight: 1,
                checked: false,},
              {   
                id: 10,
                weight: 1,
                word: "Bright",
                checked: false,},
              { 
                  id: 11,
                  weight: 1,
                  word: "Business-like",
                  checked: false,},
              {
                  id: 12,
                  weight: 1,
                  word: "Busy",
                  checked: false,},
              {
                  id: 13, 
                  weight: 1,
                  word: "Clean",
                  checked: false,},
              {
                  id: 14,
                  weight: 1,
                  word: "Clear",
                  checked: false,},
              { 
                  id: 15,
                  weight: 1,
                  word: "Cluttered",
                  checked: false,},
              { 
                  id: 16,
                  weight: 1,
                  word: "Compelling",
                  checked: false,},
                {
                  id: 17,
                  word: "Complex",
                  weight: 1,
                  checked: false,},
                {   
                  id: 18,
                  weight: 1,
                  word: "Complex",
                  checked: false,},
                { 
                    id: 19,
                    weight: 1,
                    word: "Comprehensive",
                    checked: false,},
                {
                    id: 20,
                    weight: 1,
                    word: "Confusing",
                    checked: false,},
                {
                    id: 21, 
                    weight: 1,
                    word: "Consistent",
                    checked: false,},
                {
                    id: 22,
                    weight: 1,
                    word: "Contradictory",
                    checked: false,},
                { 
                    id: 23,
                    weight: 1,
                    word: "Controllable",
                    checked: false,},
                { 
                    id: 24,
                    weight: 1,
                    word: "Convenient",
                    checked: false,},
                    {
                      id: 25,
                      word: "Counter-intuitive",
                      weight: 1,
                      checked: false,},
                    {   
                      id: 26,
                      weight: 1,
                      word: "Creative",
                      checked: false,},
                  { 
                      id: 27,
                      weight: 1,
                      word: "Credible",
                      checked: false,},
                  {
                      id: 28,
                      weight: 1,
                      word: "Cutting edge",
                      checked: false,},
                  {
                      id: 29, 
                      weight: 1,
                      word: "Dated",
                      checked: false,},
                  {
                      id: 30,
                      weight: 1,
                      word: "Desirable",
                      checked: false,},
                  { 
                      id: 31,
                      weight: 1,
                      word: "Difficult",
                      checked: false,},
                  { 
                      id: 32,
                      weight: 1,
                      word: "Distracting",
                      checked: false,},
                      {
                        id: 33,
                        word: "Dull",
                        weight: 1,
                        checked: false,},
                      {   
                        id: 34,
                        weight: 1,
                        word: "Easy to use",
                        checked: false,},
                    { 
                        id: 35,
                        weight: 1,
                        word: "Effective",
                        checked: false,},
                    {
                        id: 36, 
                        weight: 1,
                        word: "Effortless",
                        checked: false,},
                    {
                        id: 37,
                        weight: 1,
                        word: "Empowering",
                        checked: false,},
                    { 
                        id: 38,
                        weight: 1,
                        word: "Energetic",
                        checked: false,},
                    { 
                        id: 39,
                        weight: 1,
                        word: "Engaging",
                        checked: false,},
                        {
                          id: 40,
                          word: "Entertaining",
                          weight: 1,
                          checked: false,},
                        {   
                          id: 41,
                          weight: 1,
                          word: "Exciting",
                          checked: false,},
                      { 
                          id: 42,
                          weight: 1,
                          word: "Expected",
                          checked: false,},
                      {
                          id: 43,
                          weight: 1,
                          word: "Familiar",
                          checked: false,},
                      {
                          id: 44, 
                          weight: 1,
                          word: "Fast",
                          checked: false,},
                      {
                          id: 45,
                          weight: 1,
                          word: "Fault",
                          checked: false,},
                      { 
                          id: 46,
                          weight: 1,
                          word: "Flexible",
                          checked: false,},
                      { 
                          id: 47,
                          weight: 1,
                          word: "Fresh",
                          checked: false,},
                          { 
                            id: 48,
                            weight: 1,
                            word: "Friendly",
                            checked: false,},
                        { 
                            id: 49,
                            weight: 1,
                            word: "Frustrating",
                            checked: false,},
                            {
                              id: 50,
                              word: "Fun",
                              weight: 1,
                              checked: false,},
                            {   
                              id: 51,
                              weight: 1,
                              word: "Hard to use",
                              checked: false,},
                          { 
                              id: 52,
                              weight: 1,
                              word: "High quality",
                              checked: false,},
                          {
                              id: 53,
                              weight: 1,
                              word: "Illogical",
                              checked: false,},
                          {
                              id: 54, 
                              weight: 1,
                              word: "Impressive",
                              checked: false,},
                          {
                              id: 55,
                              weight: 1,
                              word: "Inadequate",
                              checked: false,},
                          { 
                              id: 56,
                              weight: 1,
                              word: "Incomprehensive",
                              checked: false,},
                          { 
                              id: 57,
                              weight: 1,
                              word: "Inconsisntent",
                              checked: false,},
                              {
                                id: 58,
                                word: "Ineffective",
                                weight: 1,
                                checked: false,},
                              {   
                                id: 59,
                                weight: 1,
                                word: "Innovative",
                                checked: false,},
                              { 
                                  id: 60,
                                  weight: 1,
                                  word: "Insecuree",
                                  checked: false,},
                              {
                                  id: 61,
                                  weight: 1,
                                  word: "Intimidating",
                                  checked: false,},
                              {
                                  id: 62, 
                                  weight: 1,
                                  word: "Intuive",
                                  checked: false,},
                              {
                                  id: 63,
                                  weight: 1,
                                  word: "Irrelevant",
                                  checked: false,},
                              { 
                                  id: 64,
                                  weight: 1,
                                  word: "Meaningful",
                                  checked: false,},
                              { 
                                  id: 65,
                                  weight: 1,
                                  word: "Misleading",
                                  checked: false,},
                                {
                                  id: 66,
                                  word: "Motivating",
                                  weight: 1,
                                  checked: false,},
                                {   
                                  id: 67,
                                  weight: 1,
                                  word: "New",
                                  checked: false,},
                                { 
                                    id: 68,
                                    weight: 1,
                                    word: "Non-standard",
                                    checked: false,},
                                {
                                    id: 69,
                                    weight: 1,
                                    word: "Obscure",
                                    checked: false,},
                                {
                                    id: 70, 
                                    weight: 1,
                                    word: "Old",
                                    checked: false,},
                                {
                                  id: 71,
                                  word: "Ordinary",
                                  weight: 1,
                                  checked: false,},
                                {   
                                  id: 72,
                                  weight: 1,
                                  word: "Organised",
                                  checked: false,},
                              { 
                                  id: 73,
                                  weight: 1,
                                  word: "Overwhelming",
                                  checked: false,},
                              {
                                  id: 74,
                                  weight: 1,
                                  word: "Patronising",
                                  checked: false,},
                              {
                                  id: 75, 
                                  weight: 1,
                                  word: "Poor quality",
                                  checked: false,},
                              {
                                  id: 76,
                                  weight: 1,
                                  word: "Powerful",
                                  checked: false,},
                              { 
                                  id: 77,
                                  weight: 1,
                                  word: "Predictable",
                                  checked: false,},
                              { 
                                  id: 78,
                                  weight: 1,
                                  word: "Professional",
                                  checked: false,},
                                {
                                  id: 79,
                                  word: "Relevant",
                                  weight: 1,
                                  checked: false,},
                                {   
                                  id: 80,
                                  weight: 1,
                                  word: "Reliable",
                                  checked: false,},
                                { 
                                    id: 81,
                                    weight: 1,
                                    word: "Responsive",
                                    checked: false,},
                                {
                                    id: 82,
                                    weight: 1,
                                    word: "Rigid",
                                    checked: false,},
                                {
                                    id: 83, 
                                    weight: 1,
                                    word: "Satisfying",
                                    checked: false,},
                                {
                                    id: 84,
                                    weight: 1,
                                    word: "Secure",
                                    checked: false,},
                                { 
                                    id: 85,
                                    weight: 1,
                                    word: "Simple",
                                    checked: false,},
                                { 
                                    id: 86,
                                    weight: 1,
                                    word: "Simplistic",
                                    checked: false,},
                                  {
                                    id: 87,
                                    word: "Slow",
                                    weight: 1,
                                    checked: false,},
                                  {   
                                    id: 88,
                                    weight: 1,
                                    word: "Sophisticated",
                                    checked: false,},
                                  { 
                                      id: 89,
                                      weight: 1,
                                      word: "Stable",
                                      checked: false,},
                                  {
                                      id: 90,
                                      weight: 1,
                                      word: "Stimulating",
                                      checked: false,},
                                  {
                                      id: 91, 
                                      weight: 1,
                                      word: "Straightforward",
                                      checked: false,},
                                  {
                                      id: 92,
                                      weight: 1,
                                      word: "Stressful",
                                      checked: false,},
                                  { 
                                      id: 93,
                                      weight: 1,
                                      word: "System-oriented",
                                      checked: false,},
                                  { 
                                      id: 94,
                                      weight: 1,
                                      word: "Time-consuming",
                                      checked: false,},
                                      {
                                        id: 95,
                                        word: "Time-saving",
                                        weight: 1,
                                        checked: false,},
                                      {   
                                        id: 96,
                                        weight: 1,
                                        word: "Too technical",
                                        checked: false,},
                                    { 
                                        id: 97,
                                        weight: 1,
                                        word: "Trustworthy",
                                        checked: false,},
                                    {
                                        id: 98,
                                        weight: 1,
                                        word: "Unattractive",
                                        checked: false,},
                                    {
                                        id: 99, 
                                        weight: 1,
                                        word: "Unconventional",
                                        checked: false,},
                                    {
                                        id: 100,
                                        weight: 1,
                                        word: "Understandable",
                                        checked: false,},
                                    { 
                                        id: 101,
                                        weight: 1,
                                        word: "Unpredictable",
                                        checked: false,},
                                    { 
                                        id: 102,
                                        weight: 1,
                                        word: "Unrefined",
                                        checked: false,},
                                        {
                                          id: 103,
                                          word: "Usable",
                                          weight: 1,
                                          checked: false,},
                                        {   
                                          id: 104,
                                          weight: 1,
                                          word: "Useful",
                                          checked: false,},
                                      { 
                                          id: 105,
                                          weight: 1,
                                          word: "Vague",
                                          checked: false,},
 
              
            ],
        }
    }

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
        

    }

    handleWordChange = (event) => {
      var newWordList = [...this.state.wordList];
      newWordList.map(value=>{
          if(value.id === Number(event.target.id)){
              value.checked = event.target.checked;
          }
      })
      this.setState({wordList: newWordList});
      // this.setState({[event.target.name]: event.target.checked });
   };

    render() {
        const { classes } = this.props;
        const valuetext = "1";
        const marks = [
            {
              value: 1.367578,
              label: 'Not at all hard to do',
            },
            {
              value: 11.62609,
              label: 'Not very hard to do',
            },
            {
              value: 25.53207,
              label: 'A bit hard to do',
            },
            {
              value: 36.47449,
              label: 'Fairly hard to do',
            },
            {
              value: 56.30762,
              label: 'Rather hard to do',
            },
            {
              value: 70.66954,
              label: 'Pretty hard to do',
            },
            {
              value: 85.03146,
              label: 'Very hard to do',
            },
            {
              value: 101.4450,
              label: 'Very very hard to do',
            },
            {
              value: 113.4133,
              label: 'Tremendously hard to do',
            },
          ];
      return (
        <div>
            {this.props.menu('preferences')}

                {this.state.dataReceived ? 
                <div className="preference-category">
                  <h1 style={{marginTop: "20px"}}>Survey</h1>
                  <span>Include descriptions about this</span>
                        <div>
                        </div>
                            <div className="timePreferences">
                                <h2>SUS Survey
                                </h2>
                                <div className="preference-category-content">
                                    <div className="scale">
                                        <span className={"survey-statements"}>I think I would like to use this system frequently</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span >Strongly Disagree</span>
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
                                        <span className={"survey-statements"}>I found the system unnecessarily complex</span>
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
                                        <span className={"survey-statements"}>I thought the system was easy to use</span>
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
                                        <span className={"survey-statements"}>I think that I would need the support of a technical person to be able to use this system</span>
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
                                        <span className={"survey-statements"}>I found the various functions in this system well integrated</span>
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
                                        <span className={"survey-statements"}>I thought there was too much inconsistency in this system</span>
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
                                        <span className={"survey-statements"}>I would imagine that most people will learn to use this system very quickly</span>
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
                                        <span className={"survey-statements"}>I found the system very difficult/awkward to use the system very quickly</span>
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
                                        <span className={"survey-statements"}>I felt very confident using the system</span>
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
                                        <span className={"survey-statements"}>I needed to learn a lot of things before I could get going with this system confident using the system</span>
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

                            <div className="ueq-survey">
                                <h2>User Experience Questionnaire
                                </h2>
                                <div className="preference-category-content">
                                    <div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>annoying</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>enjoyable</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>not understandable</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>understandable</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>creative</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>dull</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>easy to learn</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>difficult to learn</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>valuable</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>inferior</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>boring</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>exciting</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>not interesting</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>interesting</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>unpredictable</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>predictable</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>fast</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>enjoyable</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>inventive</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>conventional</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>obstructive</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>supportive</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>good</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>bad</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>complicated</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>easy</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>unlikable</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>pleasing</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>usual</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>leading edge</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>unpleasant</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>pleasant</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>secure</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>unsecure</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>motivating</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>demotivating</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>inefficient</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>efficient</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>clear</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>confusing</span>
                                        </RadioGroup>
                                    </div><div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>impractical</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>practical</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>organized</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>cluttered</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>attractive</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>unattractive</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>friendly</span>
                                            <FormControlLabel
                                            value="3"
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
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>unfriendly</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>conservative</span>
                                            <FormControlLabel
                                            value="-3"
                                            control={<GreenRadio/>}
                                            label="1"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-2"
                                            control={<GreenRadio/>}
                                            label="2"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="-1"
                                            control={<GreenRadio/>}
                                            label="3"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="0"
                                            control={<GreenRadio/>}
                                            label="4"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="1"
                                            control={<GreenRadio/>}
                                            label="5"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="2"
                                            control={<GreenRadio/>}
                                            label="6"
                                            labelPlacement="top"
                                            />
                                            <FormControlLabel
                                            value="3"
                                            control={<GreenRadio/>}
                                            label="7"
                                            labelPlacement="top"
                                            />
                                        <span>innovative</span>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>

                            <div className="classDetails">
                                <h2>Class Details</h2>
                                
                                <div className="preference-category-content">
                                
                                    <div className={'wordlist-survey'}>
                                        <div className={'subheader'}>Word List</div>
                                        <Grid container spacing={6}>
                                            <Grid item xs={6}>
                                              
                                            <FormGroup>
                                              {this.state.wordList.filter(word => word.id < 36).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/>}label={filteredWord.word} />;
                                                })}
                                            
                                            </FormGroup>
                                            </Grid>

                                            <Grid item xs={6}>
                                            <FormGroup>
                                                {this.state.wordList.filter(word => word.id >= 36 && word.id <= 70).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/>}label={filteredWord.word} />;
                                                })}
                                                {/* <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[0].checked} onChange={this.handleWordChange} id={this.state.wordList[0].id}  color="primary"/>}label={this.state.wordList[0].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[1].checked} onChange={this.handleWordChange} id={this.state.wordList[1].id} color="primary"/>}label={this.state.wordList[1].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[2].checked} onChange={this.handleWordChange} id={this.state.wordList[2].id} color="primary"/>}label={this.state.wordList[2].word}/>
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[3].checked} onChange={this.handleWordChange} id={this.state.wordList[3].id} color="primary"/>}label={this.state.wordList[3].word} /> */}
                                            </FormGroup>
                                            </Grid>

                                            <Grid item xs={6}>
                                            <FormGroup>
                                                {this.state.wordList.filter(word => word.id > 70 && word.id <= 105).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/>}label={filteredWord.word} />;
                                                })}
                                                {/* <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[0].checked} onChange={this.handleWordChange} id={this.state.wordList[0].id}  color="primary"/>}label={this.state.wordList[0].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[1].checked} onChange={this.handleWordChange} id={this.state.wordList[1].id} color="primary"/>}label={this.state.wordList[1].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[2].checked} onChange={this.handleWordChange} id={this.state.wordList[2].id} color="primary"/>}label={this.state.wordList[2].word}/>
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[3].checked} onChange={this.handleWordChange} id={this.state.wordList[3].id} color="primary"/>}label={this.state.wordList[3].word} /> */}
                                            </FormGroup>
                                            </Grid>
                                        </Grid>
                                    </div>
                                  </div>
                                </div>

                            <h1 style={{marginTop: "20px"}}>Experiment A - Solo Schedule Creation</h1>
                            <span>Include descriptions about this</span>

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
                                max={150}
                                />
                                </div>
                                    
                                </div>
                            </div>
                          
                            <div className="cognitive-survey">
                                <h2>Cognitive Load
                                </h2>
                                <div className="preference-category-content">
                                    <div className="scale">
                                        <span className={"survey-statements"}>Overall, the task of creating a schedule for yourself was?</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Keeping track of the classes I like.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Keeping track of the classes I don't like.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Resolving course conflicts.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Keeping track of the schedule I want.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Adjusting my schedule based on changes.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>

                            <div className="decision-survey">
                                <h2>Decision-Making
                                </h2>
                                <div className="preference-category-content">
                                  <div className="scale">
                                        <span className={"survey-statements"}>Efficiently weighing my options and decisions.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Picking my classes.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Picking a final schedule.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                    <div className="scale">
                                        <span className={"survey-statements"}>Prioritizing my preferences.</span>
                                        <RadioGroup row aria-label="position" name="position" >
                                            <span>Very Difficult</span>
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
                                        <span>Very Easy</span>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="cognitive-survey">
                                <h2>Cognitive Load
                                </h2>
                                <div className="preference-category-content">
                                    <div className="scale">
                                        <span className={"survey-statements"}>I think I would like to use this system frequently</span>
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
                            </div> */}

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