import React, { Component } from "react";
import '../css/FriendPage.css';
import { Button, Row, Col, Tabs, Tab } from 'react-bootstrap';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
    DropdownMenu,
    DropdownItem,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = theme => ({
    pencilIcon:{ 
        marginLeft: "10px",
        '&:hover': {
            backgroundColor: "white",
            color: "gray"
          },
    },
    checkIcon:{
        color: "green", 
        '&:hover': {
            backgroundColor: "white",
            color: "#79c879"
          },
    }
  });

class FriendPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            requests: [
                this.createRequests("Katniss", "Everdeen", "new"),
                this.createRequests("Peeta", "Mellark", "new"),
                this.createRequests("Beatrice", "Prior", "accept"),
                this.createRequests("Tobias", "Eaton", "delete"),
                this.createRequests("Yeji", "Hwang", "accept"),
                this.createRequests("Jisoo", "Choi", "accept"),
                this.createRequests("Ryujin", "Shin", "accept"),
                this.createRequests("Chaeryeong", "Lee", "accept"),
                this.createRequests("Yuna", "Shin", "accept"),
                this.createRequests("Nayeon", "Im", "accept"),
                this.createRequests("Jeongyeon", "Yoo", "accept"),
                this.createRequests("Momo", "Hirai", "accept"),
                this.createRequests("Sana", "Minatozaki", "accept"),
                this.createRequests("Jihyo", "Park", "accept"),
                this.createRequests("Mina", "Myoui", "accept"),
                this.createRequests("Dahyun", "Kim", "accept"),
                this.createRequests("Chaeyoung", "Son", "accept"),
                this.createRequests("Tzuyu", "Chou", "accept")
            ]
        }
    }

    createRequests(firstName, lastName, status) {
        return { firstName, lastName, status };
    }

    render() {
        const friendList = [];

        for(var i=0; i < this.state.requests.length; i++){
            if(this.state.requests[i].status == "accept")
                friendList.push(this.state.requests[i]);
        }
        
        return (
            <div>
                {this.props.menu()}
                <div>
                    <div class="friendMenu">
                        <div class="titleRow" style={{height: "30%"}}>
                            <center>
                                <h1>FRIENDS</h1>
                                <svg class="bi bi-people-fill" width="75" height="75" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"></path>
                                </svg>
                            </center>
                        </div>

                        <div style={{height: "100%"}}>
                            
                         <center>
                            <Autocomplete
                                key={"friendPage_searchFriends"}
                                id="friendPage_searchFriends"
                                options={friendList}
                                getOptionLabel={(option) => option.firstName + " " + option.lastName}
                                style={{ width: "95%", marginBottom: "10%" }}
                                filterSelectedOptions
                                onChange={this.handleEditChange}
                                renderInput={(params) => <TextField {...params} label="Search Friends" variant="outlined" placeholder="FirstName LastName"/>}
                                />
                                {/* <input style={{marginBottom: "10%"}}></input> */}
                        </center>

                            <ListGroup flush style={{height: "50%", overflowX: "hidden"}}>
                                {friendList.map(friend => (
                                    <ListGroupItem tag="a" href="#" action>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <span> {friend.firstName} {friend.lastName} </span>
                                            </Col>

                                            <Col xs={6} md={4}>
                                                <svg class="bi bi-check-circle" width="24" height="24" viewBox="0 0 16 16" fill="#006A4E" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path>
                                                    <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"></path>
                                                </svg>
                                            </Col>
                                        </Row>                        
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </div>

                    <div class="sidemenu-main">
                        <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                            <Tab eventKey="details" title="Details">
                                <br/>
                                <center><h1>NAME</h1></center>
                            </Tab>

                            <Tab eventKey="schedule" title="Schedule">
                                Duis vitae felis vel massa sollicitudin sollicitudin. Morbi egestas nulla et augue aliquam, eget condimentum felis molestie. Nullam ac metus ac nibh finibus tristique. Donec non faucibus augue, eget euismod justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam risus turpis, scelerisque eget facilisis quis, egestas nec tortor. Aenean vel dignissim erat. Ut augue lectus, dictum id sapien sed, placerat pellentesque urna. Ut pharetra mauris nisi, ac varius urna pretium a. Sed fermentum nibh nisl, ut posuere leo tempus id. Sed condimentum massa et velit mollis, eget fermentum nisi efficitur. Curabitur varius ipsum eget sapien auctor, eu gravida lorem facilisis. Nam hendrerit lorem nec nibh ultrices dapibus. Maecenas vel sodales libero. Nam interdum scelerisque diam et congue.
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>     
        );
    }
}

  FriendPage.propTypes={
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(FriendPage);