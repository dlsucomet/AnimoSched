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

        this.generatedContent= [<GenSchedInfo/>,<GenSchedInfo/>];
        this.pageCount= 2;
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: [],
            lowCourses: [],
            currentPage: 0
            
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
    
    handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    }
    
    render() { 
        let search_field = this.props.search_field;
        const { currentPage } = this.state;
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
                            <Row vertical = 'center' style={{margin: "20px"}}>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3>Highest Priority</h3>
                                    <span><CourseDnD idTag={this.state.highPriorityId} courses={this.state.highCourses}/></span>

                                </Column>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3>Lowest Priority</h3>
                                    <span><CourseDnD idTag={this.state.lowPriorityId} courses={this.state.lowCourses}/></span>
                                </Column>
                            </Row>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <button className="btn btn-secondary btn-sm" onClick={this.showDiv}>Generate Schedule</button>
                            </Row>
                        </div>
                        <div className = "genSchedInfoContainer" style={{margin: "40px"}}>
                            <GenSchedInfo/>
                        </div>
                        <Row horizontal='center'>Pagination here
                            <Pagination aria-label="Page navigation example">
                                <PaginationItem disabled={currentPage <= 0}>
                                    <PaginationLink onClick={e => this.handleClick(e, currentPage - 1)}
                                        previous
                                        href="#" />
                                </PaginationItem>
                                {this.generatedContent.map((page, i) => 
                                    <PaginationItem active={i === currentPage} key={i}>
                                        <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                        {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                    )}
                                <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                                    <PaginationLink
                                        onClick={e => this.handleClick(e, currentPage + 1), this.currentPage}
                                        next
                                        href="#"
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