import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import {FETCH,
        RECEIVE,
        FETCH_ERROR,
        FETCH_MORE,
        FETCH_MORE_SUCCESS,
        FETCH_MORE_ERROR,
        TOGGLE_EXPAND,
        COLLAPSE_ALL} from './actions'


let initialState = new Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , expandedRuns:
    { [3]: Immutable.Set()
    , [4]: Immutable.Set()
    }
  })()


export default handleActions(
  { [FETCH]: (state, action) =>
    state.merge(
      { fetching: true
      , error: null
      , zoneType: action.zoneType
      , index: action.index
      , expandedRuns: initialState.expandedRuns
      })
  , [RECEIVE]: (state, action) =>
    state.merge(
      { fetching: false
      , data: Immutable.fromJS(action.payload.data)
      })
  , [FETCH_ERROR]: (state, action) =>
    state.merge(
      { fetching: false
      , error: action.payload.error
      })
  , [FETCH_MORE]: (state, action) =>
    state.merge(
      { fetching: false
      })
  , [FETCH_MORE_SUCCESS]: (state, action) => {
    const { playerClass, data } = action.payload
    const runsKey = {3: 'soldier', 4: 'demoman'}[playerClass]
    return state.mergeDeep(
      { fetching: false
      , data: {
        results: {
          [runsKey]: Immutable.fromJS(data.results[runsKey])
        }
      }})}
  , [FETCH_MORE_ERROR]: (state, action) =>
    state.merge(
      { fetching: false
      , error: action.error
      })
  , [TOGGLE_EXPAND]: (state, action) => {
    const { playerClass, runID } = action.payload
    return state.updateIn(['expandedRuns', playerClass],
      (x) => x.includes(runID) ? x.delete(runID) : x.add(runID)
    )}
  , [COLLAPSE_ALL]: (state, action) =>
    state.updateIn(
      ['expandedRuns', action.payload.playerClass], (x) => x.clear())
  }, initialState
)
