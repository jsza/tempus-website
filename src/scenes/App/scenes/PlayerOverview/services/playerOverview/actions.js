import {CALL_API, GET} from 'root/middleware/api'


export const LOAD_REQUEST = 'PLAYER_OVERVIEW_LOAD_REQUEST'
export const LOAD_SUCCESS = 'PLAYER_OVERVIEW_LOAD_SUCCESS'
export const LOAD_FAILURE = 'PLAYER_OVERVIEW_LOAD_FAILURE'


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
    return dispatch(fetch(playerID))
  }
}
