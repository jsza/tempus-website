import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import maps from './maps'
import mapOverview from './mapOverview'
import avatars from './avatars'
import search from './search'
import activity from './activity'
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
