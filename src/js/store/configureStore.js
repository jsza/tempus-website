import {createStore, applyMiddleware, compose} from 'redux'
import {reduxReactRouter} from 'redux-router'
import createHistory from 'history/lib/createHashHistory'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../redux/reducer'
import apiMiddleware from '../middleware/api'
import avatarMiddleware from '../middleware/steamAvatar'
import loggerMiddleware from 'redux-logger'


export default function configureStore(api, initialState) {
  return compose(
    applyMiddleware(
      thunkMiddleware,
      apiMiddleware(api),
      avatarMiddleware()
      // loggerMiddleware
    ),
    reduxReactRouter({
      createHistory
    })
  )(createStore)(rootReducer, initialState)
}
