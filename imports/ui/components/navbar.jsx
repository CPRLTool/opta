import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const NavBar = ({ loggingIn, currUser }) => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="http://cprltool.github.io">OPTA</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    {!loggingIn && !!currUser ? <AuthNav username={currUser.username} /> : <PubNav />}
  </Navbar>
);

export default NavBar;

const AuthNav = ({ username }) => (
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="/">Home</NavItem>
      <NavDropdown eventKey={2} title="Create..." id="create-dropdown">
        <MenuItem eventKey={2.1} href="/organization/create">New Organization</MenuItem>
        <MenuItem eventKey={2.2} href="/portfolio/create">New Portfolio</MenuItem>
        <MenuItem eventKey={2.2} href="#">New Initiative</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={username} id="account-dropdown">
        <MenuItem eventKey={3.1} href={`/user/${username}`}>My Profile</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.2} href="/logout">Log Out</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
);

const PubNav = () => (
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="/">Home</NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={2} href="/sign-in">Sign In</NavItem>
      <NavItem eventKey={3} href="/sign-up">Sign Up</NavItem>
    </Nav>
  </Navbar.Collapse>
);
