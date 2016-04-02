import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Navbar, Nav, NavItem, NavDropdown, NavBrand, Input, MenuItem} from 'react-bootstrap'
import {LinkContainer, MenuItemLink} from 'react-router-bootstrap'
import AppSearch from '../components/AppSearch'
import {searchPlayersAndMaps} from '../redux/search'


class App extends React.Component {
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
            <AppSearch search={this.props.searchPlayersAndMaps}
                       searchData={this.props.searchData} />
          </div>

          <Nav navbar eventKey={0}>
            <LinkContainer to="/activity">
              <NavItem>Activity</NavItem>
            </LinkContainer>
            <LinkContainer to="/maps">
              <NavItem>Maps</NavItem>
            </LinkContainer>
            <NavDropdown title="Ranks">
              <LinkContainer to="/ranks/overall">
                <MenuItem>
                  Overall
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/ranks/overall">
                <MenuItem>
                  <span className="tf-icon soldier mini" /> Soldier
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/ranks/overall">
                <MenuItem>
                  <span className="tf-icon demoman mini" /> Demoman
                </MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {search} = state
  return {searchData: search}
}


export default connect(
  mapStateToProps,
  {searchPlayersAndMaps}
)(App)
