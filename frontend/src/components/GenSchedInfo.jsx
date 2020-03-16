import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';

class GenSchedInfo extends Component {
    state = {  }
    render() { 
        
        return (
            <Row verticle = 'center' className = "RowSchedInfoContainer">
                <Column flexGrow={1} horizontal = 'center' >
                    <h3>Schedule here</h3>
                    <ScheduleView />
                </Column>
                <Column flexGrow={1} horizontal = 'center'style={{marginLeft: "40px"}} >
                    <Row horizontal = 'center'>
                        <ClassesTable/>
                    </Row>
                    <Row horizontal = 'center'>
                        <Column horizontal = 'center' style={{marginLeft: "40px"}}>
                            Preferences
                            <textarea style= {{height: "200px"}}>
                
                            Matched preferences
                            > Earliest Start Time: 9:15 AM
                            > Earliest End Time: 2:15 PM
                            > Break Preferences: 15 minutes
                            > Maximum Courses Per day: Within Range (Max of 4)

                            Unmatched preferences
                            > Professor Bob Uy not included
                    
                            </textarea>
                        </Column>
                        <Column horizontal = 'center' style={{marginLeft: "60px"}}>
                            Course Conflict
                            <textarea style= {{height: "200px"}}>
                            > HUMALIT conflicts with with ClassB2
                            > KASPIL conflicts with with ClassC3
                            </textarea>
                        </Column>
                    </Row>
                </Column>
            </Row>
          );
    }
}
 
export default GenSchedInfo;