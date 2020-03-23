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
        super(props);
        this.updateHighPriorty = this.updateHighPriorty.bind(this);
        this.updateLowPriority = this.updateLowPriority.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.pageCount= 2;
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: ['COMPRO1', 'COMPRO2'],
            lowCourses: ['IPERSEF', 'SOCTEC1'],
            currentPage: 0,
            currentContent: "",
            generatedContents: [],
            // generatedContents : ['Hello', 'There', 'Josh'],
            // currentContent: ['Hello'],
            pagesCount: 1,
            searchedCourse: "",
            
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        
        
    }

    componentDidMount(){

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
    

    handlePageChange = (e,index) => {
        e.preventDefault();
        this.setState(state =>{
            var currentContent = state.generatedContents[index];
            return {currentContent};
            });
        
        this.setState({currentPage: index});
        this.setState(state =>{
            var currentPage = index;
            return {currentPage};
            });
        console.log("pressed page " + index);
        console.log(this.state.generatedContents[index]);
    }

    createSchedInfo = (arrayGenSched)=>{
        var generatedContents = arrayGenSched.map((item, index) =>
                <GenSchedInfo key={item.id} id={item.id} scheduleContent={item.scheduleContent} tableContent={ item.tableContent} prefContent={item.prefContent} conflictsContent={item.conflictsContent}/>

        );

        this.setState({generatedContents});
        var currentContent = generatedContents[0];
        this.setState({currentContent});
    }

    updateHighPriorty(courseUpdate){
        var newArray = [];
        courseUpdate.map(course=>{
            newArray.push(course.data);
        })
        this.setState({highCourses: newArray})

    }

    updateLowPriority(courseUpdate){
        var newArray = [];
        courseUpdate.map(course=>{
            newArray.push(course.data);
        })
        this.setState({lowCourses: newArray})
    }
    
    render() { 
        let search_field = this.props.search_field;
        // const { currentPage } = this.state;
        this.state.pagesCount = this.state.generatedContents.length;
        this.state.currentContent = this.state.generatedContents[this.state.currentPage];

        var jsonSample =[
            {
                id: 1,
                scheduleContent: [
                    {
                      title: "HUMAART",
                      startDate: new Date(2018, 5, 25, 9, 30),
                      endDate: new Date(2018, 5, 25, 11, 30),
                      id: 0,
                      location: "Room 1",
                      source: "G302",
                      description: "Professor lulu"
                    },
                    {
                      title: "KASPIL2",
                      startDate: new Date(2018, 5, 25, 12, 0),
                      endDate: new Date(2018, 5, 25, 13, 0),
                      id: 1,
                      location: "Room 1"
                    },
                    {
                      title: "TREDTRI",
                      startDate: new Date(2018, 5, 25, 14, 30),
                      endDate: new Date(2018, 5, 25, 15, 30),
                      id: 2,
                      location: "Room 2"
                    }
                ],
                tableContent: [
                    {
                        id: 1,
                        classNmbr: 1230, 
                        course: "LASARE2", 
                        section:"S17", 
                        faculty: "DELA CRUZ, JUAN", 
                        day:"MAR 30", 
                        startTime:"08:00",
                        endTime : "15:30",
                        room: "G310"
                    },
                    {
                        id: 2,
                        classNmbr: 1405, 
                        course: "IPERSEF", 
                        section:"S15", 
                        faculty: "DEL TORRE, MARIA", 
                        day:"APR 05", 
                        startTime:"08:00",
                        endTime : "15:30",
                        room: "G304"
                    }
        
                ],
                
                prefContent: ['Match Preferences','> Earliest Start Time: 9:15 AM', '> earliest End Time: 2:15 PM', '> Break Preferences: 15 minutes', ' ', 'Unmatched Preferences', '> Professor Bob Uy not included'],
                
                conflictsContent: ['> HUMALIT conflicts with with ClassB2', '> KASPIL conflicts with with ClassC3'],    

            },

            {
                id: 2,
                scheduleContent: [
                    {
                        title: "CSSERVM",
                        startDate: new Date(2018, 5, 26, 10, 0),
                        endDate: new Date(2018, 5, 26, 11, 0),
                        id: 3,
                        location: "Room 2"
                      },
                      {
                        title: "INOVATE",
                        startDate: new Date(2018, 5, 26, 12, 0),
                        endDate: new Date(2018, 5, 26, 13, 35),
                        id: 4,
                        location: "Room 2"
                      },
                      {
                          title: "HUMAART",
                          startDate: new Date(2018, 5, 27, 9, 30),
                          endDate: new Date(2018, 5, 27, 11, 30),
                          id: 0,
                          location: "Room 1"
                          },
                          {
                          title: "KASPIL2",
                          startDate: new Date(2018, 5, 27, 12, 0),
                          endDate: new Date(2018, 5, 27, 13, 0),
                          id: 1,
                          location: "Room 1"
                          },
                          {
                          title: "TREDTRI",
                          startDate: new Date(2018, 5, 27, 14, 30),
                          endDate: new Date(2018, 5, 27, 15, 30),
                          id: 2,
                          location: "Room 2"
                      },
                ],
                tableContent: [
                    {
                        id: 1, 
                        classNmbr: 2394,
                        course: "LASARE1", 
                        section:"S16", 
                        faculty: "DOE, JOHN", 
                        day:"JAN 30", 
                        startTime:"09:00",
                        endTime : "16:30",
                        room: "G301"
                    },
                    {
                        id: 2, 
                        classNmbr: 3048,
                        course: "LASARE2", 
                        section:"S17", 
                        faculty: "THO, JANE", 
                        day:"APR 12", 
                        startTime:"11:00",
                        endTime : "15:30",
                        room: "G306"
                    }
        
                ],
                
                prefContent: ['Match Preferences','> Earliest Start Time: 11:00 AM', '> Earliest End Time: 4:00 PM', ' ', 'Unmatched Preferences', '> Professor Fritz Flowers not included'],
                
                conflictsContent: ['> CSSERVM conflicts with with ClassB2', '> TREDTRI conflicts with with ClassC3'],    

            }

        ]

        return (
            <div>
                {this.props.menu()}
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
                            <Row vertical = 'center'>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3 className='priortyTitle'>Highest Priority</h3>
                                    <CourseDnD idTag={this.state.highPriorityId} courses={this.state.highCourses} updateFunction={this.updateHighPriorty}/>

                                </Column>
                                <Column flexGrow={1} horizontal = 'center'>
                                    <h3 className='priortyTitle'>Lowest Priority</h3>
                                    <CourseDnD idTag={this.state.lowPriorityId} courses={this.state.lowCourses} updateFunction={this.updateLowPriority}/>
                                </Column>
                            </Row>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <button className="btn btn-secondary btn-sm" onClick={()=>this.createSchedInfo(jsonSample)}>Generate Schedule</button>
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