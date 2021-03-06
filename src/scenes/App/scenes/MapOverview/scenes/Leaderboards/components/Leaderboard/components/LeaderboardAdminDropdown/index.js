import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import {withRouter} from 'react-router'
import {Route} from 'react-router-dom'

import {DropdownButton, MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import './styles.styl'


function LeaderboardAdminDropdown({ zoneInfo, playerClass, location, match }) {
  const addRunURL = `${match.url}/addrun/${CLASSINDEX_TO_NAME[playerClass].toLowerCase()}`
  return (
    <div className="MapOverview-LeaderboardContainer-Leaderboard-LeaderboardAdminDropdown">
      <DropdownButton
        id="LeaderboardAdminDropdown"
        pullRight
        title={<span className="icon-container"><i className="fas fa-user-secret" /></span>}
        bsStyle="default"
        noCaret className="btn-dark">
        <LinkContainer to={addRunURL}>
          <MenuItem>
            <i className="fas fa-plus fa-large" /> Add run
          </MenuItem>
        </LinkContainer>
      </DropdownButton>
    </div>
  )
}


LeaderboardAdminDropdown.propTypes = {
  zoneInfo: IP.map,
  playerClass: P.number
}


export default withRouter(LeaderboardAdminDropdown)
