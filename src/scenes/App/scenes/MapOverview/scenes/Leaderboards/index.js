import React, {useEffect} from 'react'
import {JUMP_CLASSES, CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import {Switch, Route, Redirect, useParams} from 'react-router'

import {connect} from 'react-redux'

import {
  fetch,
  fetchMore,
  toggleExpand
} from './actions'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Leaderboard from './components/Leaderboard'


import './styles.styl'


function Leaderboards({ data, leaderboards, fetch, fetchMore, toggleExpand }) {
  const {zoneType, zoneIndex} = useParams()

  useEffect(() => {
    fetch(zoneType, zoneIndex)
  }, [zoneType, zoneIndex])

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
  console.log('hmm', leaderboards.data)
  return (
    <div>
      {[3, 4].map((playerClass, idx) =>
        <Col md={5} key={idx}>
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
            expandedRun={leaderboards.getIn(['expandedRun', playerClass])} />
        </Col>
      )}
    </div>
  )
}


function LeaderboardContainer({ data, leaderboards, fetch, fetchMore, toggleExpand, match }){
  function onFetchLeaderboard(zoneType, zoneIndex) {
    fetch(data.getIn(['map_info', 'name']), zoneType, zoneIndex)
  }

  return (
    <div className="MapOverview-LeaderboardContainer">
      <Switch>
        <Route exact path={`${match.path}`}>
          <Redirect to={`${match.path}/map/1`} />
        </Route>
        <Route path={`${match.path}/:zoneType/:zoneIndex`}>
          <Leaderboards
            data={data}
            leaderboards={leaderboards}
            fetch={onFetchLeaderboard}
            fetchMore={fetchMore}
            toggleExpand={toggleExpand}
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
  { fetch, fetchMore, toggleExpand }
)(LeaderboardContainer)
