import React, { useState } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const NavigationBar = () => {
  const [error, setError] = useState("");
  const { signout } = useAuth();
  const history = useHistory();

  async function handleSignout() {
    setError("");
    try {
      await signout();
      history.push("/signin");
      console.log("Successfully Logged");
    } catch {
      setError("Failed to log out");
    }
    console.log(error);
  }

  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand href="/">Collab-a-Note</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <NavDropdown title="DashBoard" id="collasible-nav-dropdown" href="">
            <NavDropdown.Item href="dashboard/course/1">
              Course 1
            </NavDropdown.Item>
            <NavDropdown.Item href="dashboard/course/2">
              Course 2
            </NavDropdown.Item>
            <NavDropdown.Item href="dashboard/course/3">
              Course 3
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/dashboard">View all</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => handleSignout()}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
