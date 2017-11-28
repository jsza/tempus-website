import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actions from './actions'


export default handleActions({
  [actions.wampSubscribe]: (state, action) => (
    state.set(action.actionType, action.uri)
  ),

  [actions.wampUnsubscribe]: (state, action) => (
    state.delete(action.actionType)
  )
}, Immutable.Map())
