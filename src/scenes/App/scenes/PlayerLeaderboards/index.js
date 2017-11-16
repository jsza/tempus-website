import React from 'react'
import P from 'prop-types'
import {connect} from 'react-redux'
import {loadRanks} from './services/playerLeaderboards/actions'

import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'
import SteamAvatar from 'root/components/SteamAvatar'
import Throbber from 'root/components/Throbber'


import './styles.styl'


class PlayerLeaderboards extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.loadRanks()
  }

  loadRanks() {
    // const {start} = this.props.location.query
    this.props.loadRanks(this.props.rankType, null)
  }

  componentDidUpdate(prevProps) {
    const oldRankType = prevProps.rankType
    const newRankType = this.props.rankType
    // const {start} = this.props.location.query
    // const oldStart = prevProps.location.query.start

    if (oldRankType !== newRankType) {
      this.loadRanks()
    }
  }

  renderTitle() {
    const {rankType} = this.props
    let icon
    if (rankType === 'overall') {
      icon = (
        <i className="fa fa-users player-ranks-icon" />
      )
    }
    else if (rankType === 'soldier') {
      icon = <span className="tf-icon soldier large" />
    }
    else if (rankType === 'demoman') {
      icon = <span className="tf-icon demoman large" />
    }
    return (
      <h1 className="page-title">
        {icon} Top Players &mdash; <span className="capitalize">{rankType}</span>
      </h1>
    )
  }

  render() {
    let content
    if (!this.props.data) {
      content = <Throbber />
    }
    else {
      content = (
        <div>
          {this.renderTitle()}
          <div className="player-ranks-table-container">
            <Table striped hover className="player-ranks-table">
              <thead>
                <tr>
                  <th />
                  <th>Player</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.get('players').map((p, idx) =>
                  <tr key={idx}>
                    <td width="50">
                      <strong className="pull-right">
                        #{p.get('rank')}
                      </strong>
                    </td>
                    <td>
                      <SteamAvatar steamID={p.get('steamid')} size="tiny" />
                      <span> </span>
                      <Link to={`/players/${p.get('id')}`}>
                        {p.get('name')}
                      </Link>
                    </td>
                    <td>
                      {Math.round(p.get('points'))}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <p className="text-muted">
            {this.props.data.get('count')} total ranked players.
          </p>
        </div>
      )
    }
    return (
      <div className="PlayerLeaderboards container">
        {content}
      </div>
    )
  }
}


PlayerLeaderboards.propTypes =
  { rankType: P.string.isRequired
  }


function mapStateToProps(state) {
  const {fetching, error, data} = state.playerLeaderboards
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadRanks}
)(PlayerLeaderboards)
