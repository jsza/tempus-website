import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Navbar, Nav, NavItem, NavDropdown, NavbarBrand, MenuItem, MenuItemLink} from 'react-bootstrap'
import {LinkContainer as LC} from 'react-router-bootstrap'
import {AppContainer} from 'react-hot-loader'
// workaround for issue:
// https://github.com/react-bootstrap/react-router-bootstrap/issues/169
const LinkContainer = LC
import AppSearch from './components/AppSearch'
import {searchPlayersAndMaps} from './services/appsearch/actions'
import {withRouter} from 'react-router'

import SteamAvatarContainer from '../../containers/SteamAvatarContainer'
import {USERNAME, PLAYERNAME, STEAMID, PERMISSIONS} from '../../utils/loginData'


class App extends React.Component {
  renderAvatar() {
    const title = (
      <span className="avatar-container">
        <SteamAvatarContainer steamID64={STEAMID} size="small" noLink />
        <span className="playername">
          {PLAYERNAME}
        </span>
      </span>
    )
    return (
      <NavDropdown className="navbar-login-container" title={title}>
        <MenuItem href="/logout">
          Sign out
        </MenuItem>
      </NavDropdown>
    )
  }

  render() {
    return (
      <AppContainer>
        <div>
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
                  <NavItem>
                    <i className="fa fa-globe" /> Maps
                  </NavItem>
                </LinkContainer>
                <NavDropdown title={<span><i className="fa fa-trophy" /> Ranks</span>}>
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
                {PERMISSIONS.includes('extramaps')
                ? <NavDropdown title={<i className="fa fa-coffee" />}>
                    <LinkContainer to="/extramaps">
                      <MenuItem>
                        <i className="fa fa-globe" /> jump.tf Maps
                      </MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                : null}
              </Nav>

              <Nav pullRight>
                <li>
                  <AppSearch search={this.props.searchPlayersAndMaps}
                             searchData={this.props.searchData} />
                </li>
                { USERNAME !== 'anonymous'
                ? this.renderAvatar()
                : <a className="navbar-login-container" href="/openid/login">
                    <img className="login-button"
                         src="https://static.tempus.xyz/website/img/sits_small.png" />
                  </a>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {this.props.children}
        </div>
      </AppContainer>
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
