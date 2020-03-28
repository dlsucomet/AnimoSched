import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';
import BoxInfo from '../components/BoxInfo';
import { Button } from 'reactstrap';
import EditableLabel from 'react-inline-editing';

class GenSchedInfo extends Component {
    constructor(props){
        super(props);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    state = {  
        scheduleContent: this.props.scheduleContent,
        tableContent: this.props.tableContent,
        conflictsContent: this.props.conflictsContent,
        prefContent: this.props.prefContent,
        id: this.props.id,
        schedTitle: this.props.titleName,
        boolEdit: false,
        
    }

    _handleFocus=(text)=> {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut=(text)=> {
        console.log('Left editor with text: ' + text);
        this.setState({schedTitle: text});
        console.log("this is props");
        console.log(this.props);
        this.props.updateSchedTitle(text);
    }

    handleKeyPress = (event) => {
        console.log("event: " + event);
        if(event.key === 'Enter'){
            this.setState({boolEdit: false});
            console.log("isEditing: " + this.state.boolEdit);

        }
    }

    render() { 
 
        return (
            <Column>
                <Row verticle = 'center' className = "RowSchedInfoContainer">
                    <Column flexGrow={1} horizontal = 'center' >
                        <Row horizontal= 'start'>
                            <EditableLabel text={this.state.schedTitle}
                            labelClassName='myLabelClass'
                            inputClassName='myInputClass'
                            inputWidth='200px'
                            inputHeight='25px'
                            inputMaxLength='50'
                            labelFontWeight='bold'
                            inputFontWeight='bold'
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                            onChange={this.handleKeyPress}
                            isEditing = {this.state.boolEdit}
                            />
                        </Row>
                   
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