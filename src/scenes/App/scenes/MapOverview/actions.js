import {CALL_API, GET, POST, DELETE} from 'root/services/api/middleware'


export const LOAD_REQUEST = 'MAP_OVERVIEW_LOAD_REQUEST'
export const LOAD_SUCCESS = 'MAP_OVERVIEW_LOAD_SUCCESS'
export const LOAD_FAILURE = 'MAP_OVERVIEW_LOAD_FAILURE'
export const SELECT_VIDEO = 'MAP_OVERVIEW_SELECT_VIDEO'
export const LOAD_LEADERBOARD_REQUEST = 'MAP_OVERVIEW_LOAD_LEADERBOARD_REQUEST'
export const LOAD_LEADERBOARD_SUCCESS = 'MAP_OVERVIEW_LOAD_LEADERBOARD_SUCCESS'
export const LOAD_LEADERBOARD_FAILURE = 'MAP_OVERVIEW_LOAD_LEADERBOARD_FAILURE'
export const LOAD_MORE_LEADERBOARD_REQUEST = 'MAP_OVERVIEW_LOAD_MORE_LEADERBOARD_REQUEST'
export const LOAD_MORE_LEADERBOARD_SUCCESS = 'MAP_OVERVIEW_LOAD_MORE_LEADERBOARD_SUCCESS'
export const LOAD_MORE_LEADERBOARD_FAILURE = 'MAP_OVERVIEW_LOAD_MORE_LEADERBOARD_FAILURE'
export const LEADERBOARD_TOGGLE_EXPAND = 'MAP_OVERVIEW_LEADERBOARD_TOGGLE_EXPAND'



function fetch(mapName) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: `maps/name/${mapName}/fullOverview2`
      }
    , mapName
    })
}


export function loadMapOverview(mapName) {
  return (dispatch, getState) => {
    const { fetching } = getState().app.mapOverview.mapOverview
    if (fetching) {
      return null
    }
    return dispatch(fetch(mapName))
  }
}


export function selectVideo(video) {
  return (
    { type: SELECT_VIDEO
    , video
    }
  )
}
