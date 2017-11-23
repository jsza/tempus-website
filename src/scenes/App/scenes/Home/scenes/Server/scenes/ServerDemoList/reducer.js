import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actions from './actions'


const InitialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  })


export default handleActions({
  [actions.serverDemosFetching]: (state, action) => (
    new InitialState()
  ),

  [actions.serverDemosReceived]: (state, action) => (
    state.merge({
      fetching: false,
      error: null,
      data: Immutable.fromJS(action.payload.data)
    })
  ),

  [actions.serverDemosError]: (state, action) => (
    state.merge({
      fetching: false,
      error: action.payload.error
    })
  )
}, new InitialState())
