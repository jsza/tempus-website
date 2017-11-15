import {createStore, applyMiddleware, compose} from 'redux'
import {createHistory} from 'history'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from './middleware/api'
import avatarMiddleware from './middleware/steamAvatar'
import loggerMiddleware from 'redux-logger'

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import maps from './scenes/Maps/services/maps/reducer'
import mapOverview from './scenes/MapOverview/services/mapOverview/reducer'
import steamAvatars from './services/steamAvatars/reducer'
import search from './scenes/App/services/appsearch/reducer'
import activity from './scenes/Home/services/activity/reducer'
import playerOverview from './scenes/PlayerOverview/services/playerOverview/reducer'
import playerLeaderboards from './scenes/PlayerLeaderboards/services/playerLeaderboards/reducer'
import servers from './scenes/Home/scenes/Servers/services/servers/reducer.js'


export default function configureStore(api, initialState) {
  const reducer = combineReducers(
    { routing: routerReducer
    , maps
    , mapOverview
    , steamAvatars
    , search
    , activity
    , playerOverview
    , playerLeaderboards
    , servers
    })
  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      apiMiddleware(api),
      avatarMiddleware()
      // loggerMiddleware
    )
  )(createStore)(reducer, initialState)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./redux/reducer', () => {
  //     const nextRootReducer = require('./redux/reducer')
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
