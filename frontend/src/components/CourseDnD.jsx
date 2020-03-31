import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from '../components/ultils.jsx';
import '../css/CourseDnD.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from "axios";

const groupStyle = {
    marginLeft: '50px',
    flex: 1
  };


class CourseDnD extends Component {

  constructor(props) {
    super(props);
    

    this.state = {
        courses: this.props.courses,
        idTag: this.props.idTag
    };

  }

componentWillReceiveProps(props) {
  this.refreshList(props);

}

componentDidMount(){
  this.refreshList(this.props);
}

refreshList = (props) => {
    var newItems = props.courses;
    this.setState({courses:[]})

    for(let i = 0; i < newItems.length; i++) {
        this.setState(state =>{
            const courses = state.courses.concat({id: newItems[i].id, course_id: newItems[i].course_id, data:newItems[i].data});
            return{courses};
        });
    }   
}

removeCourse = (index) =>{
  this.props.handleCourseDelete(this.state.courses[index])
  var newCourses = [...this.state.courses];
  if(index !== -1){
    newCourses.splice(index, 1);
  }
  this.props.updateFunction(newCourses);
}

triggerUpdate=(e)=>{
  if(e.removedIndex == null){
    if(e.addedIndex != null){
      if(this.state.idTag == "1"){
        axios.put('http://localhost:8000/api/coursepriority/'+e.payload.id+'/',{
          courses:e.payload.course_id, priority:true, user:localStorage.getItem('user_id')
        }).catch(e => {
          console.log(e.response)
        })
      }else if(this.state.idTag == "2"){
        axios.put('http://localhost:8000/api/coursepriority/'+e.payload.id+'/',{
          courses:e.payload.course_id, priority:false, user:localStorage.getItem('user_id')
        }).catch(e => {
          console.log(e.response)
        })
      }

    }

  }
  // else if(e.addedIndex == null){
  //   if(e.removedIndex != null){
  //     console.log(e.payload)

  //   }

  // }
  this.setState({ courses: applyDrag(this.state.courses, e) })
  this.props.updateFunction(this.state.courses);
  // console.log(this.props.idTag + " course state contains: " +this.state.courses);
}

  render() {
    return (
       
      <div>

        <div className="simple-page1" style={{ display: 'flex', justifyContent: 'center'}}>
          <div className= "card-container" >
            <Container groupName="1" getChildPayload={i => this.state.courses[i]} onDrop={this.triggerUpdate}>
                {this.state.courses.map((p, index) => {
                return (
                    <Draggable key={p.id}>
                    <div className="draggable-item">
                        {p.data}
                        <Button close  style={{ marginTop: "11px", marginRight: "10px"}} onClick={() => this.removeCourse(index)}/>
                    </div>
                    </Draggable>
                );
                })}
            </Container>
        </div>
        </div>
 
          {/* <button className="addBtn" onClick={this.refreshList}>Add course</button> */}

      </div>
    );
  }
  
    // render() {
    //   return (
    //     <div className="card-scene" >
    //       <Container
    //         orientation="horizontal"
    //         onDrop={this.onColumnDrop}
    //         dragHandleSelector=".column-drag-handle"
    //         dropPlaceholder={{
    //           animationDuration: 150,
    //           showOnTop: true,
    //           className: 'cards-drop-preview'
    //         }}
    //       >
    //         {this.state.scene.children.map(column => {
    //           return (
    //             <Draggable key={column.id} >
    //               <div className={column.props.className}>
    //                 <div className="card-column-header">
    //                   <span className="column-drag-handle">&#x2630;</span>
    //                   {column.name}
    //                 </div>
    //                 <Container
    //                   {...column.props}
    //                   groupName="col"
    //                   onDragStart={e => console.log("drag started", e)}
    //                   onDragEnd={e => console.log("drag end", e)}
    //                   onDrop={e => this.onCardDrop(column.id, e)}
    //                   getChildPayload={index =>
    //                     this.getCardPayload(column.id, index)
    //                   }
    //                   dragClass="card-ghost"
    //                   dropClass="card-ghost-drop"
    //                   onDragEnter={() => {
    //                     console.log("drag enter:", column.id);
    //                   }}
    //                   onDragLeave={() => {
    //                     console.log("drag leave:", column.id);
    //                   }}
    //                   onDropReady={p => console.log('Drop ready: ', p)}
    //                   dropPlaceholder={{                      
    //                     animationDuration: 150,
    //                     showOnTop: true,
    //                     className: 'drop-preview' 
    //                   }}
    //                   dropPlaceholderAnimationDuration={200}
    //                 >
    //                   {column.children.map(card => {
    //                     return (
    //                       <Draggable key={card.id}>
    //                         <div {...card.props}>
    //                           <p>{card.data}</p>
    //                         </div>
    //                       </Draggable>
    //                     );
    //                   })}
    //                 </Container>
    //               </div>
    //             </Draggable>
    //           );
    //         })}
    //       </Container>
    //     </div>
    //   );
    // }
  
    getCardPayload(columnId, index) {
      return this.state.scene.children.filter(p => p.id === columnId)[0].children[
        index
      ];
    }
  
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.state.scene);
      scene.children = applyDrag(scene.children, dropResult);
      this.setState({
        scene
      });
    }
  
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.state.scene);
        const column = scene.children.filter(p => p.id === columnId)[0];
        const columnIndex = scene.children.indexOf(column);
  
        const newColumn = Object.assign({}, column);
        newColumn.children = applyDrag(newColumn.children, dropResult);
        scene.children.splice(columnIndex, 1, newColumn);
  
        this.setState({
          scene
        });
      }
    }

    addCard = (name) => {
      this.setState(state =>{
        const oldItems = state.courses;
        const courses = state.courses.concat({id: this.props.idTag + oldItems.length, data: name});
        return{courses};
      });
    };


    onClearArray = () => {
      this.setState({courses: []});
    };
  }

//figure out how to add children when adding a new course
export default CourseDnD;