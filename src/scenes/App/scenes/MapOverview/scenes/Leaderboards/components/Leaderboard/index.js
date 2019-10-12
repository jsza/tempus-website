import React from 'react'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import Col from 'react-bootstrap/lib/Col'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'

import {connect} from 'react-redux'
import {push} from 'connected-react-router'
import {withRouter} from 'react-router'
import {Route} from 'react-router-dom'

import LeaderboardTable from './components/LeaderboardTable'
import LeaderboardAdminDropdown from './components/LeaderboardAdminDropdown'
import AddRunModal from './components/AddRunModal'

import PersonalRecord from './components/PersonalRecord'
import {Scrollbars} from 'react-custom-scrollbars'
import {prettyZoneName, formatTime} from 'root/utils/TempusUtils'
import Difficulties from 'root/constants/Difficulties'
import TFIcon from 'root/components/TFIcon'

import {PERMISSIONS} from 'root/utils/loginData'


import './styles.styl'


function Leaderboard({ data, fetching, playerClass, tier, zoneInfo, mapInfo, fetchMore, toggleExpand, expandedRun, push, match }) {
  const tfClass = CLASSINDEX_TO_NAME[playerClass]
  const tfClassLower = tfClass.toLowerCase()
  const zoneName = prettyZoneName(zoneInfo.get('type'), zoneInfo.get('zoneindex'))
  const customZoneName = zoneInfo.get('custom_name')
  return (
    <div>
      <Route path={`${match.url}/addrun/${CLASSINDEX_TO_NAME[playerClass].toLowerCase()}`}>
        <AddRunModal
          zoneInfo={zoneInfo}
          mapInfo={mapInfo}
          playerClass={playerClass}
          onClose={() => push(match.url)}
        />
      </Route>
      {/* TODO: Finish this up for small viewports
        <div className="classtabs">
          <span className="classtab">
            <i className={'tf-icon medium soldier'} style={{height: '24px', width: '24px'}} /> Soldier
          </span>
          <span className="classtab">
            <i className={'tf-icon medium demoman'} style={{height: '24px', width: '24px'}} /> Demoman
          </span>
        </div>
      */}
      <div className="MapOverview-LeaderboardContainer-Leaderboard panel panel-dark">
        {fetching ? <div className="loading-overlay" /> : null}
        <div className="panel-heading">
          {PERMISSIONS.includes('superuser') ?
            <div className="pull-right">
              <LeaderboardAdminDropdown zoneInfo={zoneInfo} playerClass={playerClass} />
            </div>
            : null
          }
          <i className={'tf-icon medium pull-left ' + tfClassLower} style={{marginRight: '8px', height: '40px', width: '40px'}} />
          <strong> {zoneName}</strong> {customZoneName ? <small>({customZoneName})</small> : ''}
          <div><span>{Difficulties[tier]} (Tier {tier})</span></div>
        </div>
        <div className="panel-body">
          <PersonalRecord />
          <LeaderboardTable
            data={data}
            playerClass={playerClass}
            fetchMore={() => fetchMore(playerClass)}
            toggleExpand={toggleExpand}
            expandedRun={expandedRun}
          />
        </div>
      </div>
    </div>
  )
}


export default withRouter(connect(null, { push })(Leaderboard))
