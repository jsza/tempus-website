import Immutable from 'immutable'
import {SUCCESS, FAILURE} from './actions'


const initialState = Immutable.fromJS(
  { error: null
  , data: {}
  })


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return state.mergeDeep(
        { fetching: false
        , data: action.data
        })
    case FAILURE:
      return state.merge(
        { fetching: false
        , error: action.error
        })
    default:
      return state
  }
}
