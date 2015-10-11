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
    const {method, params, data, types} = callAPI

    function actionWith(data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[CALL_API]
      return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: requestType}))

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
        next(actionWith({
          type: failureType,
          error: 'Server unreachable'
        }))
      }
      else if (res.ok) {
        next(actionWith({
          type: successType,
          data: res.body
        }))
      } else {
        next(actionWith({
          type: failureType,
          error: res.statusText
        }))
      }
    })
  }
}
