import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'

import maps from './maps'
import mapOverview from './mapOverview'
import avatars from './avatars'


export default combineReducers({
  router: routerStateReducer,
  maps,
  mapOverview,
  avatars
})
