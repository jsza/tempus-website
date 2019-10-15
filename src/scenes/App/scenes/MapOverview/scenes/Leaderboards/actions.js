import {CALL_API, GET, POST, DELETE} from 'root/services/api/middleware'
import {createAction} from 'redux-actions'


export const FETCH = createAction('MAP_OVERVIEW_LEADERBOARDS/FETCH')
export const RECEIVE = createAction('MAP_OVERVIEW_LEADERBOARDS/RECEIVE')
export const FETCH_ERROR = createAction('MAP_OVERVIEW_LEADERBOARDS/ERROR')

export const FETCH_MORE = createAction('MAP_OVERVIEW_LEADERBOARDS/FETCH_MORE')
export const FETCH_MORE_SUCCESS = createAction('MAP_OVERVIEW_LEADERBOARDS/FETCH_MORE_SUCCESS')
export const FETCH_MORE_ERROR = createAction('MAP_OVERVIEW_LEADERBOARDS/FETCH_MORE_ERROR')

export const TOGGLE_EXPAND = createAction('MAP_OVERVIEW_LEADERBOARDS/TOGGLE_EXPAND')
export const COLLAPSE_ALL = createAction('MAP_OVERVIEW_LEADERBOARDS/COLLAPSE_ALL')


export function fetchLeaderboard(mapName, zoneType, index) {
  return (dispatch, getState) => {
    const {fetching} = getState().app.mapOverview.leaderboards
    if (fetching) {
      return null
    }

    return dispatch(
      { [CALL_API]:
        { method: GET
        , started: [FETCH]
        , success: [RECEIVE]
        , failure: [FETCH_ERROR]
        , endpoint: `maps/name/${mapName}/zones/typeindex/${zoneType}/${index}/records/list?limit=50`
        }
        , zoneType
        , index
      }
    )
  }
}


export function fetchMore(playerClass) {
  return (dispatch, getState) => {
    const {data} = getState().app.mapOverview.leaderboards
    const zoneID = data.getIn(['zone_info', 'id'])
    const runsKey = {3: 'soldier', 4: 'demoman'}[playerClass]
    const lastRank = data.getIn(['results', runsKey]).last().get('rank')
    console.log('class', playerClass)
    return dispatch(
      { [CALL_API]:
        { method: GET
        , started: [FETCH_MORE]
        , success: [FETCH_MORE_SUCCESS]
        , failure: [FETCH_MORE_ERROR]
        , endpoint: `zones/id/${zoneID}/records/list?limit=50&start=${lastRank + 1}&sort=duration&direction=ascending`
        }
        , playerClass
      }
    )
  }
}


export function toggleExpand(playerClass, runID) {
  return TOGGLE_EXPAND({ playerClass, runID })
}


export function collapseAll(playerClass) {
  return COLLAPSE_ALL({ playerClass })
}
