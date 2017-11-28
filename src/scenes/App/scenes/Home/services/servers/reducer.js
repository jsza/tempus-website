import Immutable from 'immutable'

import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE,
        FILTER_TOGGLE, UPDATE} from './actions'


const initialState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , filter: 'server'
  , filterReverse: false
  })


export default function reducer(state=new initialState(), action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return state.merge(new initialState())
    case LOAD_SUCCESS:
      return state.merge(
        { fetching: false
        , data: Immutable.fromJS(action.data).reduce(
            (map, value) => map.set(value.getIn(['server_info', 'id']), value),
            Immutable.Map()
          )
        })
    case LOAD_FAILURE:
      return state.merge(
        { fetching: false
        , error: action.error
        })
    case UPDATE:
      const [serverID, gameInfo] = action.payload.args
      console.log(serverID, gameInfo)
      return state.mergeIn(['data', serverID],
                            {game_info: Immutable.fromJS(gameInfo)})
    case FILTER_TOGGLE:
      const {filter} = action
      return state.merge(
        { filter: filter
        , filterReverse: filter === state.filter ? !state.filterReverse : false
        }
      )
    default:
      return state
  }
}
