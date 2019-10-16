import React, {useEffect} from 'react'

import SteamAvatar from 'root/components/SteamAvatar'

import {NavLink} from 'react-router-dom'

import './styles.styl'


function Authors(props) {
  console.log('render', props)
  const {authors} = props
  return (
    <div className="col-md-10 MapOverview-Authors">
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
                  <SteamAvatar steamID={steamid} size="small" style={{position: 'absolute', left: 0, top: 0}} />
                  <NavLink className="author-link" to={`/authors/${authorID}`} style={{height: '38px'}}>
                    {name} <span className="currentname">({name})</span>
                  </NavLink>
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
