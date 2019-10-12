import {createAction} from 'redux-actions'


export function call(procedure, args, kwargs, actionTypes) {
  return wampCall({procedure, args, kwargs, actionTypes})
}


export function subscribe(topic, actionType) {
  return wampSubscribe({topic, actionType})
}


export function unsubscribe(topic, actionType) {
  return wampUnsubscribe({topic, actionType})
}


export const wampCall = createAction('WAMP/CALL')
export const wampSubscribe = createAction('WAMP/SUBSCRIBE')
export const wampUnsubscribe = createAction('WAMP/UNSUBSCRIBE')
