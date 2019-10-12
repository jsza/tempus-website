import {CALL_API, GET} from 'root/services/api/middleware'


export const LOAD_REQUEST = 'ACTIVITY_LOAD_REQUEST'
export const LOAD_SUCCESS = 'ACTIVITY_LOAD_SUCCESS'
export const LOAD_FAILURE = 'ACTIVITY_LOAD_FAILURE'


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
    const fetching = getState().app.activity.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch())
  }
}
