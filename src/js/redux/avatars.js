import Immutable from 'immutable'
import {CALL_API, GET} from '../middleware/api'


export const QUEUE_AVATAR = 'AVATARS_QUEUE_ONE'
const REQUEST = 'AVATARS_REQUEST'
const SUCCESS = 'AVATARS_SUCCESS'
const FAILURE = 'AVATARS_FAILURE'


const initialState = Immutable.fromJS(
  { error: null
  , data: {}
  })


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return state.mergeDeep(
        { fetching: false
        , data: action.data
        })
    case FAILURE:
      return state.merge(
        { fetching: false
        , error: action.error
        })
    default:
      return state
  }
}


export function loadAvatars(steamids) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [REQUEST]
      , success: [SUCCESS]
      , failure: [FAILURE]
      , endpoint: 'steamavatars'
      , params: {steamids: steamids.join(',')}
    }
  })
}


export function queueAvatar(steamID) {
  return (
    { type: QUEUE_AVATAR
    , steamID: steamID
    })
}
