import {CALL_API, GET, POST, DELETE} from 'root/middleware/api'


export const LOAD_REQUEST = 'PLAYER_RANKS_LOAD_REQUEST'
export const LOAD_SUCCESS = 'PLAYER_RANKS_LOAD_SUCCESS'
export const LOAD_FAILURE = 'PLAYER_RANKS_LOAD_FAILURE'


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
    const {fetching} = getState().playerLeaderboards
    if (fetching) {
      return null
    }
    return dispatch(fetch(rankType, start))
  }
}
