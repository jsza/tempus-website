import {CALL_API, GET} from 'root/middleware/api'


export const LOAD_REQUEST = 'SERVERS_LOAD_REQUEST'
export const LOAD_SUCCESS = 'SERVERS_LOAD_SUCCESS'
export const LOAD_FAILURE = 'SERVERS_LOAD_FAILURE'


function fetch() {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: `servers/statusList`
      }
    })
}


export function loadServers() {
  return (dispatch, getState) => {
    const fetching = getState().servers.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch())
  }
}
