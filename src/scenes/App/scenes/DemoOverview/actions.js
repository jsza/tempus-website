import {createAction} from 'redux-actions'

import {CALL_API, GET, POST} from 'root/services/api/middleware'


function fetchDemoOverview(demoID) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [FETCHING]
      , success: [RECEIVED]
      , failure: [FETCHING_ERROR]
      , endpoint: `demos/id/${demoID}/overview`
      }
    })
}


export function loadDemoOverview(demoID) {
  return (dispatch, getState) => {
    const fetching = getState().app.demoOverview.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetchDemoOverview(demoID))
  }
}


export function requestDemoUpload(demoID) {
  return (dispatch, getState) => {
    const uploading = getState().app.demoOverview.uploading
    if (uploading) {
      return null
    }
    return dispatch({
      [CALL_API]: {
        method: POST,
        started: [UPLOADING],
        success: [UPLOAD_SUCCESS],
        failure: [UPLOAD_ERROR],
        endpoint: `demos/id/${demoID}/requestUpload`
      }
    })
  }
}


export const FETCHING = createAction('DEMO_OVERVIEW/FETCH')
export const RECEIVED = createAction('DEMO_OVERVIEW/RECEIVE')
export const FETCHING_ERROR = createAction('DEMO_OVERVIEW/ERROR')

export const UPLOADING = createAction('DEMO_OVERVIEW/UPLOADING')
export const UPLOAD_SUCCESS = createAction('DEMO_OVERVIEW/UPLOAD_SUCCESS')
export const UPLOAD_ERROR = createAction('DEMO_OVERVIEW/UPLOAD_ERROR')
