import React from 'react'

import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import Nav from 'react-bootstrap/lib/Nav'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'

import AppSearch from '../AppSearch'

import {USERNAME} from 'root/utils/loginData'

import Avatar from './components/Avatar'


const AppNavbar = () =>
  <Navbar id="navbar-main" inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
          Tempus Network
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav navbar className="main-nav-items">
        <LinkContainer to="/maps">
          <NavItem eventKey={1}>
            <i className="fa fa-globe" /> Maps
          </NavItem>
        </LinkContainer>
        <NavDropdown eventKey={2}
          id="navbar-dropdown-ranks"
          title={<span><i className="fa fa-trophy" /> Ranks</span>}
          >
          <LinkContainer to="/ranks/overall">
            <MenuItem  eventKey={2.1}>
              <i className="fa fa-users rank-user-icon" /> Overall
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/ranks/soldier">
            <MenuItem eventKey={2.2}>
              <span className="tf-icon soldier mini" /> Soldier
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/ranks/demoman">
            <MenuItem eventKey={2.3}>
              <span className="tf-icon demoman mini" /> Demoman
            </MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>

      <Nav pullRight>
        { USERNAME !== 'anonymous'
        ? <Avatar />
        : <NavItem href="/openid/login">
            <i className="fa fa-steam" /> Sign in through Steam
          </NavItem>
        }
      </Nav>

      <Navbar.Form className="app-search-form" pullRight>
        <AppSearch />
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>


export default AppNavbar
