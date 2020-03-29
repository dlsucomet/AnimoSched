import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import {Input} from 'reactstrap';
import Menu from '../components/Menu.jsx';
import CourseDnD from '../components/CourseDnD';
import '../css/GenerateSchedule.css';
import GenSchedInfo from '../components/GenSchedInfo';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


class GenerateSchedule extends Component {

    constructor(props) {
        super(props);
        this.updateHighPriority = this.updateHighPriority.bind(this);
        this.updateLowPriority = this.updateLowPriority.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.generatedRef = React.createRef();
        this.handleScrollToGen = this.handleScrollToGen.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);
        // this.updateSchedTitle = this.updateSchedTitle.bind(this);
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: [],
            lowCourses: [],
            courseList: [],
            currentPage: 0,
            currentContent: "",
            currentCourse: "",
            generatedContents: [],
            // generatedContents : ['Hello', 'There', 'Josh'],
            // currentContent: ['Hello'],
            pagesCount: 1,
            searchedCourse: "",
            hideGenContent:true,
            savedScheds: [],
            saveButtonLabel: "Save Schedule",
            saveButtonStyle: {margin: "30px"},
            //temp
            id:0
        

            
        };

    }

    componentWillMount(){
        const id = localStorage.getItem('user_id');
        axios.get('http://localhost:8000/api/courses/')
        .then(res => {
            console.log(res)
            res.data.map(course => {
                var courses = this.state.courseList;
                var addCourse = {'id':course.id,'course_code':course.course_code}
                courses.push(addCourse)
                this.setState({courseList: courses})
            })
            axios.get('http://localhost:8000/api/courseprioritylist/'+id+'/')
            .then(res => {
                res.data.map(preference =>{
                    console.log(preference)
                    if(preference.course_priority != null){
                        axios.get('http://localhost:8000/api/coursepriority/'+preference.course_priority+'/')
                        .then(res => {
                            const id = res.data.id
                            const priority = res.data.priority
                            var newCourseList = []
                            this.state.courseList.map(course =>{
                                if(course.id == res.data.courses){
                                    if(priority){
                                        var courses = this.state.highCourses;
                                        courses.push({'id':id, 'course_id':course.id, 'data':course.course_code})
                                        this.setState({highCourses: courses})
                                    }else{
                                        var courses = this.state.lowCourses;
                                        courses.push({'id':id, 'course_id':course.id, 'data':course.course_code})
                                        this.setState({lowCourses: courses})
                                    }
                                }else{
                                    newCourseList.push(course)
                                }
                            })
                            this.setState({courseList:newCourseList})
                        })
                    }
                })
            });
        })
    }

    saveCourses = () => {
        // const priority = res.data.priority
        // var newCourseList = []
        // this.state.courseList.map(course =>{
        //     if(course.id == res.data.courses){
        //         if(priority){
        //             var courses = this.state.highCourses;
        //             courses.push(course.course_code)
        //             this.setState({highCourses: courses})
        //         }else{
        //             var courses = this.state.lowCourses;
        //             courses.push(course.course_code)
        //             this.setState({lowCourses: courses})
        //         }
        //     }else{
        //         newCourseList.push(course)
        //     }
        // })
        // this.setState({courseList:newCourseList})
    }

    componentDidMount(){
        // this.handleScrollToGen();
    }

    componentDidUpdate(prevProp, prevState){
        if(prevState.generatedContents !== this.state.generatedContents){
            this.handleScrollToGen();
            prevState.generatedContents = this.state.generatedContents;
        }
       
    }

    // handleKeyPress = (event) => {
    //     if(event.key === 'Enter'){
    //         const newCourse = event.target.value;
    //         this.setState(state =>{
    //             const highCourses = state.highCourses.concat(newCourse);
    //             return{highCourses};
    //         });
    //         console.log(this.state.highCourses)
    //     }
    // }
    handleCourseDelete = (addCourse) => {
        console.log(addCourse)
        console.log(this.state.courseList)
        const newCourseList = [];
        this.state.courseList.map(course => {
            newCourseList.push(course)
        })
        newCourseList.push({'id':addCourse.course_id, 'course_code':addCourse.data})
        console.log(newCourseList)
        this.setState({courseList:newCourseList})
    }

    handleAutoCompleteChange = (e, val) => {
        this.setState({currentCourse: val});
    }

    handleAutoCompletePress = (e) => {
        const val = this.state.currentCourse;
        if(e.key === 'Enter'){
            const newCourseList = [];

            if(val != undefined){
                this.state.courseList.map(course => {
                    if(course.id != val.id){
                        console.log(course.course_code)
                        newCourseList.push(course)
                    }
                })
                this.setState({courseList:newCourseList})
                if(val.course_code != undefined && val.course_code.trim() != ''){
                    this.state.id = this.state.id + 1;
                    const newCourse = {'id':this.state.id,'course_id':val.id,'data':val.course_code}; 
                    console.log(newCourse)
                    this.setState(state =>{
                        const highCourses = state.highCourses.concat(newCourse);
                        return{highCourses};
                    });
                    console.log(this.state.highCourses)
                }
                console.log(e.target)
            }
        }
    }
    

    handlePageChange = (e,index) => {
  
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

        this.handleScrollToGen();

        if(this.state.savedScheds.includes(this.state.generatedContents[index])){
            console.log("Saved Scheds: " + this.state.savedScheds.length);
            this.setState({saveButtonLabel: "Saved"});
            const styleChange = {margin: "30px", backgroundColor: "white", color: "#16775D"};
            this.setState({saveButtonStyle: styleChange});
        }else{
            this.setState({saveButtonLabel: "Save Schedule"});
            const styleChange = {margin: "30px", backgroundColor: "#16775D", color: "white"};
            this.setState({saveButtonStyle: styleChange});
        }
    }

    createSchedInfo = (arrayGenSched)=>{
        var generatedContents = arrayGenSched.map((item, index) =>
                <GenSchedInfo key={item.id} id={item.id} scheduleContent={item.scheduleContent} tableContent={ item.tableContent} prefContent={item.prefContent} conflictsContent={item.conflictsContent} titleName={item.title} updateSchedTitle={this.updateSchedTitle}/>
        );

        this.setState({generatedContents});
        var currentContent = generatedContents[0];
        this.setState({currentContent});
        this.setState({hideGenContent: false});

        this.handleScrollToGen();

    }

    updateHighPriority(courseUpdate){
        var newArray = [];
        courseUpdate.map(course=>{
            newArray.push(course);
        })
        this.setState({highCourses: newArray})
    }

    updateLowPriority(courseUpdate){
        var newArray = [];
        courseUpdate.map(course=>{
            newArray.push(course);
        })
        this.setState({lowCourses: newArray})
    }
    
    updateSchedTitle=(text)=>{
         var newArray = [];
         const currentContent = this.state.currentContent;
        // var index = newArray.findIndex(this.state.currentContent);
        const newContent = <GenSchedInfo key={currentContent.props.id} id={currentContent.props.id} scheduleContent={currentContent.props.scheduleContent} tableContent={currentContent.props.tableContent} prefContent={currentContent.props.prefContent} conflictsContent={currentContent.props.conflictsContent} titleName={text} updateSchedTitle={this.updateSchedTitle}/>

        this.state.generatedContents.map(value=>{
            if(value.key == this.state.currentContent.key){
                newArray.push(newContent)
            }else{
                newArray.push(value)
            }
        })

        this.setState({generatedContents: newArray});
    }
    handleScrollToGen=()=>{
        console.log("I'm scrollinggg");
        window.scrollTo({
            top: this.generatedRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    handleSaveChange=()=>{

        if(this.state.savedScheds.includes(this.state.currentContent)){
            
            var newArray = [...this.state.savedScheds];
            var index = newArray.filter(value => value.id == this.state.currentContent.id); 
            console.log("SavedSched Index: " + index);
            if(index !== -1){
                newArray.splice(index, 1);
              }
            
            this.setState({savedScheds: newArray});

            this.setState({saveButtonLabel: "Save Schedule"});
            const styleChange = {margin: "30px", backgroundColor: "#16775D", color: "white", border: "none"};
            this.setState({saveButtonStyle: styleChange});
        }else{


            this.setState(state=>{
                const savedScheds = state.savedScheds.concat(state.currentContent);
                console.log("No. of Saved Scheds: " + savedScheds.length);
                return {savedScheds};
                
            })
    
            
            this.setState({saveButtonLabel: "Saved"});
            const styleChange = {margin: "30px", backgroundColor: "white", color: "#16775D", borderStyle: "solid", borderColor: "#16775D"};
            this.setState({saveButtonStyle: styleChange});
            
        }
        

    }

    handleAddCoursePriority = () => {
        console.log("Generated");
    }

    render() { 
        let search_field = this.props.search_field;
        // const { currentPage } = this.state;
        this.state.pagesCount = this.state.generatedContents.length;
        this.state.currentContent = this.state.generatedContents[this.state.currentPage];
        const style = this.state.hideGenContent ? {display: "none"} :  {margin: "40px"};

        var jsonSample =[
            {
                id: 1,
                title: "Schedule 1",
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
                title: "Schedule 2",
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
                                    {/* <Input
                                    type="search"
                                    name={search_field}
                                    id="exampleSearch"
                                    placeholder="Enter Course Name..."
                                    value = {this.state.Input}
                                    onKeyPress={this.handleKeyPress}
                                    /> */}
                                    <Autocomplete
                                    options={this.state.courseList}
                                    getOptionLabel={option => option.course_code}
                                    style={{ width: 200 }}
                                    filterSelectedOptions
                                    renderInput={params => <TextField {...params} label="Course" variant="outlined" />}
                                    onChange={this.handleAutoCompleteChange}
                                    onKeyPress={this.handleAutoCompletePress}
                                    />
                                     
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color = "Primary"
                                        style={{backgroundColor: "green", color:"white", height:"56px", marginLeft:"5px"}}
                                        onClick={this.handleAddCoursePriority}>
                                        <AddIcon fontSize="medium"/>  
                                    </Button>

                                </div>
                            </Row>
                            <div className={"DnDContainer"}>
                                <Row vertical = 'center'>
                                    <Column flexGrow={1} horizontal = 'center'>
                                        <h3 className='priortyTitle'>Highest Priority</h3>
                                        <CourseDnD idTag={this.state.highPriorityId} courses={this.state.highCourses} updateFunction={this.updateHighPriority} handleCourseDelete={this.handleCourseDelete}/>

                                    </Column>
                                    <Column flexGrow={1} horizontal = 'center'>
                                        <h3 className='priortyTitle'>Lowest Priority</h3>
                                        <CourseDnD idTag={this.state.lowPriorityId} courses={this.state.lowCourses} updateFunction={this.updateLowPriority} handleCourseDelete={this.handleCourseDelete}/>
                                    </Column>
                                </Row>
                            </div>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <button className="schedButton" onClick={()=>this.createSchedInfo(jsonSample)} style={{marginTop: "20px"}}>Generate Schedule</button>
                            </Row>
                        </div>

                        <div className = "genSchedInfoContainer" style={style} ref={this.generatedRef} >
                            <span>{this.state.currentContent}</span>
                        
                            <div className = "paginationContainer">
                                <Row horizontal='center'>
                                    <Pagination aria-label="Page navigation example">
                                        <PaginationItem disabled={this.state.currentPage <= 0}>
                                            <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPage - 1)}
                                                previous/>
                                        </PaginationItem>
                                        {[...Array(this.state.pagesCount)].map((page, i) => 
                                            <PaginationItem active={i === this.state.currentPage} key={i} className={'paginationItemStyle'}>
                                                <PaginationLink onClick={e => this.handlePageChange(e, i)} className={'paginationLinkStyle'}>
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
                            </div>
                            <Row horizontal='center'>
                                <button className={"schedButton"} style={this.state.saveButtonStyle} onClick={this.handleSaveChange}>{this.state.saveButtonLabel}</button>
                            </Row>  
                        </div>
                    </Column>
                </div>
            </div>  
        );
    }
}




export default GenerateSchedule;