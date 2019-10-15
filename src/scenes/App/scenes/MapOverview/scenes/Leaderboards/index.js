import React, {useEffect} from 'react'
import {JUMP_CLASSES, CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import {Switch, Route, Redirect, useParams} from 'react-router'

import {connect} from 'react-redux'

import {
  fetchMore,
  toggleExpand,
  collapseAll
} from './actions'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Leaderboard from './components/Leaderboard'


import './styles.styl'


function Leaderboards({ data, leaderboards, fetch, fetchMore, toggleExpand, collapseAll }) {
  const {zoneType, zoneIndex} = useParams()

  if (leaderboards.error) {
    return (
      <Col md={10}>
        <div className="panel panel-dark">
          <div className="panel-body">
            <span className="text-danger"><i className="fa fa-exclamation-circle" /> {leaderboards.error}</span>
          </div>
        </div>
      </Col>
    )
  }
  else if ((leaderboards.fetching && !leaderboards.data) || !leaderboards.data) {
    return (
      <div className="container">
        <i className="fa fa-spin fa-refresh fa-4x" style={{textAlign: 'center', display: 'block'}} />
      </div>
    )
  }
  return (
    <>
      {[3, 4].map((playerClass, idx) =>
        <div className="col" key={idx}>
          <Leaderboard
            fetching={leaderboards.fetching}
            data={leaderboards.data.getIn(
              ['results', CLASSINDEX_TO_NAME[playerClass].toLowerCase()])}
            tier={leaderboards.data.getIn(['tier_info', playerClass.toString()])}
            zoneInfo={leaderboards.data.get('zone_info')}
            mapInfo={data.get('map_info')}
            playerClass={playerClass}
            mapData={data}
            fetchMore={fetchMore}
            toggleExpand={toggleExpand}
            collapseAll={collapseAll}
            expandedRuns={leaderboards.getIn(['expandedRuns', playerClass])} />
        </div>
      )}
    </>
  )
}


function LeaderboardContainer({ data, leaderboards, fetchMore, toggleExpand, collapseAll, match }){
  return (
    <div className="MapOverview-LeaderboardContainer col flex-row" style={{paddingLeft: 0, paddingRight: 0}}>
      <Switch>
        <Route exact path={`${match.path}`}>
          <Redirect to={`${match.path}/map/1`} />
        </Route>
        <Route path={`${match.path}/:zoneType/:zoneIndex`}>
          <Leaderboards
            data={data}
            leaderboards={leaderboards}
            fetchMore={fetchMore}
            toggleExpand={toggleExpand}
            collapseAll={collapseAll}
          />
        </Route>
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  const {data} = state.app.mapOverview.mapOverview
  const {leaderboards} = state.app.mapOverview
  return {data, leaderboards}
}

export default connect(
  mapStateToProps,
  { fetchMore, toggleExpand, collapseAll }
)(LeaderboardContainer)
