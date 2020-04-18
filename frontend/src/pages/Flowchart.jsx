import React, { Component } from "react";
import '../css/Flowchart.css';
import SidebarIMG from '../images/Login.svg';
import Menu from '../components/Menu.jsx';

import { Flowpoint, Flowspace } from 'flowpoints';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

const styles = theme => ({
  flowchartText:{
      overflow: 'hidden',
      textOverflow: "ellipsis",
      textAlign: "center",
      fontSize: "0.7rem",
      // color: "green", 
      '&:hover': {
          color: "green"
        },
  }
});

class Flowchart extends Component {
    constructor(props){
      super(props);
      this.state = {
        terms: [],
        courses: [],
        flowpoints: [],
        degreekey: '1',
        batchkey: '116',
        dataReceived: false
      }
    }

    componentDidMount() {
      // const degreekey = '1';
      // const batchkey = '116';
      axios.get('https://archerone-backend.herokuapp.com/api/flowcharttermslist/'+this.state.degreekey+'/'+this.state.batchkey+'/')
      .then(res => {
        res.data.map((term, i) => {
                var termsList = this.state.terms;
                var coursesList = this.state.courses;
                var flowpointsList = this.state.flowpoints;
                var newTerm = {'id':term.id, 'degree':term.degree, 'batch': term.batch, 'courses': term.courses, 'year': term.year, 'term': term.term} 
                var currentTerm = term.term + 3 * (term.year - 1);
                termsList.push(newTerm);
                term.courses.map((course, j) => {
                  var outputsList = {};
                  coursesList.push(course);
                  console.log(course);
                  course.prerequisite_to.map((prereq_to) => {
                    outputsList[prereq_to] = { output: "right", input: "left" }                    
                  })                  
                  console.log(outputsList);
                  flowpointsList.push({'key': course.id, 'name': course.course_code, 'units': course.units, 'startPosition': { x:(currentTerm-1)*85, y:j*45 }, 'width': 70, 'height': 40, 'dragX': false, 'dragY': false, 'outputs': outputsList});
                })
                this.setState({terms: termsList})
                this.setState({courses: coursesList})
                this.setState({flowpoints: flowpointsList})                
        })
        this.setState({dataReceived: true})
      })
    
  // console.log(this.state.flowpoints)
  // console.log(this.state.terms)
    }

    render() {
      const { classes } = this.props;
      // console.log(this.state.terms)
    //   const flowchartCells = this.state.terms.map((item, i) => {
    //     return (
    //         <Flowspace theme="green" variant="outlined">
    //           {item.courses.map((course, j) => {
    //             // console.log(course.course_code)
    //             return (
    //               <Flowpoint key={course.course_code} startPosition={{ x:i*180, y:j*70 }} dragX={false} dragY={false}>
    //                 {course.course_code}
    //               </Flowpoint>
    //             )
    //           })}            
    //         </Flowspace>
    //        );
    // });
    // outputs={{"point_b": {input: "left", output: "right", outputColor:"green", inputColor:"green",},}}

      return (
        <div>
            {this.props.menu('flowchart')}

            {this.state.dataReceived ? 
            <div>
              <div class="sidemenu">
                  <center><input type="submit" class="btn btn-success change-flowchart" value="CCS 116 CS" /></center>
                  {/* <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center> */}
                  {/* <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center> */}
              </div>

              <div class="sidemenu-main">
                <br/>
                  <center><h2>YOUR FLOWCHART</h2></center>
                  <div class="flowchart-area">
                    <div class="flowchart-header-parent">
                      <div class="header-year-parent">
                        <div class="header-year">Year 1</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                      <div class="header-year-parent">
                        <div class="header-year">Year 2</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                      <div class="header-year-parent">
                        <div class="header-year">Year 3</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                      <div class="header-year-parent">
                        <div class="header-year">Year 4</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                    </div>
                      {/* {flowchartCells} */}
                      {/* headers */}
                      <Flowspace theme="green" variant="paper" background="white" style={{ overflow: 'visible', height:"100%", width:"100%" }}>
                        {
                          Object.keys(this.state.flowpoints).map(key => {
                            const point = this.state.flowpoints[key]
                            return (
                              <Flowpoint
                                key={point.key}
                                startPosition={point.startPosition} 
                                width={point.width} 
                                height={point.height} 
                                dragX={point.dragX} 
                                dragY={point.dragY} 
                                outputs={point.outputs}>
                                <div className={classes.flowchartText}>{point.name}<br />{point.units}</div>
                              </Flowpoint>

                              // <Flowpoint
                              //   key={key}
                              //   startPosition={point.pos}
                              //   onClick={() => {
                              //     var selected_point = this.state.selected_point
                              //     if (selected_point === key) {
                              //       selected_point = null
                              //     } else {
                              //       selected_point = key
                              //     }
                              //     this.setState({selected_point})
                              //   }}
                              //   onDrag={position => {
                              //     var flowpoints = this.state.flowpoints
                              //     flowpoints[key].position = position
                              //     this.setState({flowpoints})
                              //   }}>                                
                              // </Flowpoint>
                            )
                          })
                        }
                    </Flowspace>
                  </div>
              </div>
            </div>
            : 
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
              <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
            </div>
           }
        </div>        
      );
    }
  }

  Flowchart.propTypes={
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(Flowchart);