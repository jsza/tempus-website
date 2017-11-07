export const CALL_API = Symbol('Call API')
export const GET = 'GET'
export const POST = 'POST'
export const DELETE = 'DELETE'


export default function apiMiddleware(api) {
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
          store.dispatch(a())
        }
      }
    }

    runActions(started)

    let request
    switch (method) {
      case GET:
        request = api.get(endpoint)
        break
      case POST:
        request = api.post(endpoint, data)
        break
      case DELETE:
        request = api.delete(endpoint)
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
