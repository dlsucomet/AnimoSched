import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Menu from '../components/Menu';
import CourseDnD from '../components/CourseDnD';

class GenerateSchedule extends Component {
    render() { 
        let search_field = this.props.search_field;
        return (
            <div>
                <Menu />
                <div>
                    <Column flexGrow={1}>
                        <Row horizontal = 'center'>
                            <h1>Term 2, AY2019-2020</h1>
                        </Row>
                        <Row horizontal = 'center'>
                            <div id="search_container">
                                <Input
                                type="search"
                                name={search_field}
                                id="exampleSearch"
                                placeholder="Enter Course Name..."
                                />
                            </div>
                        </Row>
                        <Row vertical = 'center'>
                            <Column flexGrow={1} horizontal = 'center'>
                                <h3>Highest Priority</h3>
                                <span>Courses ABC</span>
                                <span><CourseDnD /></span>
                                {/* <div id="highPriorityContainer">
                                    <Container onDrop={this.props.onDrop}>
                                        {this.props.items.map(item => {
                                            return (
                                                <Draggable key = {item.id}>
                                                    {this.props.renderItem(item)}
                                                </Draggable>
                                            );
                                        })}
                                    </Container>
                                </div> */}
                            </Column>
                            <Column flexGrow={1} horizontal = 'center'>
                                <h3>Lowest Priority</h3>
                                <span>Courses XYZ</span>
                                <span><CourseDnD /></span>
                            </Column>
                        </Row>
                        <Row horizontal = 'center'>
                            <button className="btn btn-secondary btn-sm">Generate Schedule</button>
                        </Row>
                    </Column>
                </div>
            </div>  
        );
    }
}




export default GenerateSchedule;