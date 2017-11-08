import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import maps from './maps'
import mapOverview from './mapOverview'
import avatars from './avatars'
import search from '../scenes/App/services/appsearch/reducer'
import activity from '../scenes/Home/services/activity/reducer'
import playerOverview from './playerOverview'
import playerRanks from './playerRanks'
import extraMaps from './extraMaps'


export default combineReducers(
  { routing: routerReducer
  , maps
  , mapOverview
  , avatars
  , search
  , activity
  , playerOverview
  , playerRanks
  , extraMaps
  })
