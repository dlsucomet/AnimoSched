import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from '../components/ultils';
import '../css/CourseDnD.css';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const groupStyle = {
    marginLeft: '50px',
    flex: 1
  };


class CourseDnD extends Component {
  constructor(props) {
    super();
     
    this.state = {
        highCourses: [],
        //highCourses: generateItems(4, (index) => ( {id: "1" + index, data: 'Majors' + index})),
      //lowCourses: generateItems(4, (index) => ( {id: '2' + index,data: 'Minors' + index})),
      highContainer: {
        id: 'columns1',
        type: "container",
        name: "Highest Priority",
        props: {
            orientation: "vertical",
            className: "card-container"
        }
      },
      lowContainer: {
        id: 'columns2',
        type: "container",
        name: "Lowest Priority",
        props: {
            orientation: "vertical",
            className: "card-container"
        }
    }
      
    };

    this.courseName = React.createRef();
  }

componentDidMount(){
    this.refreshList();
}

    refreshList = () => {
        var newItems = ['Ad','Josh'];
        if(this.props.idTag == '1'){
            newItems = ["Major1", "Major2", "Major3"];
        }else if(this.props.idTag == '2'){
            newItems = ["Minor1", "Minor2", "Minor3"];
        }

        for(let i = 0; i < newItems.length; i++) {
            this.setState(state =>{
                const oldItems = state.highCourses;
                const highCourses = state.highCourses.concat({id: this.props.idTag + oldItems.length, data: newItems[i]});
                return{highCourses};
            });
        }
    }

  

  render() {
    let searchCourseField = this.props.searchCourseField;
    return (
       
      <div>
        <div className="simple-page1" style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px' }}>
          <div style= {groupStyle}>
            <Container groupName="1" getChildPayload={i => this.state.highCourses[i]} onDrop={e => this.setState({ highCourses: applyDrag(this.state.highCourses, e) })}>
                {this.state.highCourses.map(p => {
                return (
                    <Draggable key={p.id}>
                    <div className="draggable-item">
                        {p.data}
                    </div>
                    </Draggable>
                );
                })}
            </Container>
        </div>
        </div>
 
          <div id="search_container">
            <input ref={this.courseName}
            type="text"
            name={searchCourseField}
            id="exampleSearch"
            placeholder="Enter Course Name..."/>
          </div>
          <button className="addBtn" onClick={this.addCard}>Add course</button>

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
        const oldItems = state.highCourses;
        const highCourses = state.highCourses.concat({id: this.props.idTag + oldItems.length, data: name});
        return{highCourses};
      });
    };


    onClearArray = () => {
      this.setState({highCourses: []});
    };
  }

//figure out how to add children when adding a new course
export default CourseDnD;