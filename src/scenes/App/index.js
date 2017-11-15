import React from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import AppSearch from './components/AppSearch'
import {searchPlayersAndMaps} from './services/appsearch/actions'
import {withRouter} from 'react-router-dom'
import {Route, Link} from 'react-router-dom'

import Home from './scenes/Home'
import Maps from './scenes/Maps'
import MapOverview from './scenes/MapOverview'
import PlayerOverview from './scenes/PlayerOverview'
import PlayerLeaderboards from './scenes/PlayerLeaderboards'

import SteamAvatar from 'root/components/SteamAvatar'
import {USERNAME, PLAYERNAME, STEAMID} from '../../utils/loginData'

import './styles.styl'


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
        <MenuItem href="/logout">
          Sign out
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
                  <MenuItem>
                    <i className="fa fa-globe" /> Maps
                  </MenuItem>
                </LinkContainer>
                <NavDropdown
                  id="navbar-dropdown-ranks"
                  title={<span><i className="fa fa-trophy" /> Ranks</span>}
                  >
                  <LinkContainer to="/ranks/overall">
                    <MenuItem>
                      <i className="fa fa-users rank-user-icon" /> Overall
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/ranks/soldier">
                    <MenuItem>
                      <span className="tf-icon soldier mini" /> Soldier
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/ranks/demoman">
                    <MenuItem>
                      <span className="tf-icon demoman mini" /> Demoman
                    </MenuItem>
                  </LinkContainer>
                </NavDropdown>
              </Nav>

              <Nav pullRight>
                <li>
                  <AppSearch search={this.props.searchPlayersAndMaps}
                             searchData={this.props.searchData} />
                </li>
                { USERNAME !== 'anonymous'
                ? this.renderAvatar()
                : <NavDropdown
                    id="navbar-dropdown-login"
                    title={<span>Sign in</span>}
                    >
                    <li>
                      <a className="navbar-login-container" href="/openid/login">
                        <img className="login-button"
                             src="https://static.tempus.xyz/website/img/sits_small_new.png" />
                      </a>
                    </li>
                  </NavDropdown>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" component={Home} />
          <Route exact path="/maps" component={Maps} />
          <Route exact path="/maps/:name" component={MapOverview} />
          <Route exact path="/players/:id" component={PlayerOverview} />
          <Route exact path="/ranks/overall" component={(props) => <PlayerLeaderboards {...props} rankType="overall"/>} />
          <Route exact path="/ranks/soldier" component={(props) => <PlayerLeaderboards {...props} rankType="soldier"/>} />
          <Route exact path="/ranks/demoman" component={(props) => <PlayerLeaderboards {...props} rankType="demoman"/>} />
          <Route exact path="/activity" component={Home} />
          <Route exact path="/servers" component={Home} />
        </div>

        <footer className="App-footer">
          Copyright &copy; 2017 Tempus Network &bull; <a href="https://steamcommunity.com/">Powered by Steam</a>
        </footer>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {search, router} = state
  return {searchData: search, routerState: router}
}


export default connect(
  mapStateToProps,
  {searchPlayersAndMaps}
)(App)
