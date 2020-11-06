import React from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';


const NavigationBar = () => {
    return (
        <Navbar class="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Collab-a-Note</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="DashBoard" id="collasible-nav-dropdown" href="">
                    <NavDropdown.Item href="dashboard/course/1">Course 1</NavDropdown.Item>
                    <NavDropdown.Item href="dashboard/course/2">Course 2</NavDropdown.Item>
                    <NavDropdown.Item href="dashboard/course/3">Course 3</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="dashboard">View all</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                <Nav.Link href="auth">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
    )
}


export default NavigationBar