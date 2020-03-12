import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Menu from '../components/Menu.jsx';
import CourseDnD from '../components/CourseDnD';
import '../css/GenerateSchedule.css';
import ScheduleView from '../components/ScheduleView';
import ClassesTable from '../components/ClassesTable';
import axios from 'axios';

class GenerateSchedule extends Component {

    constructor(props) {
        super();
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: [],
            lowCourses: [],
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        const user = localStorage.getItem('user');
        if(user != undefined){
            axios.get('http://localhost:8000/api/users/'+user)
            .then(res => {
                axios.get('http://localhost:8000/api/highcourses/'+res.data.highCourses)
                .then(res => {
                    const courses = res.data.courses;
                    for(let i = 0 ; i < courses.length ; i++){
                        console.log(courses[i])
                        axios.get('http://localhost:8000/api/courses/'+courses[i])
                        .then(res => {
                            this.setState(state =>{
                                const highCourses = state.highCourses.concat(res.data.course_code);
                                return{highCourses};
                            });
                        })
                    }
                })
                axios.get('http://localhost:8000/api/lowcourses/'+res.data.lowCourses)
                .then(res => {
                    const courses = res.data.courses;
                    for(let i = 0 ; i < courses.length ; i++){
                        console.log(courses[i])
                        axios.get('http://localhost:8000/api/courses/'+courses[i])
                        .then(res => {
                            this.setState(state =>{
                                const lowCourses = state.lowCourses.concat(res.data.course_code);
                                return{lowCourses};
                            });
                        })
                    }
                })
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
                        <div className = "genSchedInfoContainer" style={{margin: "40px"}}>
                            <Row verticle = 'center' className = "RowSchedInfoContainer">
                                <Column flexGrow={1} horizontal = 'center' >
                                    <h3>Schedule here</h3>
                                    <ScheduleView />
                                </Column>
                                <Column flexGrow={1} horizontal = 'center'style={{marginLeft: "60px"}} >
                                    <Row horizontal = 'center'>
                                        <ClassesTable/>
                                    </Row>
                                    <Row horizontal = 'center'>
                                        <Column vertical = 'center' style={{marginLeft: "60px"}}>
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
                                        <Column vertical = 'center' style={{marginLeft: "60px"}}>
                                            Course Conflict
                                            <textarea style= {{height: "200px"}}>
                                            > HUMALIT conflicts with with ClassB2
                                            > KASPIL conflicts with with ClassC3
                                            </textarea>
                                        </Column>
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