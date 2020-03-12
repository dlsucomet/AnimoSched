import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Menu from '../components/Menu.jsx';
import CourseDnD from '../components/CourseDnD';
import '../css/GenerateSchedule.css';
import ScheduleView from '../components/ScheduleView';
import axios from 'axios';

class GenerateSchedule extends Component {

    constructor(props) {
        super();
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: ['Major1', 'Major2'],
            lowCourses: ['Minor1', 'Minor2'],
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        const user = localStorage.getItem('user');
        if(user != undefined){
            axios.get('http://localhost:8000/api/users/'+user)
            .then(res => {
                console.log(res.data.highcourses);
                console.log(res.data.lowcourses);
            })
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            const newCourse = event.target.value;
            this.setState(state =>{
                const highCourses = state.highCourses.concat(newCourse);
                return{highCourses};
            });
            console.log(this.state.highCourses)
        }
      }
    
    
    render() { 
        let search_field = this.props.search_field;
        
        return (
            <div>
                <Menu />
                <div>
                    <Column flexGrow={1} style={{margin: "40px"}}>
                        <div className="courseInputContainer">
                            <Row horizontal = 'center'>
                                <h1>Term 2, AY2019-2020</h1>
                            </Row>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <div id="search_container">
                                    <Input
                                    type="search"
                                    name={search_field}
                                    id="exampleSearch"
                                    placeholder="Enter Course Name..."
                                    value = {this.state.Input}
                                    onKeyPress={this.handleKeyPress}
                                    />
                                </div>
                            </Row>
                            <Row vertical = 'center' style={{margin: "40px"}}>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3>Highest Priority</h3>
                                    <span><CourseDnD idTag={this.state.highPriorityId} courses={this.state.highCourses}/></span>

                                </Column>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3>Lowest Priority</h3>
                                    <span><CourseDnD idTag={this.state.lowPriorityId} courses={this.state.lowCourses}/></span>
                                </Column>
                            </Row>
                            <Row horizontal = 'center' style={{margin: "40px"}}>
                                <button className="btn btn-secondary btn-sm" onClick={this.showDiv}>Generate Schedule</button>
                            </Row>
                        </div>
                        <div className = "genSchedInfoContainer" style={{margin: "40px", height: "800px"}}>
                            <Row verticle = 'center' className = "RowSchedInfoContainer">
                                <Column flexGrow={1} horizontal = 'center' >
                                    <h3>Schedule here</h3>
                                    <div style={{height: "200px", width:"700px"}}>
                                        <ScheduleView />
                                    </div>
                                </Column>
                                <Column flexGrow={1} horizontal = 'center'style={{marginLeft: "60px"}} >
                                    <Row horizontal = 'center'>
                                        <h3 >Table of extra course details</h3>
                                    </Row>
                                    <Row horizontal = 'center'>
                                        <h3>Table for preferences</h3>
                                    </Row>
                                </Column>
                            </Row>
                        </div>
                    </Column>
                </div>
            </div>  
        );
    }
}




export default GenerateSchedule;