import Immutable from 'immutable'
import {CALL_API, GET, POST, DELETE} from '../middleware/api'


const LOAD_REQUEST = 'MAP_OVERVIEW_LOAD_REQUEST'
const LOAD_SUCCESS = 'MAP_OVERVIEW_LOAD_SUCCESS'
const LOAD_FAILURE = 'MAP_OVERVIEW_LOAD_FAILURE'
const SELECT_VIDEO = 'MAP_OVERVIEW_SELECT_VIDEO'
const LOAD_LEADERBOARD_REQUEST = 'MAP_OVERVIEW_LOAD_LEADERBOARD_REQUEST'
const LOAD_LEADERBOARD_SUCCESS = 'MAP_OVERVIEW_LOAD_LEADERBOARD_SUCCESS'
const LOAD_LEADERBOARD_FAILURE = 'MAP_OVERVIEW_LOAD_LEADERBOARD_FAILURE'


let initialLeaderboardState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , zoneType: 'map'
  , index: 1
  })


let initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , selectedVideo: null
  , leaderboard: new initialLeaderboardState()
  })
initialState = new initialState()


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return state.merge(initialState)
    case LOAD_SUCCESS:
      return state.merge(
        { fetching: false
        , data: Immutable.fromJS(action.data)
        })
    case LOAD_FAILURE:
      return state.merge(
        { fetching: false
        , error: action.error
        })
    case SELECT_VIDEO:
      return state.merge(
        { selectedVideo: action.video
        })
    case LOAD_LEADERBOARD_REQUEST:
      return state.mergeIn(['leaderboard'],
        { fetching: true
        , error: null
        , data: null
        , zoneType: action.zoneType
        , index: action.index
        })
    case LOAD_LEADERBOARD_SUCCESS:
      return state.mergeIn(['leaderboard'],
        { fetching: false
        , data: action.data
        })
    case LOAD_LEADERBOARD_FAILURE:
      return state.mergeIn(['leaderboard'],
        { fetching: false
        , error: action.error
        })
    default:
      return state
  }
}


function fetch(mapName) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS, () => fetchLeaderboard('map', 1)]
      , failure: [LOAD_FAILURE]
      , endpoint: `maps/name/${mapName}/fullOverview`
      }
    , mapName
    })
}


export function loadMapOverview() {
  return (dispatch, getState) => {
    const fetching = getState().mapOverview.fetching
    if (fetching) {
      return null
    }
    const mapName = getState().router.params.name
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


export function fetchLeaderboard(zoneType, index) {
  return (dispatch, getState) => {
    const mapName = getState().router.params.name
    return dispatch(
      { [CALL_API]:
        { method: GET
        , started: [LOAD_LEADERBOARD_REQUEST]
        , success: [LOAD_LEADERBOARD_SUCCESS]
        , failure: [LOAD_LEADERBOARD_FAILURE]
        , endpoint: `maps/name/${mapName}/zones/typeindex/${zoneType}/${index}/records/list`
        }
        , zoneType
        , index
      }
    )
  }
}
