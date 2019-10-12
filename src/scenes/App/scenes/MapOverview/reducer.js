import Immutable from 'immutable'
import {combineReducers} from 'redux'
import leaderboardsReducer from './scenes/Leaderboards/reducer'

import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE, SELECT_VIDEO} from './actions'


let initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , selectedVideo: null
  })
initialState = new initialState()


function reducer(state=initialState, action) {
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
    default:
      return state
  }
}


export default combineReducers(
  { mapOverview: reducer
  , leaderboards: leaderboardsReducer
  }
)
