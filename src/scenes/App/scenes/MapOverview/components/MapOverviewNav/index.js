import React from 'react'
import Immutable from 'immutable'
import {prettyZoneName} from 'root/utils/TempusUtils'
import './styles.styl'


const zoneTypes = Immutable.List(['map', 'course', 'bonus'])


function MapOverviewNavItem({ zone, onClick }) {
  const type = zone.get('type')
  const index = zone.get('zoneindex')
  const customName = zone.get('custom_name')
  const icon = {map: 'globe', course: 'flag', bonus: 'star'}[type]
  return (
    <li>
      <a href="#" onClick={onClick}>
        <i className={`fa fa-fw fa-${icon}`} /> {prettyZoneName(type, index)} {customName ? <small>({customName})</small> : ''}
      </a>
    </li>
  )
}


export default function MapOverviewNav({ data, fetchLeaderboard }) {
  const onClickZone = (event, zone) => {
    event.preventDefault()
    console.log(zone.toJS())
    fetchLeaderboard(
      data.getIn(['map_info', 'name']), zone.get('type'), zone.get('zoneindex'))
  }

  const zones = data.get('zones')
  return (
    <div className="MapOverview-MapOverviewNav panel panel-dark">
      <div className="panel-heading">
        <ul className="nav nav-pills nav-stacked nav-dark">
          <li role="presentation" className="">
            <a href="#">
              Leaderboards <i className="fa fa-caret-down" />
            </a>
            <ul className="nav nav-pills nav-stacked nav-dark nav-nested">
              {zoneTypes.map(zoneType => {
                const zs = zones.get(zoneType)
                if (zs !== undefined) {
                  return zs.map(zone =>
                    <MapOverviewNavItem
                      key={zone.get('id')}
                      zone={zone}
                      onClick={(e) => onClickZone(e, zone)}
                    />
                  )
                }
                else {
                  return null
                }
              }).interleave(Immutable.Range(1).map(n => <li key={n} className="divider" />))}
            </ul>
          </li>
          <li role="presentation">
            <a href="#">
              Screenshots <span className="badge">0</span>
            </a>
          </li>
          <li role="presentation">
            <a href="#">
              Videos <span className="badge">0</span>
            </a>
          </li>
          <li role="presentation" className="">
            <a href="#">
              Statistics
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
