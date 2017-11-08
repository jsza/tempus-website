import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {loadPlayer} from '../redux/playerOverview'
import {JUMP_CLASSES} from '../constants/TFClasses'
import {CLASSINDEX_TO_NAME} from '../constants/TFClasses'

import TimeAgo from 'react-timeago'
import DocumentTitle from 'react-document-title'
import {Row, Col, Tabs, Tab, Table} from 'react-bootstrap'
import SteamAvatar from 'root/components/SteamAvatar'
import Throbber from '../components/Throbber'
import PlayerOverviewClassStats from '../components/PlayerOverviewClassStats'
import PlayerOverviewStats from '../components/PlayerOverviewStats'



function getFormattedDate(date) {
  var year = date.getFullYear()
  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month
  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day
  return month + '/' + day + '/' + year
}


export class PlayerOverviewApp extends React.Component {
  componentDidMount() {
    this.props.loadPlayer(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.loadPlayer(nextProps.params.id)
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

  renderChatRank() {
    const {data} = this.props
    const cri = data.class_rank_info
    const soldier = cri[3]
    const demoman = cri[4]
    let title
    let tfClass
    let rank
    if (soldier.rank < demoman.rank) {
      title = soldier.title
      tfClass = 'soldier'
      rank = soldier.rank
    }
    else {
      title = demoman.title
      tfClass = 'demoman'
      rank = demoman.rank
    }
    return (
      <h4 className="page-title">
        <span className={`tf-icon sm ${tfClass}`}/>
        <span> </span>
        <span>
          {title}
        </span>
        <span> </span>
        <span className="text-muted">
          (Rank {rank})
        </span>
      </h4>
    )
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return <div className="container"><Throbber /></div>
    }
    const data = this.props.data
    const pi = data.player_info
    const firstSeenDate = new Date(pi.first_seen * 1000)
    return (
      <DocumentTitle title={`Tempus - ${pi.name}`}>
        <div className="app-container">
          <div className="player-overview-container container">
            <div>
              <div className="player-overview-header clearfix">
                <div className="player-overview-avatar">
                  <SteamAvatar steamID={pi.steamid} size="mediumlarge" />
                </div>
                <span className="pull-right text-muted" style={{textAlign: 'right', padding: '5px', fontSize: '12px'}}>
                  Online <TimeAgo date={pi.last_seen * 1000} />
                  <br />
                  Joined {getFormattedDate(firstSeenDate)}
                </span>
                <div className="player-overview-header-content">
                  <h2 className="page-title" title={pi.steamid}>
                    {pi.name}
                  </h2>
                </div>
                {this.renderChatRank()}
              </div>
            </div>
            <div className="player-overview-body">
              <Row>
                {JUMP_CLASSES.map(pc => {
                  const playerClassName = CLASSINDEX_TO_NAME[pc]
                  const icon = <span className={'tf-icon large ' + playerClassName.toLowerCase()} />
                  return (
                    <PlayerOverviewStats leaderboardURL={`/ranks/${playerClassName.toLowerCase()}`}
                                         leaderboardTitle={playerClassName}
                                         icon={icon}
                                         rankInfo={data.class_rank_info[pc]}
                                         countryRankInfo={data.country_class_rank_info[pc]}
                                         playerInfo={data.player_info}
                                         prStats={data.pr_stats}
                                         wrStats={data.wr_stats}
                                         topStats={data.top_stats}
                                         zoneCount={data.zone_count} />
                  )
                })}
                <PlayerOverviewStats leaderboardURL="/ranks/overall"
                                     leaderboardTitle={'Overall'}
                                     icon={<i className="fa fa-users" />}
                                     rankInfo={data.rank_info}
                                     countryRankInfo={data.country_rank_info}
                                     playerInfo={data.player_info}
                                     prStats={data.pr_stats}
                                     wrStats={data.wr_stats}
                                     topStats={data.top_stats}
                                     zoneCount={data.zone_count} />
              </Row>
            </div>
              <Tabs className="player-overview-tabs">
                <Tab title="Soldier" eventKey="1">
                  <div className="container">
                    <h4 className="site-panel">
                      <i className="fa fa-caret-down pull-right" />
                      World Records <span className="text-muted">(placeholder)</span>
                    </h4>
                    <h4 className="site-panel">
                      <i className="fa fa-caret-down pull-right" />
                      Incomplete Maps <span className="text-muted">(placeholder)</span>
                    </h4>
                  </div>
                </Tab>
                <Tab title="Demoman" eventKey="2">
                </Tab>
              </Tabs>
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
