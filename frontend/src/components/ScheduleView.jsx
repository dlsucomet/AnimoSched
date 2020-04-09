import React, {Component} from 'react';
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, purple, green } from "@material-ui/core/colors";
// import { appointments } from "./data";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClassIcon from '@material-ui/icons/Class';

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

  const CustomAppointment = ({ style, ...restProps }) => {
  
    if (restProps.data.location === "Room 1")
      return (
        <Appointments.Appointment
          {...restProps}
          style={{ ...style, backgroundColor: "blue"}}
          className="CLASS_ROOM1"
          data={restProps.data.location}
        />
      );
    if (restProps.data.location === "Room 2")
      return (
        <Appointments.Appointment
          {...restProps}
          style={{ ...style, backgroundColor: "green" }}
          className="CLASS_ROOM2"
        />
      );
    return (
      <Appointments.Appointment
        {...restProps}
        style={style}
        className="CLASS_ROOM3"
      />
    );
  };

class ScheduleView extends Component {
    constructor(props){
      super(props);
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
        palette: ['#324856', '#4A746A', '#D18237', 'D66C44', '#FFA289', '#6A92CC', '#706FAB', '#50293C'],
      }
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
    render() { 
        return (
            <MuiThemeProvider theme={theme}>
            <Paper>
                <Scheduler id='scheduleView' data={this.state.classes}>
                <ViewState currentDate="2018-06-28" />
                <WeekView startDayHour={this.state.earliest} endDayHour={this.state.latest} excludedDays={[0,6]} dayScaleCellComponent={DayScaleCell}/>
                <Appointments 
                appointmentContentComponent={AppointmentContent}
                appointmentComponent={CustomAppointment}
                />
                <AppointmentTooltip
                  // headerComponent={Header}
                  contentComponent={Content}
                  // commandButtonComponent={CommandButton}
                  showCloseButton
                />
                </Scheduler>
            </Paper>
            </MuiThemeProvider>
          );
    }
}
 
export default ScheduleView;
