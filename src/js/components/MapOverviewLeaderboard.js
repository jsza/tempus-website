import React from 'react'
import {Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import SteamAvatarContainer from '../containers/SteamAvatarContainer'
import {Link} from 'react-router'


const zoneIcons =
  { 'map': 'globe'
  , 'course': 'road'
  , 'bonus': 'star'
  }


export default class MapOverviewLeaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { showDropdown: false
      }
  }

  renderRecords(playerClass) {
    const {leaderboard} = this.props
    const results = leaderboard.data.getIn(['results', playerClass])
    if (results.size === 0) {
      return <span style={{padding: '4px'}}>No records found.</span>
    }
    return leaderboard.data.getIn(['results', playerClass]).map((r, idx) => {
      const pi = r.get('player_info')
      return (
        <tr>
          <td className="lb-rank">
            <strong>
              {idx+1 === 1
               ? 'WR'
               : idx+1
              }
            </strong>
          </td>
          <td>
            <span>
              <SteamAvatarContainer steamID={pi.get('steamid')} size="small" /> <Link to={`/players/${pi.get('id')}`}>{pi.get('name')}</Link>
            </span>
          </td>
          <td>
            <span style={{fontSize: '125%'}}>
              {formatTime(r.get('duration'))}
            </span>
          </td>
          <OverlayTrigger placement="bottom" overlay={<Tooltip><TimeAgo date={r.get('date') * 1000} /></Tooltip>}>
            <td style={{textAlign: 'center'}}>
              <i className="fa fa-fw fa-info-circle" />
            </td>
          </OverlayTrigger>
        </tr>
      )
    })
  }

  renderLeaderboards() {
    const {leaderboard} = this.props
    if (leaderboard.fetching || !leaderboard.data) {
      return <i className="fa fa-spin fa-refresh fa-4x" style={{textAlign: 'center', display: 'block'}} />
    }
    else if (leaderboard.error) {
      return (
        <h4 className="text-danger">{leaderboard.error}</h4>
      )
    }
    return (
      <Row>
        <Col className="leaderboards-soldier" lg={6}>
          <h4 className="map-leaderboard-header">
            <span style={{verticalAlign: 'middle'}} className="tf-icon soldier sm" /> Soldier <small>Very Easy (T1)</small>
          </h4>
          <div className="lb-container">
            <table className="map-leaderboard-list" style={{width: '100%'}}>
              <tbody>
                {this.renderRecords('soldier')}
              </tbody>
            </table>
          </div>
        </Col>
        <Col className="leaderboards-demoman" lg={6}>
          <h4 className="map-leaderboard-header">
            <span style={{verticalAlign: 'middle'}} className="tf-icon demoman sm" /> Demoman <small>Insane (T6)</small>
          </h4>
          <div className="lb-container">
            <table className="map-leaderboard-list" style={{width: '100%'}}>
              <tbody>
                {this.renderRecords('demoman')}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    )
  }

  onClickDropdown(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({showDropdown: !this.state.showDropdown})
  }

  onSelectLeaderboard(event, zoneType, idx) {
    event.preventDefault()
    event.stopPropagation()
    this.props.fetchLeaderboard(zoneType, idx)
    this.setState({showDropdown: false})
  }

  renderTitle() {
    const {zoneType, index} = this.props.leaderboard
    const zoneName = prettyZoneName(zoneType, index)

    let zoneCounts = this.props.data.get('zone_counts')
    let zoneItems = []
    const zoneTypes = ['map', 'course', 'bonus']
    zoneTypes.forEach((zoneType, itemIdx) => {
      const count = zoneCounts.get(zoneType, 0)
      let idx = 1
      while (idx <= count) {
        const idxCopy = idx
        zoneItems.push(
          <li onClick={(event) => this.onSelectLeaderboard(event, zoneType, idxCopy)}>
            <i className={'fa fa-fw fa-' + zoneIcons[zoneType]} /> {prettyZoneName(zoneType, idx)}
          </li>
        )
        idx++
      }
      if (count > 0 && itemIdx !== zoneTypes.length - 1) {
        zoneItems.push(<hr />)
      }
    })
    return (
      <div style={{textAlign: 'center', display: 'block'}}>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <h2 onClick={(event) => this.onClickDropdown(event)} style={{cursor: 'pointer'}}>
            <i className={'fa fa-fw fa-' + zoneIcons[zoneType]} /> {zoneName} <i className="fa fa-chevron-down" />
          </h2>
          <ul className="leaderboard-zone-dropdown" hidden={!this.state.showDropdown}>
            {zoneItems}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="map-content-container">
        {this.renderTitle()}
        {this.renderLeaderboards()}
      </div>
    )
  }
}


function pad(num, size) {
  var s = '0000' + num
  return s.substring(s.length - size)
}


function formatTime(time) {
  let h, m, s, ms = 0
  var newTime = ''

  h = Math.floor( time / (60 * 60) )
  time = time % (60 * 60)
  m = Math.floor( time / (60) )
  time = time % (60)
  s = Math.floor( time )
  ms = time % 1

  newTime = pad(m, 2) + ':' + pad(s, 2) + '.' + (ms.toString() + '00').substring(2, 4)
  if (h !== 0) {
    newTime = pad(h, 2) + ':' + newTime
  }
  return newTime
}


function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1)
}


function prettyZoneName(zoneType, index) {
  if (zoneType === 'map') {
    return 'Map Run'
  }
  else {
    return capitalize(zoneType) + ' ' + index
  }
}
