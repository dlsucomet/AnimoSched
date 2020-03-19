import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';
import BoxInfo from '../components/BoxInfo';

class GenSchedInfo extends Component {
    state = {  }
    render() { 
        const prefContent = ['Match Preferences','> Earliest Start Time: 9:15 AM', '> earliest End Time: 2:15 PM', '> Break Preferences: 15 minutes', ' ', 'Unmatched Preferences', '> Professor Bob Uy not included'];
        const conflictsContent= ['> HUMALIT conflicts with with ClassB2', '> KASPIL conflicts with with ClassC3']
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
                        <Column horizontal = 'center' style={{marginLeft: "10px"}}>
                            Preferences
                            
                            <BoxInfo content={prefContent} />
 
                        </Column>
                        <Column horizontal = 'center' style={{marginLeft: "40px"}}>
                            Course Conflict
                            <BoxInfo content={conflictsContent}/>
                        </Column>
                    </Row>
                </Column>
            </Row>
          );
    }
}
 
export default GenSchedInfo;