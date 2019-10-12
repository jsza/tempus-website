import {combineReducers} from 'redux'

import search             from './components/AppSearch/reducer'
import maps               from './scenes/Maps/reducer'
import mapOverview        from './scenes/MapOverview/reducer'
import activity           from './scenes/Home/scenes/Activity/reducer'
import playerOverview     from './scenes/PlayerOverview/reducer'
import playerLeaderboards from './scenes/PlayerLeaderboards/reducer'
import servers            from './scenes/Home/reducer.js'
import serverDemos        from './scenes/Home/scenes/Server/scenes/ServerDemoList/reducer.js'
import demoOverview       from './scenes/DemoOverview/reducer.js'
import recordOverview     from './scenes/RecordOverview/reducer.js'


export default combineReducers(
  { search
  , maps
  , mapOverview
  , activity
  , playerOverview
  , playerLeaderboards
  , servers
  , serverDemos
  , demoOverview
  , recordOverview
  })
