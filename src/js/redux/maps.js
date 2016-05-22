import Immutable from 'immutable'
import {CALL_API, GET, POST, DELETE} from '../middleware/api'


const LOAD_REQUEST = 'MAPS_LOAD_REQUEST'
const LOAD_SUCCESS = 'MAPS_LOAD_SUCCESS'
const LOAD_FAILURE = 'MAPS_LOAD_FAILURE'
const RESET = 'MAPS_RESET'
const SET_FILTER = 'MAPS_SET_FILTER'
const SET_SIMPLE = 'MAPS_SET_SIMPLE'
const SELECT_SORT = 'MAPS_SELECT_SORT'


let sortState = Immutable.Record(
  { sortBy: 'name'
  , ascending: true
  })


let initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , filters: Immutable.fromJS(
    { 'soldier': null
    , 'demoman': null
    })
  , simple: false
  , sort: new sortState()
  })
initialState = new initialState()


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_REQUEST:
    case RESET:
      return state.merge(initialState)
    case LOAD_SUCCESS:
      return state.merge(
        { fetching: false
        , data: Immutable.fromJS(action.data)
        })
    case LOAD_FAILURE:
      return state.merge(
        { fetching: false
        , error: action.error
        })
    case SET_FILTER:
      const other = action.playerClass === 'soldier' ? 'demoman' : 'soldier'
      return state.mergeIn(['filters'],
        { [action.playerClass]: action.filter
        , [other]: null
        }
        )
    case SET_SIMPLE:
      return state.set('simple', action.value)
    case SELECT_SORT:
      return state.update('sort', (value) => {
        if (value.get('sortBy') === action.sortBy) {
          return value.set('ascending', !value.get('ascending'))
        }
        return value.merge(
          { sortBy: action.sortBy
          , ascending: true
          })
      })
    default:
      return state
  }
}


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


export function setSimple(value) {
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
