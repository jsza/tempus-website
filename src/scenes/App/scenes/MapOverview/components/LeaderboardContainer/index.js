import React, {useEffect} from 'react'
import {JUMP_CLASSES, CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import {Switch, Route, Redirect, useParams} from 'react-router'

import {connect} from 'react-redux'

import {
  fetchLeaderboard,
  fetchMoreLeaderboard
} from '../../services/mapOverview/actions'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Leaderboard from './components/Leaderboard'


import './styles.styl'


function Leaderboards({ data, leaderboard, fetchLeaderboard, fetchMoreLeaderboard }) {
  const {zoneType, zoneIndex} = useParams()

  useEffect(() => {
    fetchLeaderboard(zoneType, zoneIndex)
  }, [zoneType, zoneIndex])

  // console.log(type, index)
  if (leaderboard.error) {
    return (
      <Col md={10}>
        <div className="panel panel-dark">
          <div className="panel-body">
            <span className="text-danger"><i className="fa fa-exclamation-circle" /> {leaderboard.error}</span>
          </div>
        </div>
      </Col>
    )
  }
  else if ((leaderboard.fetching && !leaderboard.data) || !leaderboard.data) {
    return (
      <div className="container">
        <i className="fa fa-spin fa-refresh fa-4x" style={{textAlign: 'center', display: 'block'}} />
      </div>
    )
  }
  return (
    <div>
      {[3, 4].map((playerClass, idx) =>
        <Col md={5} key={idx}>
          <Leaderboard
            fetching={leaderboard.fetching}
            data={leaderboard.data.getIn(
              ['results', CLASSINDEX_TO_NAME[playerClass].toLowerCase()])}
            tier={leaderboard.data.getIn(['tier_info', playerClass.toString()])}
            zoneInfo={leaderboard.data.get('zone_info')}
            playerClass={playerClass}
            mapData={data}
            fetchMoreLeaderboard={fetchMoreLeaderboard} />
        </Col>
      )}
    </div>
  )
}


function LeaderboardContainer({ data, leaderboard, fetchLeaderboard, fetchMoreLeaderboard, match }){
  function onFetchLeaderboard(zoneType, zoneIndex) {
    fetchLeaderboard(data.getIn(['map_info', 'name']), zoneType, zoneIndex)
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
            leaderboard={leaderboard}
            fetchLeaderboard={onFetchLeaderboard}
            fetchMoreLeaderboard={fetchMoreLeaderboard}
          />
        </Route>
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  const {mapOverview} = state
  const {data, leaderboard} = mapOverview.toObject()
  return {data, leaderboard}
}

export default connect(
  mapStateToProps,
  { fetchLeaderboard, fetchMoreLeaderboard }
)(LeaderboardContainer)
