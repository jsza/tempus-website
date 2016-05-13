import React, {PropTypes as P} from 'react'
import {Col} from 'react-bootstrap'
import {Link} from 'react-router'

// import {CLASSINDEX_TO_NAME} from '../constants/TFClasses'


const playableZoneTypes = ['map', 'course', 'bonus']


function countZones(zoneCount) {
  let count = 0
  playableZoneTypes.forEach((z) => count += zoneCount[z].count || 0)
  console.log(count)
  return count
}


export default class PlayerOverviewStats extends React.Component {
  renderPercentCompletion() {
    const totalZones = countZones(this.props.zoneCount)
    const totalComplete = countZones(this.props.prStats)
    console.log(totalZones, totalComplete)
    return (
      <li>
        <i className="fa fa-fw fa-map-marker fa-lg text-muted" /> {totalComplete / totalZones * 100}
      </li>
    )
  }

  render() {
    console.log(this.props)
    const {leaderboardURL, leaderboardTitle} = this.props
    const ri = this.props.rankInfo
    const pi = this.props.playerInfo
    // const playerClassName = CLASSINDEX_TO_NAME[this.props.playerClass]
    return (
      <Col lg={4}>
        <div className="site-panel">
          <div className="inner">
            <Link to={leaderboardURL}
                  className="player-overview-stats-icon">{this.props.icon}</Link>
            <h4>
              Rank {ri.rank} <Link to={leaderboardURL}>{leaderboardTitle}</Link>
            </h4>
            <ul className="player-overview-stats">
              <li>
                <i className="fa fa-fw fa-trophy fa-lg text-muted" /> {`${Math.floor(ri.points)} Points`}
              </li>
              <li>
                <i className="fa fa-fw fa-map-marker fa-lg text-muted" /> {`Rank ${ri.rank} in`} <a>{pi.country}</a>
              </li>
              {this.renderPercentCompletion()}
            </ul>
          </div>
        </div>
      </Col>
    )
  }
}


PlayerOverviewStats.propTypes =
  { playerInfo: P.object.isRequired
  , rankInfo: P.object.isRequired
  , leaderboardURL: P.string.isRequired
  , leaderboardTitle: P.string.isRequired
  , icon: P.element.isRequired
  , prStats: P.object.isRequired
  , wrStats: P.object.isRequired
  , topStats: P.object.isRequired
  , zoneCount: P.object.isRequired
  }
