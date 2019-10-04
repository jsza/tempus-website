import React from 'react'

import Immutable from 'immutable'

import {useParams} from 'react-router'
import {NavLink} from 'react-router-dom'

import {prettyZoneName} from 'root/utils/TempusUtils'
import './styles.styl'


const zoneTypes = Immutable.List(['map', 'course', 'bonus'])


export function MapOverviewNavItem({ zone, onClick, mapName }) {
  const type = zone.get('type')
  const index = zone.get('zoneindex')
  const customName = zone.get('custom_name')
  const icon = {map: 'globe', course: 'flag', bonus: 'star'}[type]
  return (
    <li>
      <NavLink active to={`/maps/${mapName}/leaderboards/${type}/${index}`}>
        <i className={`fa fa-fw fa-${icon}`} /> {prettyZoneName(type, index)} {customName ? <small>({customName})</small> : ''}
      </NavLink>
    </li>
  )
}


export function MapOverviewLeaderboardNav({ zones, mapName }) {
  const zonesGrouped = zoneTypes.map(zoneType => zones.get(zoneType)).filter(x => x !== undefined)

  return (
    <ul className="nav nav-pills nav-stacked nav-dark nav-nested">
      { zonesGrouped.map(zs => zs.map(zone =>
        <MapOverviewNavItem
          key={zone.get('id')}
          zone={zone}
          mapName={mapName}
        />
      )).interleave(Immutable.Range(1).map(n => <li key={n} className="divider" />))
      }
    </ul>
  )
}


export default function MapOverviewNav({ data, fetchLeaderboard, match }) {
  const {name} = useParams()

  const zones = data.get('zones')
  return (
    <div className="MapOverview-MapOverviewNav panel panel-dark">
      <div className="panel-heading">
        <ul className="nav nav-pills nav-stacked nav-dark">
          <li role="presentation">
            <a href="#">
              Leaderboards <i className="fa fa-caret-down" />
            </a>
            <MapOverviewLeaderboardNav zones={zones} mapName={name} />
          </li>
        </ul>
      </div>
    </div>
  )
}
