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



function fetch(mapName) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: `maps/name/${mapName}/fullOverview`
      }
    , mapName
    })
}


export function loadMapOverview(mapName) {
  return (dispatch, getState) => {
    const fetching = getState().mapOverview.fetching
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


export function fetchLeaderboard(mapName, zoneType, index) {
  return (dispatch, getState) => {
    const {mapOverview} = getState()
    if (mapOverview.getIn(['leaderboard', 'fetching'])) {
      return null
    }

    return dispatch(
      { [CALL_API]:
        { method: GET
        , started: [LOAD_LEADERBOARD_REQUEST]
        , success: [LOAD_LEADERBOARD_SUCCESS]
        , failure: [LOAD_LEADERBOARD_FAILURE]
        , endpoint: `maps/name/${mapName}/zones/typeindex/${zoneType}/${index}/records/list?limit=50`
        }
        , zoneType
        , index
      }
    )
  }
}


export function fetchMoreLeaderboard(playerClass) {
  return (dispatch, getState) => {
    const leaderboard = getState().mapOverview.get('leaderboard')
    const zoneID = leaderboard.getIn(['data', 'zone_info', 'id'])
    const runsKey = {3: 'soldier', 4: 'demoman'}[playerClass]
    const lastRank = leaderboard.getIn(['data', 'results', runsKey]).last().get('rank')
    return dispatch(
      { [CALL_API]:
        { method: GET
        , started: [LOAD_MORE_LEADERBOARD_REQUEST]
        , success: [LOAD_MORE_LEADERBOARD_SUCCESS]
        , failure: [LOAD_MORE_LEADERBOARD_FAILURE]
        , endpoint: `zones/id/${zoneID}/records/list?limit=50&start=${lastRank + 1}&sort=duration&direction=ascending`
        }
        , playerClass
      }
    )
  }
}
