import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';
import BoxInfo from '../components/BoxInfo';
import { Button } from 'reactstrap';

import EditableLabel from 'react-inline-editing';

import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    pencilIcon:{ 
        marginLeft: "10px",
        '&:hover': {
            backgroundColor: "white",
            color: "gray"
          },
    },
    checkIcon:{
        color: "green", 
        marginLeft: "10px",
        '&:hover': {
            backgroundColor: "white",
            color: "#79c879"
          },
    }
  });

class GenSchedInfo extends Component {
    constructor(props){
        super(props);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {  
            scheduleContent: props.scheduleContent,
            tableContent: props.tableContent,
            conflictsContent: props.conflictsContent,
            prefContent: props.prefContent,
            id: props.id,
            schedTitle: props.titleName,
            earliest: props.earliest,
            latest: props.latest,
            boolEdit: false,
        }
        this.editableLabel = React.createRef();
    }

    componentWillReceiveProps(props){
        this.setState({
            scheduleContent: props.scheduleContent,
            tableContent: props.tableContent,
            conflictsContent: props.conflictsContent,
            prefContent: props.prefContent,
            id: props.id,
            schedTitle: props.titleName,
            earliest: props.earliest,
            latest: props.latest,
        });
    }

    _handleFocus=(text)=> {
        this.setState({boolEdit: true});
        console.log('Focused with text: ' + text);
        
    }

    _handleFocusOut=(text)=> {
        console.log('Left editor with text: ' + text);
        this.setState({schedTitle: text});
        console.log("this is props");
        console.log(this.props);
        this.props.updateSchedTitle(text);
        this.setState({boolEdit: false});

    }

    handleKeyPress = (event) => {
        console.log("event: " + event);
        if(event.key === 'Enter'){
            this.setState({boolEdit: false});
            console.log("isEditing: " + this.state.boolEdit);

        }
    }

    editButtonPress = () =>{
        if(this.state.boolEdit === false){
            this.setState({boolEdit: true});
            this.editableLabel.current.setState({isEditing: true});
        }else if(this.state.boolEdit === true){
            this.setState({boolEdit: false});
        }
    }


    render() { 
        const { classes } = this.props;
        return (
            <Column>
                <Row verticle = 'center' className = "RowSchedInfoContainer">
                    <Column flexGrow={1} horizontal = 'center' >
                        <Row horizontal= 'start'>
                            <EditableLabel ref={this.editableLabel} text={this.state.schedTitle}
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
                            /> 

                            {this.state.boolEdit ? <DoneIcon fontSize="medium" className={classes.checkIcon} onClick={this.editButtonPress}/> : <EditIcon fontSize= "small" className={classes.pencilIcon} onClick={this.editButtonPress}/>}
                            {/* <EditIcon fontSize="small" style={{marginLeft: "10px"}} onClick={this.editButtonPress}/> */}
                            {/* <DoneIcon fontSize="medium" style={{color: "green"}} /> */}
                        </Row>
                   
                        <ScheduleView id='scheduleView' content={this.state.scheduleContent} earliest={this.state.earliest} latest={this.state.latest}/>
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

GenSchedInfo.propTypes={
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(GenSchedInfo);