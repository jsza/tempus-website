import React, {useEffect} from 'react'
import P from 'prop-types'
import {connect} from 'react-redux'
import {loadRanks} from './actions'

import {useParams} from 'react-router'

import PlayerLeaderboardTitle from './components/PlayerLeaderboardTitle'

import {Link, NavLink} from 'react-router-dom'
import Table from 'react-bootstrap/lib/Table'
import SteamAvatar from 'root/components/SteamAvatar'
import Throbber from 'root/components/Throbber'

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Button from 'react-bootstrap/lib/Button'

import './styles.styl'


function PlayerLeaderboards ({ fetching, error, data, loadRanks }) {
  const {type} = useParams()

  useEffect(() => {
    loadRanks(type)
  }, [type])

  return (
    <div className="PlayerLeaderboards container">
      <PlayerLeaderboardTitle rankType={type} />
      <span className="pull-right">
        <ButtonGroup>
          <NavLink activeClassname="active" to="/ranks/overall" className="btn btn-default">
            <i className="fa fa-users" style={{fontSize: '24px', 'verticalAlign': 'middle'}} /> Overall
          </NavLink>
          <NavLink activeClassname="active" to="/ranks/soldier" className="btn btn-default">
            <span className="tf-icon soldier mini" /> Soldier
          </NavLink>
          <NavLink activeClassname="active" to="/ranks/demoman" className="btn btn-default">
            <span className="tf-icon demoman mini" /> Demoman
          </NavLink>
        </ButtonGroup>
      </span>
      {!data ? <Throbber /> :
        <div>
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
                {data.get('players').map((p, idx) =>
                  <tr key={p.get('id')}>
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
            {data.get('count')} total ranked players.
          </p>
        </div>}
    </div>
  )

  return <div>hi</div>
}



class _PlayerLeaderboards extends React.Component {
  componentDidMount() {
    this.loadRanks()
  }

  loadRanks() {
    // const {start} = this.props.location.query
    this.props.loadRanks(this.props.match.params.type, null)
  }

  componentDidUpdate(prevProps) {
    const oldRankType = prevProps.match.params.type
    const newRankType = this.props.match.params.type
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


// PlayerLeaderboards.propTypes =
//   {
//   }


function mapStateToProps(state) {
  const {fetching, error, data} = state.app.playerLeaderboards
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadRanks}
)(PlayerLeaderboards)
