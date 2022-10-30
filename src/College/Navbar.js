import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from "./logo.jpg"
function CollapsibleExample() {

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("admin") == "true") {
            setAdmin(true);
        }
    }, [])

    const location = useLocation();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                <Navbar.Brand href="#/form">
                   
                        <img style={{border:"0px solid transparent",borderRadius:"50%"}} height={"50px"} width={"50px"} src={logo} alt='logo' />
                    
                </Navbar.Brand>
                <Navbar.Brand href="#/form">
                   
                        VE CELL
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive -navbar-nav">
                    <Nav activeKey={'#' + location.pathname} className="me-auto">
                        <Nav.Link href="#/viewall">View FDP</Nav.Link>
                        <Nav.Link href="#/form">Add FDP</Nav.Link>
                        {
                            admin ? <>
                                <Nav.Link href="#/viewst">View Students</Nav.Link>
                                <Nav.Link href="#/stform">Add Student</Nav.Link>
                                <Nav.Link href="#/participation">Faculty Participation</Nav.Link>
                                <Nav.Link href="#/viewparticipation">View Faculty Participation</Nav.Link>
                            </> : null
                        }
                    </Nav>
                    <Nav>
                        <NavDropdown title="Settings" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#/logout">Logout</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#/reset">
                                Reset Password
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;