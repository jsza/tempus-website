import Cookies from 'cookies-js'
import {take, takeEvery, put, call} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import SessionProxy from './session'
import * as actions from './actions'


function initSession(session) {
  return eventChannel(emitter => {
    function dispatch(actionType, payload) {
      return emitter({type: actionType, payload})
    }
    session.dispatch = dispatch
    session.run()
    return () => session.stop()
  })
}


export default function* rootSaga() {
  const session = new SessionProxy(Cookies.get('TEMPUS_AUTH'), null)
  const channel = yield call(initSession, session)

  function callProcedure({procedure, args, kwargs, actionTypes}) {
  }

  function subscribe(action) {
    const {topic, actionType} = action.payload
    session.wantsSubscribe(topic, actionType)
  }

  function unsubscribe(action) {
    const {topic, actionType} = action.payload
    session.wantsUnsubscribe(topic, actionType)
  }

  yield takeEvery(actions.wampCall, callProcedure)
  yield takeEvery(actions.wampSubscribe, subscribe)
  yield takeEvery(actions.wampUnsubscribe, unsubscribe)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
