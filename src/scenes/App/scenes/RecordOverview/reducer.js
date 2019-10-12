import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actions from './actions'


const InitialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  })


export default handleActions({
  [actions.FETCHING]: (state, action) => (
    state.merge({
      fetching: true,
      error: null,
      data: null
    })
  ),

  [actions.RECEIVED]: (state, action) => (
    state.merge({
      fetching: false,
      error: null,
      data: Immutable.fromJS(action.payload.data)
    })
  ),

  [actions.FETCHING_ERROR]: (state, action) => (
    state.merge({
      fetching: false,
      error: action.payload.error
    })
  )
}, new InitialState())
