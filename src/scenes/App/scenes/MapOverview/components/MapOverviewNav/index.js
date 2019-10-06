import React from 'react'

import Immutable from 'immutable'

import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'

import {prettyZoneName} from 'root/utils/TempusUtils'
import './styles.styl'


const zoneTypes = Immutable.List(['map', 'course', 'bonus'])


export function MapOverviewNavItem({ zone, onClick, mapName, baseURL}) {
  const type = zone.get('type')
  const index = zone.get('zoneindex')
  const customName = zone.get('custom_name')
  const icon = {map: 'globe', course: 'flag', bonus: 'star'}[type]
  return (
    <li>
      <NavLink to={`${baseURL}/leaderboards/${type}/${index}`}>
        <i className={`fa fa-fw fa-${icon}`} /> {prettyZoneName(type, index)} {customName ? <small>({customName})</small> : ''}
      </NavLink>
    </li>
  )
}


export function MapOverviewLeaderboardNav({ zones, mapName, baseURL }) {
  const zonesGrouped = zoneTypes.map(zoneType => zones.get(zoneType)).filter(x => x !== undefined)

  return (
    <ul className="nav nav-pills nav-stacked nav-dark nav-nested">
      { zonesGrouped.map(zs => zs.map(zone =>
        <MapOverviewNavItem
          key={zone.get('id')}
          zone={zone}
          mapName={mapName}
          baseURL={baseURL}
        />
      )).interleave(Immutable.Range(1).map(n => <li key={n} className="divider" />))
      }
    </ul>
  )
}


function MapOverviewNav({ data, fetchLeaderboard, match }) {
  const {name} = match.params

  const zones = data.get('zones')
  return (
    <div className="MapOverview-MapOverviewNav">
      <div className="inner-container">
        <ul className="nav nav-pills nav-stacked nav-dark">
          <li role="presentation">
            <a href="#">
              <i className="fa fa-fw fa-trophy" /> Leaderboards <i className="fa fa-caret-down" />
            </a>
            <MapOverviewLeaderboardNav zones={zones} mapName={name} baseURL={match.url} />
          </li>
          <li>
            <NavLink to={`${match.url}/authors`}><i className="fa fa-fw fa-paint-brush" /> Authors <span className="badge">{`${data.get('authors').size}`}</span></NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}


export default withRouter(MapOverviewNav)
