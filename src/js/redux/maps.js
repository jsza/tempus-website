import Immutable from 'immutable'
import {CALL_API, GET, POST, DELETE} from '../middleware/api'


const LOAD_REQUEST = 'MAPS_LOAD_REQUEST'
const LOAD_SUCCESS = 'MAPS_LOAD_SUCCESS'
const LOAD_FAILURE = 'MAPS_LOAD_FAILURE'
const RESET = 'MAPS_RESET'


let initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  })
initialState = new initialState()


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_REQUEST:
    case RESET:
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


function fetch() {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: 'maps/detailedList'
      }
    })
}


export function loadMaps() {
  return (dispatch, getState) => {
    const fetching = getState().maps.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch())
  }
}


export function resetMaps() {
  return {type: RESET}
}
