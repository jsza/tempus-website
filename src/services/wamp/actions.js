import {createAction} from 'redux-actions'


export function call(procedure, args, kwargs, actionTypes) {
  return WAMP_CALL({procedure, args, kwargs, actionTypes})
}


export function subscribe(topic, actionType) {
  return WAMP_SUBSCRIBE({topic, actionType})
}


export function unsubscribe(topic, actionType) {
  return WAMP_UNSUBSCRIBE({topic, actionType})
}


export const WAMP_CALL = createAction('WAMP/CALL')
export const WAMP_SUBSCRIBE = createAction('WAMP/SUBSCRIBE')
export const WAMP_UNSUBSCRIBE = createAction('WAMP/UNSUBSCRIBE')
