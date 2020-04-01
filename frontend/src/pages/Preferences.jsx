import React, { Component } from "react";
import '../css/Preferences.css';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
// import { IconButton, InputAdornment } from "@material-ui/core";
// import DateFnsUtils from '@date-io/date-fns';

import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import HomeIcon from '@material-ui/icons/Home';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Preferences extends Component {
    constructor(props){
        super(props)
        this.state = {
            savedPrefBar: false,
            earliest_class_time: '07:30',
            latest_class_time: '21:00',
            break_length: 15,
            min_courses: 0, 
            max_courses: 10,
            dataReceived: false,
            dataSaved: false,
            selectedProfs: [],
            profList: [],
            selectedSections: [],
            sectionList: [],
            
            selectedDate: "",

            daysList:[
                {   id: 1,
                    day: "Monday",
                    checked: true,},
                { 
                    id: 2,
                    day: "Tuesday",
                    checked: true,},
                {
                    id: 3,
                    day: "Wednesday",
                    checked: true,},
                {
                    id: 4, 
                    day: "Thursday",
                    checked: true,},
                {
                    id: 5,
                    day: "Friday",
                    checked: true,},
                { 
                    id: 6,
                    day: "Saturday",
                    checked: true,},

                ],
            
            buildingList:[{   
                id: 1,
                building: "St. La Salle Hall",
                checked: false,},
            { 
                id: 2,
                building: "Enrique Yuchengco Hall",
                checked: false,},
            {
                id: 3,
                building: "St. Joseph Hall",
                checked: false,},
            {
                id: 4, 
                building: "Velasco Hall",
                checked: false,},
            {
                id: 5,
                building: "St. Miguel Hall",
                checked: false,},
            { 
                id: 6,
                building: "St. Mutien Marie Hall",
                checked: false,},
            {
                id: 7,
                building: "Gokongwei Hall",
                checked: false,},
            { 
                id: 8,
                building: "Br. Andrew Gonzales Hall",
                checked: false,},],

            
            breakOptions: [
                {
                    option: "None",
                    value: 0
                },
                {
                    option: "15 Minutes",
                    value: 15
                },
                {
                    option: "30 Minutes",
                    value: 30
                },
                {
                    option: "45 Minutes",
                    value: 45
                },
                {
                    option: "1 Hour",
                    value: 60
                },
                {
                    option: "2 Hour",
                    value: 120
                },
                {
                    option: "3 Hour",
                    value: 180
                },
                {
                    option: "4 Hour",
                    value: 240
                },
                {
                    option: "5 Hour",
                    value: 300
                },
                {
                    option: "6 Hour",
                    value: 360
                },
                {
                    option: "7 Hour",
                    value: 420
                },
                {
                    option: "8 Hour",
                    value: 480
                },
                {
                    option: "9 Hour",
                    value: 540
                },
            ]


        }

        
    }
    
    componentDidMount(){
        const id = localStorage.getItem('user_id');
        axios.get('http://localhost:8000/api/faculty/')
        .then(res => {
            res.data.map(faculty => {
                var prof = {'id': faculty.id, 'profName': faculty.first_name+', '+faculty.last_name} 
                this.setState(state =>{
                    const profList = state.profList;
                    profList.push(prof);
                    return {profList}
                })
            })
        });
        axios.get('http://localhost:8000/api/sections/')
        .then(res => {
            res.data.map(section => {
                var section = {'id': section.id, 'sectionName': section.section_code} 
                this.setState(state =>{
                    const sectionList = state.sectionList;
                    sectionList.push(section);
                    return {sectionList}
                })
            })
        });
            axios.get('http://localhost:8000/api/preferencelist/'+id+'/')
            .then(res => {
                console.log(res.data)
                res.data.map(preference =>{
                    console.log(preference)
                    if(preference.earliest_class_time != null){
                        this.setState({earliest_class_time:preference.earliest_class_time})
                    }
                    if(preference.latest_class_time != null){
                        this.setState({latest_class_time:preference.latest_class_time})
                    }
                    if(preference.preferred_days != null){
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
                    }
                    if(preference.preferred_buildings != null){
                    }
                    if(preference.preferred_sections != null){
                    }
                })
                this.setState({dataReceived: true})
            });
    }

    handleProfPrefChange = (e, val) =>{
        this.setState({selectedProfs: val})
    }

    handleProfPrefPress = (e) => {
        const val = this.state.selectedProfs;
        if(e.key === 'Enter'){
            const newProfList = [];

            if(val != undefined){
                this.state.profList.map(prof => {
                    if(prof.id != val.id){
                        newProfList.push(prof)
                    }
                })
                this.setState({profList:newProfList})
                console.log(e.target)
            }
        }
    }

    handleSectionPrefChange = (e, val) =>{
        this.setState({selectedProfs: val})
      }
    


    handleSectionPrefPress = (e) => {
        const val = this.state.selectedProfs;
        if(e.key === 'Enter'){
            const newProfList = [];

            if(val != undefined){
                this.state.profList.map(prof => {
                    if(prof.id != val.id){
                        newProfList.push(prof)
                    }
                })
                this.setState({profList:newProfList})
                console.log(e.target)
            }
        }
    }

    handleDateChange = (date) => {
        this.setState({selectedDate: date})
      };
    
    handleDayChange = (event) => {
        var newDayList = [...this.state.daysList];
        newDayList.map(value=>{
            if(value.id === Number(event.target.id)){
                value.checked = event.target.checked;
            }
        })
        this.setState({daysList: newDayList});
        // this.setState({[event.target.name]: event.target.checked });
    };

    handleBreakChange = (event) =>{
        this.setState({break_length: event.target.value})
    }
    handleBuildingChange = (event) => {
        var newBuildingList = [...this.state.buildingList];
        newBuildingList.map(value=>{
            if(value.id === Number(event.target.id)){
                value.checked = event.target.checked;
            }
        })
        this.setState({buildingList: newBuildingList});
        // this.setState({[event.target.name]: event.target.checked });
    };

    handleEarliestChange = (event) => {
        this.setState({earliest_class_time: event.target.value})
        console.log(this.state)
    }

    handleLatestChange = (event) => {
        this.setState({latest_class_time: event.target.value})
    }

    handleMinCourseChange = (event) => {
        this.setState({min_courses: event.target.value})
    }

    handleMaxCourseChange = (event) => {
        this.setState({max_courses: event.target.value})
    }

    handleSave = () => {
        this.setState({dataSaved: true})
        const id = localStorage.getItem('user_id');
        axios.delete('http://localhost:8000/api/preferencelist/'+id+'/')
        .then(res => {
            const data = {
                earliest_class_time: this.state.earliest_class_time,
                latest_class_time: this.state.latest_class_time,
                // break_length: '0'+this.state.break_length.toString(),
                min_courses: this.state.min_courses,
                max_courses: this.state.max_courses,
                user: id
            }
            axios.post('http://localhost:8000/api/preferences/', data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.setState({dataSaved: false})
            }).catch(err => {
                console.log(err.response)
            })
        }).catch(err => {
            console.log(err.response)
        });

        this.setState({savedPrefBar: true});
        console.log(this.state.savedPrefBar);

    }

    handleCloseSaveBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({savedPrefBar: false});
    }
    
    render() {
        // const GreenCheckbox = withStyles({
        //     root: {
        //         color: green[400],
        //         '&$checked': {
        //         color: green[600],
        //         },
        //     },
        //     checked: {},
        //     })((props) => <Checkbox color="default" {...props} />);

      return (
        <div>
            <div class="prefIntro">
                <a href="/">
                    <svg class="bi bi-house" width="3em" height="3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9.646 3.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4H9v4a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM4.5 9.707V16H8v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V9.707l-5.5-5.5-5.5 5.5z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                
                <div class="introduction">
                    <h2>Preferences</h2>
                    <p>Disclaimer: Adding your preferences will help filter out the schedules that best suits you from among the available choices. However, it cannot assure you that all your preferences will be satisfied because taking into account the courses you need is of upmost priority.</p>
                    {this.state.dataSaved ?
                    <center><button onClick={this.handleSave} class="btn btn-success change-flowchart" disabled>Save</button></center>
                    :
                    <center><button onClick={this.handleSave} class="btn btn-success change-flowchart">Save</button></center>
                    }
                </div>
                <Snackbar open={this.state.savedPrefBar} autoHideDuration={4000} onClose={this.handleCloseSaveBar}>
                    <Alert onClose={this.handleCloseSaveBar} severity="success">
                    Your preferences have been successfully saved!
                    </Alert>
                </Snackbar>
            </div>

            <div class="prefIntro-main">
                {this.state.dataReceived ? 
                <div className="preference-category">
                    <div className="timePreferences">
                        <h2>Time Preferences</h2>
                        
                        <div className="preference-category-content">
                            {/* Earliest Time
                            <br/> */}
                            
                            {/* <input value={this.state.earliest_class_time} type="time"/><br/><br/> */}
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Earliest Time"
                                    value={this.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider> */}
                                
                                {/* <KeyboardDateTimePicker
                                    value={this.selectedDate}
                                    onChange={this.handleDateChange}
                                    label="Earliest Time"
                                    // onError={console.log}
                                    // minDate={new Date("2020-01-01T00:00")}
                                    format="hh:mm a"
                                /> */}
                            
                            <form className={"timeContainer"} noValidate>
                                <TextField
                                    id="time"
                                    label="Earliest Time"
                                    type="time"
                                    value={this.state.earliest_class_time}
                                    className={"earliestTimeField"}
                                    onChange={this.handleEarliestChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                                </form>
                           

                            {/* Latest Time
                            <br/>
                            <input value={this.state.latest_class_time} type="time"/><br/><br/> */}
                            
                            <form className={"timeContainer"} noValidate>
                                <TextField
                                    id="time"
                                    label="Latest Time"
                                    type="time"
                                    value={this.state.latest_class_time}
                                    className={"lastestTimeField"}
                                    onChange={this.handleLatestChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                                </form>
                            
                            <div className={'days-preference'}>
                                Preferred Days
                                <FormGroup row>
                                    <FormControlLabel
                                        control = {<Checkbox checked={this.state.daysList[0].checked} onChange={this.handleDayChange} id = '1' color="primary"/>}label="M" />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.daysList[1].checked} onChange={this.handleDayChange} id = '2' color="primary"/>}label="T" />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.daysList[2].checked} onChange={this.handleDayChange} id = '3' color="primary"/>}label="W" />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.daysList[3].checked} onChange={this.handleDayChange} id = '4' color="primary"/>}label="H" />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.daysList[4].checked} onChange={this.handleDayChange} id = '5' color="primary"/>}label="F" />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.daysList[5].checked} onChange={this.handleDayChange} id = '6' color="primary"/>}label="S" />
                                </FormGroup>
                            </div>

                            {/* Break Length */}
                            <br/>
                            <div className={'break-preference'}>
                                <TextField
                                    id="outlined-select-break"
                                    select
                                    label="Break Length"
                                    onChange={this.handleBreakChange}
                                    value = {this.state.break_length == null ? 15 : this.state.break_length}
                                    helperText="Please select your preferred break length"
                                    variant="outlined"
                                    >
                                    
                                    {this.state.breakOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.option}
                                        </MenuItem>
                                            ))}
                                </TextField>
                            </div>
                            
                        </div>
                    </div>

                    <div className="workloadPreferences">
                        <h2>Workload Preferences</h2>
                        
                        <div className="preference-category-content">
                            {/* Minimum Courses per Day */}
                            <br/>
                            {/* <input type = "number" /><br/><br/> */}
                            <TextField
                                className={'workload-field'}
                                id="min-courses"
                                value={this.state.min_courses}
                                label="Minimum Courses per Day"
                                onChange={this.handleMinCourseChange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="0"
                                size="medium"
                                inputProps={{
                                    min: 0,
                                    max: 10,
                                }}
                            />
                            <br/>
                            {/* Maximum Courses per Day */}
                            <br/>
                            {/* <input type = "number" value={this.state.max_courses}/><br/><br/> */}
                            <TextField
                                className={'workload-field'}
                                id="max-courses"
                                value={this.state.max_courses}
                                label="Maximum Courses per Day"
                                onChange={this.handleMaxCourseChange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="0"
                                inputProps={{
                                    min: 0,
                                    max: 10,
                                }}
                            />
                        </div>
                    </div>

                    <div className="classDetails">
                        <h2>Class Details</h2>
                        
                        <div className="preference-category-content">
                            <div className="professor-preference">
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={this.state.profList}
                                    getOptionLabel={option => option.profName}
                                    //   style={{ width: 500 }}
                                    filterSelectedOptions
                                    renderInput={params => <TextField {...params} label="Faculty Preferences" variant="outlined" />}
                                    onChange={this.handleProfPrefChange}
                                    onKeyPress={this.handleProfPrefress}
                                    />
                            </div>


                           
                            <div className={'building-preference'}>
                                Building Preferences
                                <br/><br/>
                                <Grid container spacing={6}>
                                    <Grid item xs={6}>

                                    <FormGroup>
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.buildingList[0].checked} onChange={this.handleBuildingChange} id = '1' color="primary"/>}label={this.state.buildingList[0].building} />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.buildingList[1].checked} onChange={this.handleBuildingChange} id = '2' color="primary"/>}label={this.state.buildingList[1].building} />
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.buildingList[2].checked} onChange={this.handleBuildingChange} id = '3' color="primary"/>}label={this.state.buildingList[2].building}/>
                                        <FormControlLabel
                                        control = {<Checkbox checked={this.state.buildingList[3].checked} onChange={this.handleBuildingChange} id = '4' color="primary"/>}label={this.state.buildingList[3].building} />
                                    </FormGroup>
                                    </Grid>

                                    <Grid item xs={6}>
                                    <FormGroup>
                                    <FormControlLabel
                                    control = {<Checkbox checked={this.state.buildingList[4].checked} onChange={this.handleBuildingChange} id = '5' color="primary"/>}label={this.state.buildingList[4].building}/>
                                    <FormControlLabel
                                    control = {<Checkbox checked={this.state.buildingList[5].checked} onChange={this.handleBuildingChange} id = '6' color="primary"/>}label={this.state.buildingList[5].building} />
                                        <FormControlLabel
                                    control = {<Checkbox checked={this.state.buildingList[6].checked} onChange={this.handleBuildingChange} id = '7' color="primary"/>}label={this.state.buildingList[6].building}/>
                                    <FormControlLabel
                                    control = {<Checkbox checked={this.state.buildingList[7].checked} onChange={this.handleBuildingChange} id = '8' color="primary"/>}label={this.state.buildingList[7].building} />
                                    </FormGroup>
                                    </Grid>
                                </Grid>
                            </div>
                           
                            {/* <FormGroup>
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[0].checked} onChange={this.handleBuildingChange} id = '1' color="primary"/>}label={this.state.buildingList[0].building} />
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[1].checked} onChange={this.handleBuildingChange} id = '2' color="primary"/>}label={this.state.buildingList[1].building} />
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[2].checked} onChange={this.handleBuildingChange} id = '3' color="primary"/>}label={this.state.buildingList[2].building}/>
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[3].checked} onChange={this.handleBuildingChange} id = '4' color="primary"/>}label={this.state.buildingList[3].building} />
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[4].checked} onChange={this.handleBuildingChange} id = '5' color="primary"/>}label={this.state.buildingList[4].building}/>
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[5].checked} onChange={this.handleBuildingChange} id = '6' color="primary"/>}label={this.state.buildingList[5].building} />
                                    <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[6].checked} onChange={this.handleBuildingChange} id = '7' color="primary"/>}label={this.state.buildingList[6].building}/>
                                <FormControlLabel
                                control = {<Checkbox checked={this.state.buildingList[7].checked} onChange={this.handleBuildingChange} id = '8' color="primary"/>}label={this.state.buildingList[7].building} />
                                        
                            </FormGroup> */}
                                
                            {/* <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. La Salle Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Enrique Yuchengco Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. Joseph Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Velasco Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. Miguel Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. Mutien Marie Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Gokongwei Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Br. Andrew Gonzales Hall </label><br/><br/> */}

                            <div className="section-preference">
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={this.state.sectionList}
                                    getOptionLabel={option => option.sectionName}
                                    //   style={{ width: 500 }}
                                    filterSelectedOptions
                                    renderInput={params => <TextField {...params} label="Section Preferences" variant="outlined" />}
                                    onChange={this.handleSectionPrefChange}
                                    onKeyPress={this.handleSectionPrefress}
                                    />
                            </div>
                        </div>
                    </div>


                </div>
                : null }
            </div>
        </div>        
      );
    }
  }
  export default Preferences;