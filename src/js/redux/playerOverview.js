import Immutable from 'immutable'
import {CALL_API, GET} from '../middleware/api'


const LOAD_REQUEST = 'PLAYER_OVERVIEW_LOAD_REQUEST'
const LOAD_SUCCESS = 'PLAYER_OVERVIEW_LOAD_SUCCESS'
const LOAD_FAILURE = 'PLAYER_OVERVIEW_LOAD_FAILURE'


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


function fetch(playerID) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: `players/id/${playerID}/stats`
      }
    })
}


export function loadPlayer(playerID) {
  return (dispatch, getState) => {
    const {fetching, data} = getState().playerOverview
    if (fetching) {
      return null
    }
    const playerID = getState().router.params.id
    return dispatch(fetch(playerID))
  }
}
