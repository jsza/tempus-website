import React from 'react'
import SteamAvatarContainer from './SteamAvatarContainer'
import {connect} from 'react-redux'
import {loadPlayer} from '../redux/playerOverview'
import Throbber from '../components/Throbber'
import PlayerOverviewClassStats from '../components/PlayerOverviewClassStats'
import PlayerOverviewStats from '../components/PlayerOverviewStats'
import {CLASSINDEX_TO_NAME} from '../constants/TFClasses'
import TimeAgo from 'react-timeago'
import {JUMP_CLASSES} from '../constants/TFClasses'
import DocumentTitle from 'react-document-title'

import {Row, Col} from 'react-bootstrap'



function getFormattedDate(date) {
  var year = date.getFullYear()
  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month
  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day
  return month + '/' + day + '/' + year
}


export default class PlayerOverviewApp extends React.Component {
  componentDidMount() {
    this.props.loadPlayer()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.loadPlayer()
    }
  }

  renderClassRankStats(playerClass) {
    const cri = this.props.data.class_rank_info[playerClass]
    return (
      <ul className="player-overview-class-stats">
        <li>
          <i className="fa fa-fw fa-star fa-lg" /> {`${Math.floor(cri.points)} Points`}
        </li>
        <li>
          <i className="fa fa-fw fa-globe fa-lg" /> {`Rank ${cri.rank} (5th in United States)`}
        </li>
      </ul>
    )
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return <div className="container"><Throbber /></div>
    }
    const data = this.props.data
    const pi = data.player_info
    const ri = data.rank_info
    const firstSeenDate = new Date(pi.first_seen * 1000)
    console.log(data)
    return (
      <DocumentTitle title={`Tempus - ${pi.name}`}>
        <div className="container">
          <div>
            <div className="player-overview-header clearfix">
              <div className="player-overview-avatar">
                <SteamAvatarContainer steamID={pi.steamid} size="mediumlarge" />
              </div>
              <span className="pull-right text-muted" style={{textAlign: 'right', padding: '5px', fontSize: '12px'}}>
                Online <TimeAgo date={pi.last_seen * 1000} />
                <br />
                Joined {getFormattedDate(firstSeenDate)}
              </span>
              <div className="player-overview-header-content">
                <h1 title={pi.steamid}>{pi.name}</h1>
              </div>
            </div>
          </div>
          <div className="player-overview-content">
            <Row>
              <PlayerOverviewStats leaderboardURL="/ranks/overall"
                                   leaderboardTitle={'Overall'}
                                   icon={<i className="fa fa-globe" style={{fontSize: '48px'}} />}
                                   rankInfo={data.rank_info}
                                   playerInfo={data.player_info}
                                   prStats={data.pr_stats}
                                   wrStats={data.wr_stats}
                                   topStats={data.top_stats}
                                   zoneCount={data.zone_count} />
              {JUMP_CLASSES.map(pc => {
                const playerClassName = CLASSINDEX_TO_NAME[pc]
                const icon = <span className={'tf-icon large ' + playerClassName.toLowerCase()} />
                return (
                  <PlayerOverviewStats leaderboardURL="/ranks/overall"
                                       leaderboardTitle={playerClassName}
                                       icon={icon}
                                       rankInfo={data.class_rank_info[pc]}
                                       playerInfo={data.player_info}
                                       prStats={data.pr_stats}
                                       wrStats={data.wr_stats}
                                       topStats={data.top_stats}
                                       zoneCount={data.zone_count} />
                )
              })}
            </Row>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}


function mapStateToProps(state) {
  const {playerOverview} = state
  const {fetching, error, data} = playerOverview
  return {fetching, error, data: data ? data.toJS() : data}
}


export default connect(
  mapStateToProps,
  {loadPlayer}
)(PlayerOverviewApp)
