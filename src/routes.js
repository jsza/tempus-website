import React from 'react'
import {PERMISSIONS} from './utils/loginData'

import {Route, IndexRoute} from 'react-router'
import App from './scenes/App'
import Home from './scenes/Home'
import Maps from './scenes/Maps'
import MapOverviewApp from './containers/MapOverviewApp'
import PlayerOverviewApp from './containers/PlayerOverviewApp'
import PlayerRanksApp from './containers/PlayerRanksApp'
import ExtraMapsApp from './containers/ExtraMapsApp'


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
    , { path: 'maps/:name', component: MapOverviewApp }
    , { path: 'players/:id', component: PlayerOverviewApp }
    , { path: 'ranks/overall', component: PlayerRanksApp, rankType: 'overall' }
    , { path: 'ranks/soldier', component: PlayerRanksApp, rankType: 'soldier' }
    , { path: 'ranks/demoman', component: PlayerRanksApp, rankType: 'demoman' }
    ]
  , 'extramaps':
    [ { path: 'extramaps', component: ExtraMapsApp}
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
