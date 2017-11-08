import React from 'react'
import {PERMISSIONS} from './utils/loginData'

import {Route, IndexRoute} from 'react-router'
import App from './scenes/App'
import Home from './scenes/Home'
import Maps from './scenes/Maps'
import MapOverview from './scenes/MapOverview'
import PlayerOverview from './scenes/PlayerOverview'
import PlayerLeaderboards from './scenes/PlayerLeaderboards'


class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <div style={{textAlign: 'center'}}>
          <img src="http://i.imgur.com/BCCVLXx.png" />
        </div>
      </div>
    )
  }
}


const routes =
  { 'public':
    [ { path: 'maps', component: Maps }
    , { path: 'maps/:name', component: MapOverview }
    , { path: 'players/:id', component: PlayerOverview }
    , { path: 'ranks/overall', component: PlayerLeaderboards, rankType: 'overall' }
    , { path: 'ranks/soldier', component: PlayerLeaderboards, rankType: 'soldier' }
    , { path: 'ranks/demoman', component: PlayerLeaderboards, rankType: 'demoman' }
    ]
  }


export function makeRoutes() {
  let childRoutes = []
  for (let key in routes) {
    if (PERMISSIONS.includes(key)) {
      childRoutes = childRoutes.concat(routes[key])
    }
  }
  childRoutes.push({component: NotFound, path:'*'})
  return (
    // workaround for warning from react-redux
    <Route component={App} path="/" childRoutes={childRoutes}>
      <IndexRoute component={Home} />
    </Route>
  )
}
