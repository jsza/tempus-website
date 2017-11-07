import Immutable from 'immutable'
import {CALL_API, GET, POST, DELETE} from '../middleware/api'


const LOAD_REQUEST = 'SEARCH_LOAD_REQUEST'
const LOAD_SUCCESS = 'SEARCH_LOAD_SUCCESS'
const LOAD_FAILURE = 'SEARCH_LOAD_FAILURE'


let initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  })
initialState = new initialState()


const dataRecord = Immutable.Record(
  { players: null
  , maps: null
  })


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return state.set('fetching', true)
    case LOAD_SUCCESS:
      return state.merge(
        { fetching: false
        , data: new dataRecord(Immutable.fromJS(action.data))
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


function fetch(s) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: `search/playersAndMaps/${s}`
      }
    })
}


export function searchPlayersAndMaps(s) {
  return (dispatch, getState) => {
    const fetching = getState().search.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch(s))
  }
}
