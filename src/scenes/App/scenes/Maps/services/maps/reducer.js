import Immutable from 'immutable'

import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE, RESET, SET_FILTER,
        SET_SIMPLE, SELECT_SORT} from './actions'


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
      return state.set('simple', !state.get('simple'))
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
