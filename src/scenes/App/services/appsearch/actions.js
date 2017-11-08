import {CALL_API, GET, POST, DELETE} from 'root/middleware/api'


export const LOAD_REQUEST = 'SEARCH_LOAD_REQUEST'
export const LOAD_SUCCESS = 'SEARCH_LOAD_SUCCESS'
export const LOAD_FAILURE = 'SEARCH_LOAD_FAILURE'


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
