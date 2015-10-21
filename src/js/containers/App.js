import React from 'react'
import {Link} from 'react-router'
import {Navbar, Nav, NavItem, NavBrand, Input} from 'react-bootstrap'
import {LinkContainer, MenuItemLink} from 'react-router-bootstrap'
import AppSearch from '../components/AppSearch'


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

          <div className="pull-right">
            <AppSearch results={this.props.searchResults}
                       onSearch={this.props.onSearch} />
          </div>

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
