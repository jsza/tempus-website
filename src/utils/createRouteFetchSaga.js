import {LOCATION_CHANGE} from 'connected-react-router'
import {put, takeEvery} from 'redux-saga/effects'
import {matchPath} from 'react-router'


export default function createRouteFetchSaga(path, actionCreator, matchOptions=null) {
  function* _onLocationChange(state, action) {
    const {oldMatch} = state

    const {pathname} = action.payload.location
    const match = matchPath(pathname, {path, ...matchOptions})
    state.oldMatch = match

    if (
      match
      && (!oldMatch
      || JSON.stringify(match.params) !== JSON.stringify(oldMatch.params))) {
        yield put(actionCreator(match.params))
      }
  }

  function* _saga() {
    const state = {oldMatch: null}
    yield takeEvery(LOCATION_CHANGE, _onLocationChange, state)
  }

  return _saga
}
