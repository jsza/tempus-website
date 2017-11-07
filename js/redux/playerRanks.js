import Immutable from 'immutable'
import {CALL_API, GET, POST, DELETE} from '../middleware/api'


const LOAD_REQUEST = 'PLAYER_RANKS_LOAD_REQUEST'
const LOAD_SUCCESS = 'PLAYER_RANKS_LOAD_SUCCESS'
const LOAD_FAILURE = 'PLAYER_RANKS_LOAD_FAILURE'


let initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
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
    default:
      return state
  }
}


function fetch(rankType, start) {
  let endpoint
  if (rankType === 'overall') {
    endpoint = 'ranks/overall'
  }
  else if (rankType === 'soldier') {
    endpoint = 'ranks/class/3'
  }
  else if (rankType === 'demoman') {
    endpoint = 'ranks/class/4'
  }
  else {
    throw `Unknown rank type ${rankType}`
  }
  if (start !== undefined) {
    endpoint = endpoint + `?start=${start}`
  }
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: endpoint
      }
    })
}


export function loadRanks(rankType, start) {
  return (dispatch, getState) => {
    const {fetching} = getState().playerRanks
    if (fetching) {
      return null
    }
    return dispatch(fetch(rankType, start))
  }
}
