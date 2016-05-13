import Immutable from 'immutable'
import {CALL_API, GET} from '../middleware/api'


const LOAD_REQUEST = 'ACTIVITY_LOAD_REQUEST'
const LOAD_SUCCESS = 'ACTIVITY_LOAD_SUCCESS'
const LOAD_FAILURE = 'ACTIVITY_LOAD_FAILURE'


const initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  })


export default function reducer(state=new initialState(), action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return state.merge(new initialState())
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
      , endpoint: `activity`
      }
    })
}


export function loadActivity() {
  return (dispatch, getState) => {
    const fetching = getState().activity.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch())
  }
}
