import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Menu from '../components/Menu';
import CourseDnD from '../components/CourseDnD';

class GenerateSchedule extends Component {
    constructor(props) {
        super();
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: ""
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.setState({value: event.target.value});
            console.log('enter press here! ');
            console.log(event.target.value);
        }
      }

    handleAddCard = () =>{

    }
    
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
                                value = {this.state.Input}
                                onKeyPress={this.handleKeyPress}

                                />
                            </div>
                        </Row>
                        <Row vertical = 'center'>
                            <Column flexGrow={1} horizontal = 'center'>
                                <h3>Highest Priority</h3>
                                <span><CourseDnD idTag={this.state.highPriorityId} ref="child"/></span>

                            </Column>
                            <Column flexGrow={1} horizontal = 'center'>
                                <h3>Lowest Priority</h3>
                                <span><CourseDnD idTag={this.state.lowPriorityId}/></span>
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