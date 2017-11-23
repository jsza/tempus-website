import {createAction} from 'redux-actions'

import {CALL_API, GET} from 'root/middleware/api'


function fetchServerDemos(serverID) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [serverDemosFetching]
      , success: [serverDemosReceived]
      , failure: [serverDemosError]
      , endpoint: `servers/${serverID}/demos`
      }
    })
}


export function loadServerDemos(serverID) {
  return (dispatch, getState) => {
    const fetching = getState().servers.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetchServerDemos(serverID))
  }
}


export const serverDemosFetching = createAction('SERVERDEMOS/FETCH')
export const serverDemosReceived = createAction('SERVERDEMOS/RECEIVE')
export const serverDemosError = createAction('SERVERDEMOS/ERROR')
