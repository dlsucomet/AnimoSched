import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SavedSchedule extends Component {
    constructor(props){
        super(props);
    }
    state = {
        scheduleContent: [
            {
                title: "CSSERVM",
                startDate: new Date(2018, 5, 26, 10, 0),
                endDate: new Date(2018, 5, 26, 11, 0),
                id: 3,
                location: "Room 2"
              },
              {
                title: "INOVATE",
                startDate: new Date(2018, 5, 26, 12, 0),
                endDate: new Date(2018, 5, 26, 13, 35),
                id: 4,
                location: "Room 2"
              },
              {
                  title: "HUMAART",
                  startDate: new Date(2018, 5, 27, 9, 30),
                  endDate: new Date(2018, 5, 27, 11, 30),
                  id: 0,
                  location: "Room 1"
                  },
          ],
        //tableContent: this.props.tableContent,
      }
    render() { 

        var schedSample =[
            {
                
              title: "HUMAART",
              startDate: new Date(2018, 5, 25, 9, 30),
              endDate: new Date(2018, 5, 25, 11, 30),
              id: 0,
              location: "Room 1",
              source: "G302",
              description: "Professor lulu"
             
            }
          ]

        const StyledTableCell = withStyles(theme => ({
            head: {
              backgroundColor: '#006A4E',
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles(theme => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
              },
            },
          }))(TableRow);
          
          function createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
            return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
          }
          
          const rows = [
            createData(2258, 'INOVATE', 'S17', 'DELA CRUZ, JUAN', 'TH', '12:45', '14:15', 'GK210', 45, 45),
            createData(2259, 'INOVATE', 'S18', 'DELA CRUZ, JUAN', 'TH', '14:30', '16:00', 'GK210', 45, 40),
            createData(2043, 'TREDTRI', 'S17', 'TORRES, MARIA', 'TH', '14:30', '16:00', 'GK301', 30, 30),
            createData(2044, 'TREDTRI', 'S18', 'TORRES, MARIA', 'TH', '12:45', '14:15', 'GK301', 30, 28)
          ]
          
        return (  
            
            <Row vertical='center'>
                <ScheduleView content={this.state.scheduleContent}/>
            </Row>

            
            // <div className="viewCourses">
            //     <TableContainer component={Paper}>
            //     <Table aria-label="customized table">
            //         <TableHead>
            //         <TableRow>
            //             <StyledTableCell> Class Number </StyledTableCell>
            //             <StyledTableCell> Course </StyledTableCell>
            //             <StyledTableCell> Section </StyledTableCell>
            //             <StyledTableCell> Faculty </StyledTableCell>
            //             <StyledTableCell> Day </StyledTableCell>
            //             <StyledTableCell> Time </StyledTableCell>
            //             <StyledTableCell> Room </StyledTableCell>
            //             <StyledTableCell> Capacity </StyledTableCell>
            //             <StyledTableCell> Enrolled </StyledTableCell>
            //         </TableRow>
            //         </TableHead>
            //         <TableBody>
            //         {rows.map(row => (
            //             <StyledTableRow key={row.classNmbr}>
            //             <StyledTableCell> {row.classNmbr} </StyledTableCell>
            //             <StyledTableCell> {row.course} </StyledTableCell>
            //             <StyledTableCell> {row.section} </StyledTableCell>
            //             <StyledTableCell> {row.faculty} </StyledTableCell>
            //             <StyledTableCell> {row.day} </StyledTableCell>
            //             <StyledTableCell> {row.startTime} - {row.startTime} </StyledTableCell>
            //             <StyledTableCell> {row.room} </StyledTableCell>
            //             <StyledTableCell align="right"> {row.capacity} </StyledTableCell>
            //             <StyledTableCell align="right"> {row.enrolled} </StyledTableCell>
            //             </StyledTableRow>
            //         ))}
            //         </TableBody>
            //     </Table>
            //     </TableContainer>
            // </div>
           
        );
    }
}
 
export default SavedSchedule   ;