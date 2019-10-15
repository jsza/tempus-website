import React, {useEffect} from 'react'

import SteamAvatar from 'root/components/SteamAvatar'

import {NavLink} from 'react-router-dom'

import './styles.styl'


export default function MapAuthors({ authors }) {
  return (
    <div className="col-md-10 MapOverview-MapAuthorsView">
      <div className="panel panel-dark">
        <div className="panel-heading">
          <i className="fas fa-paint-brush" /> <strong>Map Authors</strong>
        </div>
        <div className="panel-body">
          <ul>
            {authors.map(author => {
              const name = author.get('name')
              const pi = author.get('player_info')
              const steamid = pi.get('steamid')

              return (
                <li key={author.get('id')}>
                  <SteamAvatar steamID={steamid} size="small" /> <NavLink to={`/players/${pi.get('id')}`}>{name} <span className="currentname">({pi.get('name')})</span></NavLink>
                </li>
              )
            })}
          </ul>
          <p>
            {authors.size} result(s)
          </p>
        </div>
      </div>
    </div>
  )
}
