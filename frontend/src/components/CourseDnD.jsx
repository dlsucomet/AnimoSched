import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from '../components/ultils';
import '../css/CourseDnD.css';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class CourseDnD extends Component {
  constructor(props) {
    super();
    this.state = {
      items: generateItems(4, (index) => {
        return {
          id: index,
          data: 'Majors' + index
        };
      }),
      courseName: "",
    };

    this.courseName = React.createRef();
  }

  

  render() {
    let searchCourseField = this.props.searchCourseField;
    return (
      <div>
        <div className="simple-page">
          <Container onDrop={e => this.setState({ items: applyDrag(this.state.items, e) })}>
            {this.state.items.map(p => {
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
 
          <div id="search_container">
            <input ref={this.courseName}
            type="text"
            name={searchCourseField}
            id="exampleSearch"
            placeholder="Enter Course Name..."
            />
          </div>
          <button className="addBtn" onClick={this.addCard}>Add course</button>

      </div>
    );
  }

    
    // constructor() {
    //   super();
  
    //   this.onColumnDrop = this.onColumnDrop.bind(this);
    //   this.onCardDrop = this.onCardDrop.bind(this);
    //   this.getCardPayload = this.getCardPayload.bind(this);
    //   this.state = {
    //     scene: {
    //       type: "container",
    //       props: {
    //         orientation: "horizontal"
    //       },
    //       children: generateItems(2, i => ({
    //         id: `column${i}`,
    //         type: "container",
    //         name: columnNames[i],
    //         props: {
    //           orientation: "vertical",
    //           className: "card-container",
    //         },
    //         children: generateItems(4, j => ({
    //           type: "draggable",
    //           id: `${i}${j}`,
    //           props: {
    //             className: "card",
    //             style: { backgroundColor: '#98FB98' }
    //           },
    //           data: courses[j]
    //         }))
    //       }))
    //     },
    //   };
    // }
  
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

    addCard = () => {
      this.setState(state =>{
        const oldItems = state.items;
        const items = state.items.concat({id: oldItems.length, data: this.courseName.current.value});
        return{items};
      });
    };

    onClearArray = () => {
      this.setState({items: []});
    };
  }

//figure out how to add children when adding a new course
export default CourseDnD;