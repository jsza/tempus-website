import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import maps from '../scenes/Maps/services/maps/reducer'
import mapOverview from './mapOverview'
import steamAvatars from '../services/steamAvatars/reducer'
import search from '../scenes/App/services/appsearch/reducer'
import activity from '../scenes/Home/services/activity/reducer'
import playerOverview from '../scenes/PlayerOverview/services/playerOverview/reducer'
import playerRanks from './playerRanks'
import extraMaps from './extraMaps'


export default combineReducers(
  { routing: routerReducer
  , maps
  , mapOverview
  , steamAvatars
  , search
  , activity
  , playerOverview
  , playerRanks
  , extraMaps
  })
