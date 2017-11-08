import Immutable from 'immutable'
import {CALL_API, GET, POST} from '../middleware/api'


const LOAD_REQUEST = 'EXTRA_MAPS_LOAD_REQUEST'
const LOAD_SUCCESS = 'EXTRA_MAPS_LOAD_SUCCESS'
const LOAD_FAILURE = 'EXTRA_MAPS_LOAD_FAILURE'

const ADD_REQUEST = 'EXTRA_MAPS_ADD_REQUEST'
const ADD_SUCCESS = 'EXTRA_MAPS_ADD_SUCCESS'
const ADD_FAILURE = 'EXTRA_MAPS_ADD_FAILURE'

const UPDATE_REQUEST = 'EXTRA_MAPS_UPDATE_REQUEST'
const UPDATE_SUCCESS = 'EXTRA_MAPS_UPDATE_SUCCESS'
const UPDATE_FAILURE = 'EXTRA_MAPS_UPDATE_FAILURE'

const DELETE_REQUEST = 'EXTRA_MAPS_DELETE_REQUEST'
const DELETE_SUCCESS = 'EXTRA_MAPS_DELETE_SUCCESS'
const DELETE_FAILURE = 'EXTRA_MAPS_DELETE_FAILURE'

const DISMISS_LAST_DELETE = 'EXTRA_MAPS_DISMISS_LAST_DELETE'

const LOAD_AUTHORS_REQUEST = 'EXTRA_MAPS_LOAD_AUTHORS_REQUEST'
const LOAD_AUTHORS_SUCCESS = 'EXTRA_MAPS_LOAD_AUTHORS_SUCCESS'
const LOAD_AUTHORS_FAILURE = 'EXTRA_MAPS_LOAD_AUTHORS_FAILURE'

const SEARCH_AUTHORS_REQUEST = 'EXTRA_MAPS_SEARCH_AUTHORS_REQUEST'
const SEARCH_AUTHORS_SUCCESS = 'EXTRA_MAPS_SEARCH_AUTHORS_SUCCESS'
const SEARCH_AUTHORS_FAILURE = 'EXTRA_MAPS_SEARCH_AUTHORS_FAILURE'

const ADD_AUTHOR_REQUEST = 'EXTRA_MAPS_ADD_AUTHOR_REQUEST'
const ADD_AUTHOR_SUCCESS = 'EXTRA_MAPS_ADD_AUTHOR_SUCCESS'
const ADD_AUTHOR_FAILURE = 'EXTRA_MAPS_ADD_AUTHOR_FAILURE'

const REMOVE_AUTHOR_REQUEST = 'EXTRA_MAPS_REMOVE_AUTHOR_REQUEST'
const REMOVE_AUTHOR_SUCCESS = 'EXTRA_MAPS_REMOVE_AUTHOR_SUCCESS'
const REMOVE_AUTHOR_FAILURE = 'EXTRA_MAPS_REMOVE_AUTHOR_FAILURE'


const AuthorState = Immutable.Record(
  { fetching: false
  , error: null
  , data: null
  , searching: false
  , searchingError: null
  , searchData: null
  })


const LastDelete = Immutable.Record(
  { id: null
  , name: null
  , soldier_tier: null
  , demoman_tier: null
  })


const ExtraMap = Immutable.Record(
  { id: null
  , name: null
  , soldier_tier: 0
  , demoman_tier: 0
  , author_count: 0
  , author_name: null
  , author_id: null
  })


const initialState = Immutable.Record(
  { fetching: false
  , fetchingError: null
  , data: null
  , adding: false
  , addingError: null
  , updating: false
  , updatingError: null
  , deleting: false
  , deletingError: null
  , lastDelete: null
  , authors: new AuthorState()
  })


export default function reducer(state=new initialState(), action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return state.merge(new initialState())
    case LOAD_SUCCESS:
      let data = Immutable.OrderedMap()
      action.data.forEach((item) => {
        data = data.set(item.id, new ExtraMap(item))
      })
      return state.merge(
        { fetching: false
        , data: data
        })
    case LOAD_FAILURE:
      return state.merge(
        { fetching: false
        , fetchingError: action.error
        })
    case ADD_REQUEST:
      return state.merge(
        { adding: true
        , addingError: null
        })
    case ADD_SUCCESS:
      return state.set('adding', false).setIn(['data', action.data.id],
        new ExtraMap(action.data))
    case ADD_FAILURE:
      return state.merge(
        { adding: false
        , addingError: action.error
        })
    case UPDATE_REQUEST:
      return state.merge(
        { updating: true
        , updatingError: null
        })
    case UPDATE_SUCCESS:
      const key =
        { 3: 'soldier_tier'
        , 4: 'demoman_tier'
        }[action.playerClass]
      return state.set('updating', false).setIn(
        ['data', action.id, key], action.tier)
    case UPDATE_FAILURE:
      return state.merge(
        { updating: false
        , updatingError: action.error
        })
    case DELETE_REQUEST:
      return state.merge(
        { deleting: true
        , deletingError: null
        })
    case DELETE_SUCCESS:
      let result = state
      const old = state.getIn(['data', action.id])
      if (old) {
        result = result.set('lastDelete', new LastDelete(
          { id: old.id
          , name: old.name
          , soldier_tier: old.soldier_tier
          , demoman_tier: old.demoman_tier
          }))
      }
      return result.set('deleting', false).removeIn(['data', action.id])
    case DELETE_FAILURE:
      return state.merge(
        { deleting: false
        , deletingError: action.error
        })
    case DISMISS_LAST_DELETE:
      return state.set('lastDelete', null)
    case LOAD_AUTHORS_REQUEST:
      return state.mergeIn(['authors'],
        { data: null
        , fetching: true
        , error: false
        })
    case LOAD_AUTHORS_SUCCESS:
      return state.mergeIn(['authors'],
        { fetching: false
        , data: new Immutable.OrderedMap(
            action.data.map((i) => [i.id, Immutable.fromJS(i)]))
        })
    case LOAD_AUTHORS_FAILURE:
      return state.mergeIn(['authors'],
        { fetching: false
        , error: action.error
        })
    case SEARCH_AUTHORS_REQUEST:
      return state.mergeIn(['authors'],
        { searchData: null
        , searching: true
        , searchingError: false
        })
    case SEARCH_AUTHORS_SUCCESS:
      return state.mergeIn(['authors'],
        { searching: false
        , searchData: new Immutable.OrderedMap(
            action.data.map((i) => [i.id, Immutable.fromJS(i)]))
        })
    case SEARCH_AUTHORS_FAILURE:
      return state.mergeIn(['authors'],
        { searching: false
        , searchingError: action.error
        })
    case ADD_AUTHOR_SUCCESS:
      return state.setIn(['authors', 'data', action.data.id],
        Immutable.fromJS(action.data))
    case REMOVE_AUTHOR_SUCCESS:
      return state.removeIn(['authors', 'data', action.extraMapAuthorID])
    // case REMOVE_AUTHOR_SUCCESS:
    // case REMOVE_AUTHOR_FAILURE:
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
      , endpoint: `extramaps/list`
      }
    })
}


export function loadExtraMaps() {
  return (dispatch, getState) => {
    const fetching = getState().extraMaps.fetching
    if (fetching) {
      return null
    }
    return dispatch(fetch())
  }
}


export function addExtraMap(name) {
  return (
    { [CALL_API]:
      { method: POST
      , started: [ADD_REQUEST]
      , success: [ADD_SUCCESS]
      , failure: [ADD_FAILURE]
      , endpoint: `extramaps/add/${name}`
      }
    , name
    })
}


export function updateExtraMap(id, playerClass, tier) {
  return (
    { [CALL_API]:
      { method: POST
      , started: [UPDATE_REQUEST]
      , success: [UPDATE_SUCCESS]
      , failure: [UPDATE_FAILURE]
      , endpoint: `extramaps/id/${id}/update/${playerClass}/${tier}`
      }
    , id
    , playerClass
    , tier
    })
}


export function deleteExtraMap(id) {
  return (
    { [CALL_API]:
      { method: POST
      , started: [DELETE_REQUEST]
      , success: [DELETE_SUCCESS]
      , failure: [DELETE_FAILURE]
      , endpoint: `extramaps/id/${id}/delete`
      }
    , id
    })
}


export function dismissLastDelete() {
  return (
    { type: DISMISS_LAST_DELETE
    })
}


function doUndoLastDelete(lastDelete) {
  const {name} = lastDelete
  const soldier = lastDelete.soldier_tier
  const demoman = lastDelete.demoman_tier
  return (
    { [CALL_API]:
      { method: POST
      , started: [ADD_REQUEST]
      , success: [ADD_SUCCESS, DISMISS_LAST_DELETE]
      , failure: [ADD_FAILURE]
      , endpoint: `extramaps/add/${name}?soldier=${soldier}&demoman=${demoman}`
      }
    , name
    })
}


export function undoLastDelete() {
  return (dispatch, getState) => {
    const {lastDelete} = getState().extraMaps
    dispatch(doUndoLastDelete(lastDelete))
  }
}


export function loadAuthors(id) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [LOAD_AUTHORS_REQUEST]
      , success: [LOAD_AUTHORS_SUCCESS]
      , failure: [LOAD_AUTHORS_FAILURE]
      , endpoint: `extramaps/id/${id}/authors/list`
      }
    , id
    })
}


export function searchAuthors(string) {
  let endpoint
  if (!string || !string.trim().length) {
    endpoint = 'authors/list'
  }
  else {
    endpoint = `authors/list?search=${string}`
  }
  return (
    { [CALL_API]:
      { method: GET
      , started: [SEARCH_AUTHORS_REQUEST]
      , success: [SEARCH_AUTHORS_SUCCESS]
      , failure: [SEARCH_AUTHORS_FAILURE]
      , endpoint: endpoint
      }
    })
}


export function addAuthor(extraMapID, author) {
  return (
    { [CALL_API]:
      { method: POST
      , started: [ADD_AUTHOR_REQUEST]
      , success: [ADD_AUTHOR_SUCCESS]
      , failure: [ADD_AUTHOR_FAILURE]
      , endpoint: `extramaps/id/${extraMapID}/authors/add/${author.id}`
      }
    })
}


export function removeAuthor(extraMapID, author) {
  const authorID = author.author_id
  return (
    { [CALL_API]:
      { method: POST
      , started: [REMOVE_AUTHOR_REQUEST]
      , success: [REMOVE_AUTHOR_SUCCESS]
      , failure: [REMOVE_AUTHOR_FAILURE]
      , endpoint: `extramaps/id/${extraMapID}/authors/remove/${authorID}`
      }
    , extraMapID
    , authorID
    , extraMapAuthorID: author.id
    })
}
