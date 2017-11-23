import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actions from './actions'


const InitialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , uploading: false
  , uploadingError: null
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
  ),

  [actions.UPLOADING]: (state, action) => (
    state.merge({
      uploading: true,
      uploadingError: null
    })
  ),

  [actions.UPLOAD_SUCCESS]: (state, action) => (
    state.set('uploading', false).setIn(['data', 'demo_info'],
                                        Immutable.fromJS(action.payload.data))
  ),

  [actions.UPLOAD_ERROR]: (state, action) => (
    state.merge({
      uploading: false,
      uploadingError: action.payload.error
    })
  )
}, new InitialState())
