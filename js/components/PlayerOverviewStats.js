import React from 'react'
import P from 'prop-types'
import {Col} from 'react-bootstrap'
import {Link} from 'react-router'


const playableZoneTypes = ['map', 'course', 'bonus']


function countZones(zoneCount) {
  let count = 0
  playableZoneTypes.forEach((z) => count += zoneCount[z].count || 0)
  return count
}


export default class PlayerOverviewStats extends React.Component {
  renderPercentCompletion() {
    const totalZones = countZones(this.props.zoneCount)
    const totalComplete = countZones(this.props.prStats)
    return (
      <li>
        <i className="fa fa-fw fa-globe fa-lg text-muted" /> {Math.round(totalComplete / totalZones * 100)}% Completion
      </li>
    )
  }

  render() {
    const {leaderboardURL, leaderboardTitle} = this.props
    const ri = this.props.rankInfo
    const cri = this.props.countryRankInfo
    const pi = this.props.playerInfo
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
              {this.renderPercentCompletion()}
              <li>
                <span className="player-overview-stats-flag">
                  <img className={`flag flag-${pi.country_code.toLowerCase()}`} />
                </span>
                <span> </span>
                {`Rank ${cri.rank} in`}  <a>{pi.country}</a>
              </li>
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
  , countryRankInfo: P.object.isRequired
  , leaderboardURL: P.string.isRequired
  , leaderboardTitle: P.string.isRequired
  , icon: P.element.isRequired
  , prStats: P.object.isRequired
  , wrStats: P.object.isRequired
  , topStats: P.object.isRequired
  , zoneCount: P.object.isRequired
  }
