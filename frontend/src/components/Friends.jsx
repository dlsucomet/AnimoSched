import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import '../css/Friends.css';

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card
  } from 'reactstrap';

import Badge from '@material-ui/core/Badge';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class Friends extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            requests: [
                // this.createRequests("Katniss", "Everdeen", "new"),
                // this.createRequests("Peeta", "Mellark", "new"),
                // this.createRequests("Beatrice", "Prior", "accept"),
                // this.createRequests("Tobias", "Eaton", "delete"),
                // this.createRequests("Yeji", "Hwang", "accept"),
                // this.createRequests("Jisoo", "Choi", "accept")
            ],
            database: [
                // this.createDatabase("Amelia", "Earhart", false),
                // this.createDatabase("Beatrice", "Prior", true),
                // this.createDatabase("Maria", "Clara", false),
                // this.createDatabase("Mara", "Makiling", false)
            ],
            friends: [],
            panel: "requests",
            changePanel: null,
            polling: true,
            pollingInterval: 5000,
            newRequests: 0,
        }
    }

    createRequests(firstName, lastName, seenStatus, acceptStatus, id, from_user) {
        return { firstName, lastName, seenStatus, acceptStatus, id, from_user};
    }

    createDatabase(firstName, lastName, id) {
        return { firstName, lastName, id};
    }

    handleClick(e, action) {
        e.preventDefault();
        this.setState({panel: action});
        console.log(action);
    }

    getInfo(){
        axios.get('https://archerone-backend.herokuapp.com/api/friendrequestlist/'+localStorage.getItem('user_id')+'/')
        .then(res => {
            this.setState({requests: []})
            this.setState({newRequests: 0})
            var newRequests = this.state.newRequests;
            res.data.map(request => {
                const requests = this.state.requests
                requests.push(this.createRequests(request.from_user_fname, request.from_user_lname, request.seen, request.accepted, request.id, request.from_user))
                if(!request.seen){
                    newRequests += 1;
                }
                this.setState({requests})
            })
            this.setState({newRequests})
            // axios.get('https://archerone-backend.herokuapp.com/api/users/'+localStorage.getItem('user_id')+'/')
            // .then(res => {
            //     const friends = res.data.friends;

            // })
            this.poll()
        })
    }

    componentDidMount(){
        axios.get('https://archerone-backend.herokuapp.com/api/nonfriendlist/'+localStorage.getItem('user_id')+'/')
        .then(res => {
            const database = this.state.database;
            console.log(res.data)
            res.data.map(nonfriend => {
                database.push(this.createDatabase(nonfriend.first_name, nonfriend.last_name, nonfriend.id));
            })
            this.setState({database})
            this.getInfo();
        })
    }

    poll () {
        this.state.polling && clearTimeout(this.state.polling)
    
        const polling = setTimeout(() => {
            this.getInfo();
        }
        , this.state.pollingInterval)
    
        this.setState({
            polling
        })
    }

    handleFriendsClick = (e, action) => {
        this.setState({polling: false})
        this.setState({newRequests: 0})
        const requests = []
        this.state.requests.map(request => {
            axios.patch('https://archerone-backend.herokuapp.com/api/friendrequests/'+request.id+'/',{
                seen: true
            })
            request.seenStatus = true;
            requests.push(request)
        })
        this.setState({requests})
        this.setState({polling: true})
    }

    handleAcceptClick = (e, index, id, from_user) => {
        this.setState({polling: false})
        axios.get('https://archerone-backend.herokuapp.com/api/users/'+localStorage.getItem('user_id')+'/')
        .then(res => {
            const friends = res.data.friends;
            friends.push(from_user)
            axios.patch('https://archerone-backend.herokuapp.com/api/users/'+localStorage.getItem('user_id')+'/',{
                friends: friends
            })
            axios.patch('https://archerone-backend.herokuapp.com/api/friendrequests/'+id+'/',{
                seen: true,
                accepted: true
            })
        })
        const requests = this.state.requests;
        requests[index].acceptStatus = true;
        this.setState({requests})
        this.setState({polling: true})
    }

    handleDeleteClick = (e, index, id) => {
        this.setState({polling: false})
        axios.delete('https://archerone-backend.herokuapp.com/api/friendrequests/'+id+'/')
        const requests = [];
        this.state.requests.map((request, index2) => {
            if(index != index2){
                requests.push(request)
            }
        })
        this.setState({requests})
        this.setState({polling: true})
    }

    handleSendClick = (e, id) => {
        this.setState({polling: false})
        axios.post('https://archerone-backend.herokuapp.com/api/friendrequests/',{
            from_user: localStorage.getItem('user_id'),
            seen: false,
            accepted: false,
            to_user: id
        })
        this.setState({polling: true})
    }

    render (){
        const friendRequests = [];
        const friendList = [];
        const searchFriends = [];
        const currentPanel = this.state.panel;

        for(var i=0; i < this.state.requests.length; i++){
            friendRequests.push(this.state.requests[i]);
        }

        for(var i=0; i < this.state.requests.length; i++){
            if(this.state.requests[i].acceptStatus){
                friendList.push(this.state.requests[i]);
            }
        }

        for(var i=0; i < this.state.database.length; i++){
            searchFriends.push(this.state.database[i]);
        }

        if(currentPanel == "requests"){
            this.state.changePanel = 
                <div className="cardPanel">
                    {friendRequests.map((request, index) => (
                        <DropdownItem header className="panelItem">
                            <Row>
                                <Col xs={12} md={8}>
                                    <svg class="bi bi-circle-fill" id='profileLink' width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="8"></circle>
                                    </svg>
                                    <span> {request.firstName} {request.lastName} </span>
                                </Col>

                                {!request.acceptStatus &&
                                    <Col xs={6} md={4}>
                                        <Button onClick={(e) => this.handleAcceptClick(e, index, request.id, request.from_user)} variant="success" size="sm" className="marginRightSeparator">Accept</Button>
                                        <Button onClick={(e) => this.handleDeleteClick(e, index, request.id)} variant="secondary" size="sm">Delete</Button>
                                    </Col>
                                }

                                {request.acceptStatus &&
                                    <Col xs={6} md={4}>
                                        <span className="marginRightSeparator"> Accepted </span>
                                        <svg class="bi bi-check-circle" width="24" height="24" viewBox="0 0 16 16" fill="#006A4E" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path>
                                            <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"></path>
                                        </svg>
                                    </Col>
                                }

                                {/* {request.status == "delete" &&
                                    <Col xs={6} md={4}>
                                    <span className="marginRightSeparator"> Removed </span>
                                    <svg class="bi bi-x-circle" width="21" height="21" viewBox="0 0 16 16" fill="#8E1600" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"></path>
                                        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"></path>
                                        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </Col>
                                }  */}
                            </Row>
                        </DropdownItem>
                    ))}
                </div>;
        }else if(currentPanel == "list"){
            this.state.changePanel = 
                <div className="cardPanel">
                    {friendList.map(friend => (
                        <DropdownItem className="panelItem">
                            <svg class="bi bi-circle-fill" id='profileLink' width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="8"></circle>
                            </svg>
                            <span> {friend.firstName} {friend.lastName} </span>
                        </DropdownItem>
                    ))}


                    <DropdownItem header> 
                        <a href='javascript:void(0)' id="dropdownFooter">More Details</a>
                    </DropdownItem>
                </div>;
        }else{
            this.state.changePanel = 
                <div className="cardPanel">

                    <DropdownItem header className="dropdownHeader"> 
                        <TextField id="outlined-basic" label="Search Friends" variant="outlined" />
                    </DropdownItem>

                    {searchFriends.map(search => (
                        <DropdownItem header className="panelItem">
                            <Row>
                                <Col xs={12} md={8}>
                                    <svg class="bi bi-circle-fill" id='profileLink' width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="8"></circle>
                                    </svg>
                                    <span> {search.firstName} {search.lastName} </span>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Button onClick={(e) => this.handleSendClick(e, search.id)}variant="success" size="sm">Add</Button>
                                </Col>
                            </Row>
                        </DropdownItem>
                    ))}
                </div>;
        }
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle tag="span" data-toggle="dropdown" onClick={this.handleFriendsClick}>
                <Badge badgeContent={this.state.newRequests} color="error" overlap="circle">
                    <svg class="bi bi-people-fill" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"></path>
                    </svg>
                </Badge>
                </DropdownToggle>
                
                <DropdownMenu right id="dropdownMenu">

                        {this.state.panel == "list" &&
                            <DropdownItem header className="dropdownHeader">
                                <a href='javascript:void(0)' className="dropdownOption" onClick={(e) => this.handleClick(e,"requests")}>Friend Requests</a>
                                |
                                <a href='javascript:void(0)' className="dropdownOption" id="activeOption" onClick={(e) => this.handleClick(e,"list")}>Friend List</a>
                                |
                                <a href='javascript:void(0)' className="dropdownOption" onClick={(e) => this.handleClick(e,"find")}>Find Friends</a>
                            </DropdownItem>
                        }

                        {this.state.panel == "find" &&
                            <DropdownItem header className="dropdownHeader">
                                <a href='javascript:void(0)' className="dropdownOption" onClick={(e) => this.handleClick(e,"requests")}>Friend Requests</a>
                                |
                                <a href='javascript:void(0)' className="dropdownOption" onClick={(e) => this.handleClick(e,"list")}>Friend List</a>
                                |
                                <a href='javascript:void(0)' className="dropdownOption" id="activeOption" onClick={(e) => this.handleClick(e,"find")}>Find Friends</a>
                            </DropdownItem>
                        }

                        {this.state.panel == "requests" &&
                            <DropdownItem header className="dropdownHeader">
                                <a href='javascript:void(0)' className="dropdownOption" id="activeOption" onClick={(e) => this.handleClick(e,"requests")}>Friend Requests</a>
                                |
                                <a href='javascript:void(0)' className="dropdownOption" onClick={(e) => this.handleClick(e,"list")}>Friend List</a>
                                |
                                <a href='javascript:void(0)' className="dropdownOption" onClick={(e) => this.handleClick(e,"find")}>Find Friends</a>
                            </DropdownItem>
                        }
                    {this.state.changePanel}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

export default Friends 