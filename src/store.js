import {createStore, applyMiddleware, compose} from 'redux'
import {createHistory} from 'history'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from './services/api/middleware'
import avatarMiddleware from './components/SteamAvatar/middleware'
import loggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'

import {combineReducers} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import wamp from './services/wamp/reducer'
import wampSaga from './services/wamp/saga'
import steamAvatars from './components/SteamAvatar/reducer'
import serversSaga from './scenes/App/scenes/Home/saga.js'
import mapOverviewSaga from './scenes/App/scenes/MapOverview/saga.js'
import mapsSaga from './scenes/App/scenes/Maps/saga.js'
import app from './scenes/App/reducer'


function* rootSaga() {
  yield all(
    [ wampSaga()
    , serversSaga()
    , mapOverviewSaga()
    , mapsSaga()
    ])
}


export default function configureStore(history, initialState) {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose
  const reducer = combineReducers(
    { router: connectRouter(history)
    , wamp
    , steamAvatars
    , app
    })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      apiMiddleware(),
      avatarMiddleware(),
      sagaMiddleware
      // loggerMiddleware
    )
  ))
  sagaMiddleware.run(rootSaga)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./redux/reducer', () => {
  //     const nextRootReducer = require('./redux/reducer')
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
