import {LOCATION_CHANGE} from 'react-router-redux'
import {take} from 'redux-saga/effects'


export default function* rootSaga() {
  return
  while (true) {
    const action = yield take(LOCATION_CHANGE)
    console.log(action)
  }
}
