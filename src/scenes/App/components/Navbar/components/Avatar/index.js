import React from 'react'

import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import {LinkContainer} from 'react-router-bootstrap'

import SteamAvatar from 'root/components/SteamAvatar'
import {PLAYERNAME, STEAMID, PLAYERID} from 'root/utils/loginData'


export default function Avatar() {
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
