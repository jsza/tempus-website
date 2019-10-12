import {CALL_API, GET} from 'root/services/api/middleware'

import * as wampActions from 'root/services/wamp/actions'


export const LOAD_REQUEST = 'SERVERS_LOAD_REQUEST'
export const LOAD_SUCCESS = 'SERVERS_LOAD_SUCCESS'
export const LOAD_FAILURE = 'SERVERS_LOAD_FAILURE'

export const UPDATE = 'SERVERS_UPDATE'

export const FILTER_TOGGLE = 'SERVERS_FILTER_TOGGLE'


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
    const fetching = getState().app.servers.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch())
  }
}


export function toggleFilter(filter) {
  return {
    type: FILTER_TOGGLE,
    filter
  }
}


export function subscribe() {
  return wampActions.subscribe('xyz.tempus.jump.serverstatus.changed', UPDATE)
}


export function unsubscribe() {
  return wampActions.unsubscribe('xyz.tempus.jump.serverstatus.changed', UPDATE)
}
