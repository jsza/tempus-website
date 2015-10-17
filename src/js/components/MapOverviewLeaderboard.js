import React from 'react'
import {Row, Col} from 'react-bootstrap'
import SteamAvatarContainer from '../containers/SteamAvatarContainer'


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
    return leaderboard.data.getIn(['results', playerClass]).map((r, idx) => {
      const pi = r.get('player_info')
      return (
        <li>
          <span className="leaderboard-avatar">
            <SteamAvatarContainer steamID={pi.get('steamid')} size="small" />
          </span>
          <span className="leaderboard-rank">
            #{idx+1}
          </span>
          <strong>{pi.get('name')}</strong>
          <br/>
          <i className="fa fa-clock-o" /> {formatTime(r.get('duration') * 1000)}
        </li>
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
          <ul className="map-leaderboard-list">
            {this.renderRecords('soldier')}
          </ul>
        </Col>
        <Col className="leaderboards-demoman" lg={6}>
          <h4 className="map-leaderboard-header">
            <span style={{verticalAlign: 'middle'}} className="tf-icon demoman sm" /> Demoman <small>Insane (T6)</small>
          </h4>
          <ul className="map-leaderboard-list">
            {this.renderRecords('demoman')}
          </ul>
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
  return s.substr(s.length - size)
}


function formatTime(time) {
  let h, m, s, ms
  var newTime = ''

  h = Math.floor( time / (60 * 60 * 1000) )
  time = time % (60 * 60 * 1000)
  m = Math.floor( time / (60 * 1000) )
  time = time % (60 * 1000)
  s = Math.floor( time / 1000 )
  ms = time % 1000

  newTime = pad(m, 2) + ':' + pad(s, 2) + '.' + pad(ms, 2)
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
