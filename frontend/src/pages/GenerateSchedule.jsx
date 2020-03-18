import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import {Input} from 'reactstrap';
import Menu from '../components/Menu.jsx';
import CourseDnD from '../components/CourseDnD';
import '../css/GenerateSchedule.css';
import GenSchedInfo from '../components/GenSchedInfo';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class GenerateSchedule extends Component {

    constructor(props) {
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        //this.generatedContent= [<GenSchedInfo/>,<GenSchedInfo/>];
        this.pageCount= 2;
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: [],
            lowCourses: [],
            currentPage: 0,
            currentContent: <GenSchedInfo/>,
            generatedContents: [<GenSchedInfo/>,<GenSchedInfo/>,<GenSchedInfo/>,<GenSchedInfo/>,<GenSchedInfo/>],
            //testContents: [<GenSchedInfo/>,<GenSchedInfo/>],
            pagesCount: 1,
            searchedCourse: "",
            
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
        event.preventDefault();
        if(event.key === 'Enter'){
            const newCourse = event.target.value;
            this.setState(state =>{
                const highCourses = state.highCourses.concat(newCourse);
                return{highCourses};
            });
            console.log(this.state.highCourses)
        }
    }
    

    handlePageChange = (e,index) => {
        e.preventDefault();
        this.setState(state =>{
            var currentContent = state.generatedContents[index];
            return {currentContent};
            });

        this.setState(state =>{
            var currentPage = index;
            return {currentPage};
            });
        console.log("pressed page " + index);
        console.log(this.state.generatedContents[index]);
    }
    
    render() { 
        let search_field = this.props.search_field;
        const { currentPage } = this.state;
        this.state.pagesCount = this.state.generatedContents.length;
        this.state.currentContent = this.state.generatedContents[this.state.currentPage];
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
                                    <input
                                    type="search"
                                    name={search_field}
                                    id="exampleSearch"
                                    placeholder="Enter Course Name..."
                                    value = {this.state.searchedCourse}
                                    onKeyPress={this.handleKeyPress}
                                    />
                                </div>
                            </Row>
                            <Row vertical = 'center'>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3>Highest Priority</h3>
                                    <CourseDnD idTag={this.state.highPriorityId} courses={this.state.highCourses}/>

                                </Column>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3>Lowest Priority</h3>
                                    <CourseDnD idTag={this.state.lowPriorityId} courses={this.state.lowCourses}/>
                                </Column>
                            </Row>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <button className="btn btn-secondary btn-sm" onClick={this.showDiv}>Generate Schedule</button>
                            </Row>
                        </div>
                        <div className = "genSchedInfoContainer" style={{margin: "40px"}}>
                            <span>{this.state.currentContent}</span>
                        </div>
                        <Row horizontal='center'>
                            <Pagination aria-label="Page navigation example">
                                <PaginationItem disabled={this.state.currentPage <= 0}>
                                    <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPage - 1)}
                                        previous/>
                                </PaginationItem>
                                {[...Array(this.state.pagesCount)].map((page, i) => 
                                    <PaginationItem active={i === this.state.currentPage} key={i}>
                                        <PaginationLink onClick={e => this.handlePageChange(e, i)}>
                                        {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                    )}
                                <PaginationItem disabled={this.state.currentPage >= this.state.generatedContents.length - 1}>
                                    <PaginationLink
                                        onClick={e => this.handlePageChange(e, this.state.currentPage + 1)}
                                        next
                                    />
                                    
                                    </PaginationItem>
                            </Pagination>
                        </Row>
                    </Column>
                </div>
            </div>  
        );
    }
}




export default GenerateSchedule;