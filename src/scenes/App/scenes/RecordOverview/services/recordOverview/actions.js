import {createAction} from 'redux-actions'

import {CALL_API, GET, POST} from 'root/services/api/middleware'


function fetchRecordOverview(recordID) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [FETCHING]
      , success: [RECEIVED]
      , failure: [FETCHING_ERROR]
      , endpoint: `records/id/${recordID}/overview`
      }
    })
}


export function loadRecordOverview(recordID) {
  return (dispatch, getState) => {
    const fetching = getState().recordOverview.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetchRecordOverview(recordID))
  }
}


export const FETCHING = createAction('RECORD_OVERVIEW/FETCH')
export const RECEIVED = createAction('RECORD_OVERVIEW/RECEIVE')
export const FETCHING_ERROR = createAction('RECORD_OVERVIEW/ERROR')
