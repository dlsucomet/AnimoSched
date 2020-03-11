import React from 'react';
import { Nav, NavItem, Navbar, Badge, NavDropdown } from 'react-bootstrap';
import FriendRequests from '../images/NavBar-FriendRequest.png';
import Notifications from '../images/NavBar-Notification.png';
import '../css/Menu.css';

class Menu extends React.Component{
    render (){
        return(
            <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
                <Navbar.Brand href="/">ArcherOne</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> */}
                    
                    <Nav className="ml-auto">
                        {/* NAV BAR WHEN LOGGED IN */}
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Sign Up</Nav.Link>

                        <Nav.Link href="#deets">Preferences</Nav.Link>
                        <Nav.Link href="#deets">Search Courses</Nav.Link>
                        <Nav.Link href="/generateSchedule">Generate Schedule</Nav.Link>
                        <Nav.Link href="#deets">View Flowchart</Nav.Link>
                        <Nav.Link href="/profile">
                            <svg class="bi bi-circle-fill" id='profileLink' width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="8"></circle>
                            </svg>
                            Name
                        </Nav.Link>
                        <Nav.Link href="#deets">
                            {/* <img class='img-responsive' src={FriendRequests}/> */}
                            <svg class="bi bi-people-fill" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"></path>
                            </svg>
                        </Nav.Link>
                        <Nav.Link href="#deets">
                            {/* <img class='img-responsive' id='notifBell' src={Notifications}/> */}
                            <svg class="bi bi-bell-fill" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 005 8c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"></path>
                            </svg>
                        </Nav.Link>
                        <NavDropdown id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Nav.Link eventKey={2} href="#memes"> Dank memes </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu 