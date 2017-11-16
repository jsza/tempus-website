import React from 'react'
import P from 'prop-types'

import './styles.styl'


export default class Stats extends React.Component {
  render() {
    const ri = this.props.rankInfo
    const cri = this.props.countryRankInfo
    const pi = this.props.playerInfo
    return (
      <div className="App-PlayerOverview-Stats">
        <h4>{ri.points > 0 ? `Rank ${ri.rank}` : 'Unranked'} {this.props.statsType}</h4>
        <div>
          <i className="fa fa-fw fa-trophy" /> {ri.points} Points
        </div>
        <div>
          <span className="player-overview-stats-flag">
            <img className={`flag flag-${pi.country_code ? pi.country_code.toLowerCase() : null}`} />
          </span>
          <span> </span>
          {`Rank ${cri.rank} in`}  <a>{pi.country}</a>
        </div>
      </div>
    )
  }
}


Stats.propTypes =
  { playerInfo: P.object.isRequired
  , rankInfo: P.object.isRequired
  , countryRankInfo: P.object.isRequired
  , icon: P.element.isRequired
  , prStats: P.object.isRequired
  , wrStats: P.object.isRequired
  , topStats: P.object.isRequired
  , zoneCount: P.object.isRequired
  }
