import Immutable from 'immutable'

import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE, SELECT_VIDEO,
        LOAD_LEADERBOARD_REQUEST,
        LOAD_LEADERBOARD_SUCCESS,
        LOAD_LEADERBOARD_FAILURE,
        LOAD_MORE_LEADERBOARD_REQUEST,
        LOAD_MORE_LEADERBOARD_SUCCESS,
        LOAD_MORE_LEADERBOARD_FAILURE} from './actions'


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
    case LOAD_MORE_LEADERBOARD_REQUEST:
      return state.mergeIn(['leaderboard'],
        { fetching: false
        })
    case LOAD_MORE_LEADERBOARD_SUCCESS: {
      const runsKey = {3: 'soldier', 4: 'demoman'}[action.playerClass]
      return state.mergeDeepIn(['leaderboard'],
        { fetching: false
        , data: {
          results: {
            [runsKey]: state.getIn(['leaderboard', 'data', 'results', runsKey]).concat(Immutable.fromJS(action.data.results[runsKey]))
          }
        }})
    }
    case LOAD_MORE_LEADERBOARD_FAILURE:
      return state.mergeIn(['leaderboard'],
        { fetching: false
        , error: action.error
        })
    default:
      return state
  }
}
