import React, {Component} from 'react';
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Resources
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import { appointments } from "./data";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClassIcon from '@material-ui/icons/Class';
import { blue, purple } from "@material-ui/core/colors";
import { green, deepOrange, lightBlue } from '@material-ui/core/colors';

import '../css/ScheduleView.css';

import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({ palette: { type: "light", primary: green } });

const styles = {
    dayScaleCell: {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
    

  };


  const style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    firstRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    secondRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    thirdRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    header: {
      height: '260px',
      backgroundSize: 'cover',
    },
    commandButton: {
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
  });

const formatDayScaleDate = (date, options) => {
    const momentDate = moment(date);
    const { weekday } = options;
    return momentDate.format(weekday ? 'dddd' : ' ');
};

  const DayScaleCell = withStyles(styles, "DayScaleCell")(
    ({ formatDate, classes, ...restProps }) => (
      <WeekView.DayScaleCell
        {...restProps}
        formatDate={formatDayScaleDate}
        className={classes.dayScaleCell}
      />
    )
  );

  // const Header = withStyles(style, { name: 'Header' })(({
  //   children, appointmentData, classes, ...restProps
  // }) => (
  //   <AppointmentTooltip.Header
  //     {...restProps}
  //     className={classes.header}
  //     appointmentData={appointmentData}
  //   >
  //   </AppointmentTooltip.Header>
  // ));
  
  const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Room className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
        <Grid item xs={2} className={classes.textCenter}>
          <ClassIcon className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.section}</span>
        </Grid>
        <Grid item xs={2} className={classes.textCenter}>
          <AccountCircleIcon className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.professor}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));

  const AppointmentContent = ({ style, ...restProps }) => {
    return (
      <Appointments.AppointmentContent {...restProps}>
        <div className={restProps.container}>
          <div>{restProps.data.title}</div>
          {/* <div style={{fontSize: "8px"}}>{restProps.data.professor}</div> */}
          <div>{restProps.data.location}</div>
          <div>{restProps.data.startTime} - {restProps.data.endTime}</div>
          <Typography gutterBottom variant="body2" style={{fontSize: "8px"}}>
                {restProps.data.professor}
          </Typography>
        </div>
      </Appointments.AppointmentContent>
    );
  };

  // const CustomAppointment = ({ style, ...restProps }, coursesArray, index) => {
  //   // console.log(coursesArray);
  //   // console.log(index);
  //   var coloredClasses = [...coursesArray];
  //   var palIndex = 1;
  //   var palette = ['#324856', '#4A746A', '#D18237', 'D66C44', '#FFA289', '#6A92CC', '#706FAB', '#50293C'];
  //   if (coloredClasses.includes(restProps.data.title)){
  //     return (
  //       <Appointments.Appointment
  //         {...restProps}
  //         style={{ ...style, backgroundColor: "blue"}}
  //         // className="CLASS_ROOM1"
  //         data={restProps.data.title}
  //       />
  //     );
  //   }else{
  //     // coloredClasses.concat({title: restProps.data.title, color: palette[palIndex]});
  //     // this.setState({coloredClasses});
  //     // palIndex = palIndex + 1;
  //     // this.setState({palIndex})
  //     return(<Appointments.Appointment
  //         {...restProps}
  //         style={{ ...style, backgroundColor: palette[palIndex]}}
  //         // className="CLASS_ROOM1"
  //         data={restProps.data.title}
  //       />
  //     );
  //   }
  // };

class ScheduleView extends Component {
    constructor(props){
      super(props);
      this.CustomAppointment = this.CustomAppointment.bind(this);
      var earliest = 9;
      if(props.earliest != undefined){
        earliest = props.earliest;
      }
      var latest = 17;
      if(props.latest != undefined){
        latest = props.latest;
      }
      this.state = {  
        classes: props.content,
        latest: latest,
        earliest: earliest,
        palette: ['#FFB53C', '#EEB3A3', '#F3355C', '#FAA98B', '#E6AECF', '#AEE0DD', '#01ACBD','#FED770', ' #F29F8F', '#FB7552', '#076A67','#324856', '#4A746A', '#D18237', '#D66C44', '#FFA289', '#6A92CC', '#706FAB', '#50293C'],
        coloredClasses: [],
        palIndex: 0,
      }
      const priorities = [
        { id: 1, text: 'Low Priority', color: green },
        { id: 2, text: 'Medium Priority', color: lightBlue },
        { id: 3, text: 'High Priority', color: deepOrange },
      ];
      this.resources = [{
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorities,
      }]
    }

    componentWillReceiveProps(props){
      var earliest = 9;
      if(props.earliest != undefined){
        earliest = props.earliest;
      }
      var latest = 17;
      if(props.latest != undefined){
        latest = props.latest;
      }
      this.setState({
        classes: props.content,
        latest: latest,
        earliest: earliest,
        palette: [],
      });
    }
    
    CustomAppointment = ({ style, ...restProps }) => {
      // console.log(restProps);
      var coloredClasses = [...this.state.coloredClasses];;
      var changeColor = <Appointments.Appointment {...restProps} style={{ ...style, backgroundColor: this.state.palette[1]}}data={restProps.data.title}/>;
      // console.log(coloredClasses)
      coloredClasses.map(data=>{
        if(data.title == restProps.data.title){
          console.log(data.color);
          changeColor = <Appointments.Appointment
              {...restProps}
              style={{ ...style, backgroundColor: data.color}}
              // className="CLASS_ROOM1"
              data={restProps.data.title}
            />
          return (
            <Appointments.Appointment
              {...restProps}
              style={{ ...style, backgroundColor: data.color}}
              // className="CLASS_ROOM1"
              data={restProps.data.title}
            />
          )
        }
      })

      return changeColor;
    };


    componentWillMount(){
      this.processColoredClasses();
    }
    processColoredClasses=()=>{
      console.log("hello from proccessColoredClasses");
      var coloredClasses = [];
      var palIndex = 0;
      var classData = [...this.state.classes];
      classData.map(data => {
        // if(!coloredClasses.includes(data.title)){
        if(!coloredClasses.some(p => p.title == data.title)){

          coloredClasses.push({title: data.title, color: this.state.palette[palIndex]});
          palIndex = palIndex + 1;
        }
      })
      console.log(coloredClasses)
      this.setState({coloredClasses});
    }

    render() { 
        return (
          
            // <MuiThemeProvider theme={theme}>
            
            <Paper>
              <div>
                {this.processColoredClasses}
              </div>
              
                <Scheduler id='scheduleView' data={this.state.classes}>
                <ViewState currentDate="2018-06-28" />
                <WeekView startDayHour={this.state.earliest} endDayHour={this.state.latest} excludedDays={[0,6]} dayScaleCellComponent={DayScaleCell}/>
                <Appointments 
                appointmentContentComponent={AppointmentContent}
                appointmentComponent={this.CustomAppointment}
                />
                {/* <AppointmentTooltip
                  // headerComponent={Header}
                  contentComponent={Content}
                  // commandButtonComponent={CommandButton}
                  showCloseButton
                /> */}
                <Resources
                  data={this.resources}
                />
                </Scheduler>
            </Paper>
            // </MuiThemeProvider>
          );
    }
}
 
export default ScheduleView;
