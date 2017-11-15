import React from 'react'

import {prettyZoneName} from 'root/utils/TempusUtils'

import './styles.styl'


const zoneIcons =
  { 'map': 'globe'
  , 'course': 'flag'
  , 'bonus': 'star'
  }


export default class RunSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { showDropdown: false
      }
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

  render() {
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
      if (count > 0 && itemIdx !== zoneTypes.length - 2) {
        zoneItems.push(<hr />)
      }
    })
    return (
      <div className="MapOverview-RunSelection">
        <div className="MapOverview-RunSelection-inner">
          <h2 onClick={(event) => this.onClickDropdown(event)} style={{cursor: 'pointer'}}>
            <i className={'fa fa-fw fa-' + zoneIcons[zoneType]} /> {zoneName} <i className="fa fa-caret-down" />
          </h2>
          <ul className="MapOverview-RunSelection-dropdown" hidden={!this.state.showDropdown}>
            {zoneItems}
          </ul>
        </div>
      </div>
    )
  }
}
