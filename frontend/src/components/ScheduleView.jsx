import React, {Component} from 'react';
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";
import { appointments } from "./data";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

const styles = {
    dayScaleCell: {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  };

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

class ScheduleView extends Component {
    state = {  
    }
    render() { 
        return (
            <MuiThemeProvider theme={theme}>
            <Paper>
                <Scheduler data={appointments}>
                <ViewState currentDate="2018-06-28" />
                <WeekView startDayHour={9} endDayHour={19} excludedDays={[0,6]} dayScaleCellComponent={DayScaleCell}/>
                <Appointments />
                </Scheduler>
            </Paper>
            </MuiThemeProvider>
          );
    }
}
 
export default ScheduleView;
