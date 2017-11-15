import React from 'react'
import {PERMISSIONS} from './utils/loginData'

import {BrowserRouter as Router, Route} from 'react-router-dom'
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
    , { path: 'activity', component: Home }
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
      <Route path="maps" component={Maps} />
      <Route path="maps/:name" component={MapOverview} />
      <Route path="players/:id" component={PlayerOverview} />
      <Route path="ranks/overall" component={PlayerLeaderboards} rankType="overall" />
      <Route path="ranks/soldier" component={PlayerLeaderboards} rankType="soldier" />
      <Route path="ranks/demoman" component={PlayerLeaderboards} rankType="demoman" />
      <Route path="activity" component={Home} />
    </Route>
  )
}
