import Immutable from 'immutable'

import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE} from './actions'


let initialState = new Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  })()


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
    default:
      return state
  }
}
