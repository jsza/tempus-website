import {CALL_API, GET, POST, DELETE} from 'root/middleware/api'


export const LOAD_REQUEST = 'MAPS_LOAD_REQUEST'
export const LOAD_SUCCESS = 'MAPS_LOAD_SUCCESS'
export const LOAD_FAILURE = 'MAPS_LOAD_FAILURE'
export const RESET = 'MAPS_RESET'
export const SET_FILTER = 'MAPS_SET_FILTER'
export const SET_SIMPLE = 'MAPS_SET_SIMPLE'
export const SELECT_SORT = 'MAPS_SELECT_SORT'


function fetch() {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_REQUEST]
      , success: [LOAD_SUCCESS]
      , failure: [LOAD_FAILURE]
      , endpoint: 'maps/detailedList'
      }
    })
}


export function loadMaps() {
  return (dispatch, getState) => {
    const {fetching, data} = getState().maps
    if (fetching || data) {
      return null
    }
    return dispatch(fetch())
  }
}


export function resetMaps() {
  return {type: 'no'}
}


export function setFilter(playerClass, filter) {
  return (
    { type: SET_FILTER
    , playerClass
    , filter
    }
  )
}


export function toggleSimple(value) {
  return (
    { type: SET_SIMPLE
    , value: value
    })
}


export function selectMapSort(sortBy) {
  return (
    { type: SELECT_SORT
    , sortBy: sortBy
    })
}
