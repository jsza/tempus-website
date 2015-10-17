import React from 'react'
import {Link} from 'react-router'
import {Navbar, Nav, NavItem, NavBrand, Input} from 'react-bootstrap'
import {LinkContainer, MenuItemLink} from 'react-router-bootstrap'


        // <nav className="navbar navbar-inverse navbar-static">
          // <div className="container">
            // <div className="navbar-header">
              // <Link to="/" className="navbar-brand">
                // <i className="fa fa-rocket" /> Tempus Jump <small>beta</small>
              // </Link>
            // </div>
            // <div className="navbar-collapse collapse">>
              // <ul className="nav navbar-nav">
                // <li>
                  // <Link to="/maps">
                    // Maps
                  // </Link>
                // </li>
              // </ul>
            // </div>
          // </div>
        // </nav>

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar id="navbar-main" toggleNavKey={0} inverse fixedTop>
          <NavBrand>
            <Link to="/" className="navbar-brand">
              Tempus Jump
            </Link>
          </NavBrand>
          <Nav navbar eventKey={0}>
            <LinkContainer to="/maps">
              <NavItem>Maps</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
