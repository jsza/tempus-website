import React, {useEffect} from 'react'

import SteamAvatar from 'root/components/SteamAvatar'

import {Link} from 'react-router-dom'

import './styles.styl'


function Authors(props) {
  const {authors} = props
  return (
    <div className="MapOverview-Authors">
      <div className="panel panel-dark">
        <div className="panel-heading">
          <i className="fas fa-paint-brush" /> <strong>Map Authors</strong>
        </div>
        <div className="panel-body">
          <ul>
            {authors.map(author => {
              const name = author.get('name')
              const authorID = author.get('id')
              const pi = author.get('player_info')
              const steamid = pi.get('steamid')

              return (
                <li key={authorID} style={{position: 'relative'}}>
                  <Link className="author-link" to={`/authors/${authorID}`}>
                    <SteamAvatar noLink steamID={steamid} size="small" />
                    {` ${name}`} <span className="currentname">({name})</span>
                    <span className="map-count">
                      {author.get('map_count')} map(s)
                    </span>
                  </Link>
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


export default Authors
