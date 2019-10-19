import React from 'react'
import {connect} from 'react-redux'

import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import ReactModal from 'react-modal'

import {LinkContainer} from 'react-router-bootstrap'
import AppSearch from './components/AppSearch'
import {withRouter} from 'react-router-dom'
import {Route, Link} from 'react-router-dom'

import Home from './scenes/Home'
import Maps from './scenes/Maps'
import MapOverview from './scenes/MapOverview'
import PlayerOverview from './scenes/PlayerOverview'
import PlayerLeaderboards from './scenes/PlayerLeaderboards'
import DemoOverview from './scenes/DemoOverview'
import RecordOverview from './scenes/RecordOverview'

import SteamAvatar from 'root/components/SteamAvatar'
import {USERNAME, PLAYERNAME, STEAMID, PLAYERID} from '../../utils/loginData'

import './styles.styl'


ReactModal.setAppElement('#app')


class App extends React.Component {
  renderAvatar() {
    const title = (
      <span className="avatar-container">
        <SteamAvatar steamID64={STEAMID} size="small" noLink />
        <span className="playername">
          {PLAYERNAME}
        </span>
      </span>
    )
    return (
      <NavDropdown
        id="navbar-dropdown-logout"
        className="navbar-login-container"
        title={title}
        >
        <LinkContainer to={`/players/${PLAYERID}`} activeClassName={null}>
          <NavItem href="/logout">
            <i className="fa fa-fw fa-user" /> My profile
          </NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem href="/logout">
          <i className="fa fa-fw fa-sign-out" /> Sign out
        </MenuItem>
      </NavDropdown>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="content">
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
                ? this.renderAvatar()
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

          <div className="App-container">
            <Route exact path="/" component={Home} />
            <Route path="/activity" component={Home} />
            <Route path="/servers" component={Home} />
            <Route exact path="/maps" component={Maps} />
            <Route path="/maps/:name" component={MapOverview} />
            <Route path="/players/:id" component={PlayerOverview} />
            <Route path="/ranks/:type" component={PlayerLeaderboards} />
            <Route path="/demos/:id" component={DemoOverview} />
            <Route path="/records/:id" component={RecordOverview} />
          </div>
        </div>

        <footer className="App-footer">
          <ul className="links">
            <li>
              <a href="http://steampowered.com/">
                <i className="fab fa-steam-symbol" /> Powered by Steam
              </a>
            </li>
            <li>
              <a href="https://tempus-apidocs.readthedocs.io/en/latest/">
                API
              </a>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}


export default withRouter(App)
