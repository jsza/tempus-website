import superagent from 'superagent'


export const CALL_API = Symbol('Call API')
export const GET = 'GET'
export const POST = 'POST'
export const DELETE = 'DELETE'

const BASE_URL = '/api/'


export function logError(error) {
    console.error('%o', error.original)
}


function request(method, endpoint) {
  const url = BASE_URL + endpoint
  return superagent(method, url)
    .accept('json')
    .on('error', logError)
}


function _get(endpoint, data) {
  return request(GET, endpoint)
}


function _post(endpoint, data) {
  return request(POST, endpoint).send(data)
}


function _delete(endpoint) {
  return request(DELETE, endpoint)
}


export default function apiMiddleware() {
  return store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
      return next(action)
    }

    let {endpoint} = callAPI
    const {method, params, data} = callAPI

    function actionWith(data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[CALL_API]
      return finalAction
    }

    const {started, success, failure} = callAPI

    function runActions(actions, extra) {
      for (let a of actions) {
        if (typeof a === 'string') {
          const thing = Object.assign({}, extra, {type: a})
          next(actionWith(thing))
        }
        else {
          store.dispatch(a(extra))
        }
      }
    }

    runActions(started)

    let request
    switch (method) {
      case GET:
        request = _get(endpoint)
        break
      case POST:
        request = _post(endpoint, data)
        break
      case DELETE:
        request = _delete(endpoint)
        break
    }
    if (params) {
      request.query(params)
    }

    return request.end((err, res) => {
      if (res === undefined) {
        runActions(failure, {error: 'Server unreachable'})
      }
      else if (res.ok) {
        runActions(success, {data: res.body})
      } else {
        let error
        if (res.header['content-type'] === 'application/json' && res.body) {
          error = res.body.error
        }
        else {
          error = res.status + ' ' + res.statusText
        }
        runActions(failure, {error})
      }
    })
  }
}
