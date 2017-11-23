import {createStore, applyMiddleware, compose} from 'redux'
import {createHistory} from 'history'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from './middleware/api'
import avatarMiddleware from './middleware/steamAvatar'
import loggerMiddleware from 'redux-logger'

import {combineReducers} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'

import maps from './scenes/App/scenes/Maps/services/maps/reducer'
import mapOverview from './scenes/App/scenes/MapOverview/services/mapOverview/reducer'
import steamAvatars from './services/steamAvatars/reducer'
import search from './scenes/App/services/appsearch/reducer'
import activity from './scenes/App/scenes/Home/scenes/Activity/reducer'
import playerOverview from './scenes/App/scenes/PlayerOverview/services/playerOverview/reducer'
import playerLeaderboards from './scenes/App/scenes/PlayerLeaderboards/services/playerLeaderboards/reducer'
import servers from './scenes/App/scenes/Home/services/servers/reducer.js'
import serverDemos from './scenes/App/scenes/Home/scenes/Server/scenes/ServerDemoList/reducer.js'
import demoOverview from './scenes/App/scenes/DemoOverview/services/demoOverview/reducer.js'


export default function configureStore(api, history, initialState) {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose
  const reducer = combineReducers(
    { router: routerReducer
    , maps
    , mapOverview
    , steamAvatars
    , search
    , activity
    , playerOverview
    , playerLeaderboards
    , servers
    , serverDemos
    , demoOverview
    })
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      apiMiddleware(api),
      avatarMiddleware()
      // loggerMiddleware
    )
  ))

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./redux/reducer', () => {
  //     const nextRootReducer = require('./redux/reducer')
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
