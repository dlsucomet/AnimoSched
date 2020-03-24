import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';
import BoxInfo from '../components/BoxInfo';
import { Button } from 'reactstrap';

class GenSchedInfo extends Component {
    constructor(props){
        super(props);
    }
    state = {  
        scheduleContent: this.props.scheduleContent,
        tableContent: this.props.tableContent,
        conflictsContent: this.props.conflictsContent,
        prefContent: this.props.prefContent,
        id: this.props.id,
        
    }
    render() { 
 
        return (
            <Column>
                <Row verticle = 'center' className = "RowSchedInfoContainer">
                    <Column flexGrow={1} horizontal = 'center' >
                        <h3>Schedule here</h3>
                        <ScheduleView content={this.state.scheduleContent}/>
                    </Column>
                    <Column flexGrow={1} horizontal = 'center'style={{marginLeft: "40px"}} >
                        <Row horizontal = 'center'>
                            <ClassesTable content={this.state.tableContent} />
                        </Row>
                        <Row horizontal = 'center'>
                            <Column horizontal = 'center' style={{marginLeft: "10px"}}>
                                Preferences
                                
                                <BoxInfo content={this.state.prefContent } id={1+this.state.id}/>
    
                            </Column>
                            <Column horizontal = 'center' style={{marginLeft: "40px"}}>
                                Course Conflict
                                <BoxInfo content={this.state.conflictsContent} id={2+this.state.id}/>
                            </Column>
                        </Row>
                            
                    </Column>
                    
                </Row>
        
                {/* <Row horizontal='center'>
                    <Button style={{margin: "40px"}}>Save Schedule</Button>
                </Row> */}
           
            </Column>
                
          );
    }
}
 
export default GenSchedInfo;