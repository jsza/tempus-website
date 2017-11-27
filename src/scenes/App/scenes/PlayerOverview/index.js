import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {loadPlayer} from './services/playerOverview/actions'
import {CLASSINDEX_TO_NAME, JUMP_CLASSES} from 'root/constants/TFClasses'
import {Link, NavLink, Redirect} from 'react-router-dom'

import TimeAgo from 'react-timeago'
import DocumentTitle from 'react-document-title'
import SteamAvatar from 'root/components/SteamAvatar'
import Throbber from 'root/components/Throbber'
import Stats from './components/Stats'
import PropsRoute from 'root/components/PropsRoute'

import './styles.styl'


function getFormattedDate(date) {
  var year = date.getFullYear()
  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month
  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day
  return month + '/' + day + '/' + year
}


function capitalize(s)
{
  return s && s[0].toUpperCase() + s.slice(1)
}


export class PlayerOverview extends React.Component {
  componentWillMount() {
    this.props.loadPlayer(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.loadPlayer(nextProps.match.params.id)
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

  getBestClass() {
    const {data} = this.props
    const cri = data.class_rank_info
    const soldier = cri[3]
    const demoman = cri[4]
    if (soldier.points > 0 && soldier.rank < demoman.rank) {
      return 'soldier'
    }
    else if (demoman.points > 0) {
      return 'demoman'
    }
    else {
      return null
    }
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
    return title
    return (
      <h4>
        <span>
          {data.rank_info.points > 0
            ? <span>
                <span className={'tf-icon mini ' + tfClass} /> Rank #{rank}
              </span>
            : 'Unranked'
          }
        </span>
      </h4>
    )
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return <div className="PlayerOverview container"><Throbber /></div>
    }
    const {data, match} = this.props
    const pi = data.player_info
    const firstSeenDate = new Date(pi.first_seen * 1000)
    const redirectURL = `${match.url}/${this.getBestClass() || 'overall'}`

    return (
      <DocumentTitle title={`Tempus - ${pi.name}`}>
        <div className="PlayerOverview container">
          {this.props.location.pathname === match.url
            ? <Redirect to={redirectURL} />
            : null
          }
          <div className="player-overview-header clearfix">
            <div className="player-overview-avatar">
              <SteamAvatar steamID={pi.steamid} size="mediumlarge" />
            </div>
            <span className="last-seen">
              Online <TimeAgo date={pi.last_seen * 1000} />
              <br />
              Joined {getFormattedDate(firstSeenDate)}
            </span>
            <div className="player-overview-header-content">
              <h2 className="page-title" title={pi.steamid}>
                <strong>
                  [{this.renderChatRank()}]
                </strong> {pi.name}
              </h2>
            </div>
            {}
          </div>
          <div className="player-overview-class-selection">
            <NavLink to={`${this.props.match.url}/soldier`}>
              <span className="tf-icon medium soldier" /> <span className="title">Soldier</span>
            </NavLink>
            <NavLink to={`${this.props.match.url}/demoman`}>
              <span className="tf-icon medium demoman" /> <span className="title">Demoman</span>
            </NavLink>
            <NavLink to={`${this.props.match.url}/overall`}>
              <i className="fa fa-users" /> <span className="title">Overall</span>
            </NavLink>
          </div>
          <div className="player-overview-body">
            {JUMP_CLASSES.map((pc, idx) => {
              const cn = CLASSINDEX_TO_NAME[pc]
              return (
                <PropsRoute key={idx}
                            path={`${this.props.match.url}/${cn.toLowerCase()}`}
                            component={Stats}
                            statsType={cn}
                            rankInfo={data.class_rank_info[pc]}
                            countryRankInfo={data.country_class_rank_info[pc]}
                            playerInfo={data.player_info}
                            prStats={data.pr_stats}
                            wrStats={data.wr_stats}
                            topStats={data.top_stats}
                            zoneCount={data.zone_count} />
              )
            })}
            <PropsRoute path={`${this.props.match.url}/overall`}
                        component={Stats}
                        statsType="Overall"
                        rankInfo={data.rank_info}
                        countryRankInfo={data.country_rank_info}
                        playerInfo={data.player_info}
                        prStats={data.pr_stats}
                        wrStats={data.wr_stats}
                        topStats={data.top_stats}
                        zoneCount={data.zone_count} />
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
              // <Row>
              //   {JUMP_CLASSES.map(pc => {
              //     const playerClassName = CLASSINDEX_TO_NAME[pc]
              //     const icon = <span className={'tf-icon large ' + playerClassName.toLowerCase()} />
              //     return (
              //       <PlayerOverviewStats leaderboardURL={`/ranks/${playerClassName.toLowerCase()}`}
              //                            leaderboardTitle={playerClassName}
              //                            icon={icon}
              //                            rankInfo={data.class_rank_info[pc]}
              //                            countryRankInfo={data.country_class_rank_info[pc]}
              //                            playerInfo={data.player_info}
              //                            prStats={data.pr_stats}
              //                            wrStats={data.wr_stats}
              //                            topStats={data.top_stats}
              //                            zoneCount={data.zone_count} />
              //     )
              //   })}
              //   <PlayerOverviewStats leaderboardURL="/ranks/overall"
              //                        leaderboardTitle={'Overall'}
              //                        icon={<i className="fa fa-users" />}
              //                        rankInfo={data.rank_info}
              //                        countryRankInfo={data.country_rank_info}
              //                        playerInfo={data.player_info}
              //                        prStats={data.pr_stats}
              //                        wrStats={data.wr_stats}
              //                        topStats={data.top_stats}
              //                        zoneCount={data.zone_count} />
              // </Row>


function mapStateToProps(state) {
  const {playerOverview} = state
  const {fetching, error, data} = playerOverview
  return {fetching, error, data: data ? data.toJS() : data}
}


export default connect(
  mapStateToProps,
  {loadPlayer}
)(PlayerOverview)
