import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'

import maps from './maps'


export default combineReducers({
  router: routerStateReducer,
  maps
})
