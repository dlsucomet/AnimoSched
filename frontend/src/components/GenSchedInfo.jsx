import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';
import BoxInfo from '../components/BoxInfo';

class GenSchedInfo extends Component {
    constructor(props){
        super(props);
    }
    state = {  
        scheduleContent: this.props.scheduleContent,
        tableContent: this.props.tableContent,
        conflictsContent: this.props.conflictsContent,
        prefContent: this.props.prefContent,
        
    }
    render() { 
        // const prefContent = ['Match Preferences','> Earliest Start Time: 9:15 AM', '> earliest End Time: 2:15 PM', '> Break Preferences: 15 minutes', ' ', 'Unmatched Preferences', '> Professor Bob Uy not included'];
        // const conflictsContent= ['> HUMALIT conflicts with with ClassB2', '> KASPIL conflicts with with ClassC3'];
        // const tableContent = [
        //     {
        //         id: 1, 
        //         course: "LASARE2", 
        //         section:"S17", 
        //         faculty: "DELA CRUZ, JUAN", 
        //         day:"MAR 30", 
        //         time:"08:00AM-5:00PM",
        //         room: "G310"
        //     },
        //     {
        //         id: 2, 
        //         course: "IPERSEF", 
        //         section:"S15", 
        //         faculty: "DEL TORRE, MARIA", 
        //         day:"APR 05", 
        //         time:"08:00AM-5:00PM",
        //         room: "G304"
        //     }

        //     ];
        //     const scheduleContent = [
        //         {
        //           title: "HUMAART",
        //           startDate: new Date(2018, 5, 25, 9, 30),
        //           endDate: new Date(2018, 5, 25, 11, 30),
        //           id: 0,
        //           location: "Room 1",
        //           source: "G302",
        //           description: "Professor lulu"
        //         },
        //         {
        //           title: "KASPIL2",
        //           startDate: new Date(2018, 5, 25, 12, 0),
        //           endDate: new Date(2018, 5, 25, 13, 0),
        //           id: 1,
        //           location: "Room 1"
        //         },
        //         {
        //           title: "TREDTRI",
        //           startDate: new Date(2018, 5, 25, 14, 30),
        //           endDate: new Date(2018, 5, 25, 15, 30),
        //           id: 2,
        //           location: "Room 2"
        //         },
        //         {
        //           title: "CSSERVM",
        //           startDate: new Date(2018, 5, 26, 10, 0),
        //           endDate: new Date(2018, 5, 26, 11, 0),
        //           id: 3,
        //           location: "Room 2"
        //         },
        //         {
        //           title: "INOVATE",
        //           startDate: new Date(2018, 5, 26, 12, 0),
        //           endDate: new Date(2018, 5, 26, 13, 35),
        //           id: 4,
        //           location: "Room 2"
        //         },
        //         {
        //             title: "HUMAART",
        //             startDate: new Date(2018, 5, 27, 9, 30),
        //             endDate: new Date(2018, 5, 27, 11, 30),
        //             id: 0,
        //             location: "Room 1"
        //             },
        //             {
        //             title: "KASPIL2",
        //             startDate: new Date(2018, 5, 27, 12, 0),
        //             endDate: new Date(2018, 5, 27, 13, 0),
        //             id: 1,
        //             location: "Room 1"
        //             },
        //             {
        //             title: "TREDTRI",
        //             startDate: new Date(2018, 5, 27, 14, 30),
        //             endDate: new Date(2018, 5, 27, 15, 30),
        //             id: 2,
        //             location: "Room 2"
        //         },
        //         {
        //             title: "CSSERVM",
        //             startDate: new Date(2018, 5, 28, 10, 0),
        //             endDate: new Date(2018, 5, 28, 11, 0),
        //             id: 3,
        //             location: "Room 2"
        //             },
        //             {
        //             title: "INOVATE",
        //             startDate: new Date(2018, 5, 28, 12, 0),
        //             endDate: new Date(2018, 5, 28, 13, 35),
        //             id: 4,
        //             location: "Room 2"
        //         }
        //       ];
        return (
            <Row verticle = 'center' className = "RowSchedInfoContainer">
                <Column flexGrow={1} horizontal = 'center' >
                    <h3>Schedule here</h3>
                    <ScheduleView content={this.state.scheduleContent}/>
                </Column>
                <Column flexGrow={1} horizontal = 'center'style={{marginLeft: "40px"}} >
                    <Row horizontal = 'center'>
                        <ClassesTable content={this.state.tableContent}/>
                    </Row>
                    <Row horizontal = 'center'>
                        <Column horizontal = 'center' style={{marginLeft: "10px"}}>
                            Preferences
                            
                            <BoxInfo content={this.state.prefContent} />
 
                        </Column>
                        <Column horizontal = 'center' style={{marginLeft: "40px"}}>
                            Course Conflict
                            <BoxInfo content={this.state.conflictsContent}/>
                        </Column>
                    </Row>
                </Column>
            </Row>
          );
    }
}
 
export default GenSchedInfo;