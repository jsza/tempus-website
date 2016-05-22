import superagent from 'superagent'


const GET = 'GET'
const POST = 'POST'
const DELETE = 'DELETE'

const BASE_URL = 'http://localhost:24380/jump/'


export function logError(error) {
    console.error('%o', error.original)
}


export default class APIUtils {
  request(method, endpoint) {
    const url = BASE_URL + endpoint
    return superagent(method, url)
      .accept('json')
      // .set('Authorization', 'Ticket ' + this.ticket)
      .on('error', logError)
  }

  get(endpoint, data) {
    return this.request(GET, endpoint)
  }

  post(endpoint, data) {
    return this.request(POST, endpoint)
      .send(data)
  }

  delete(endpoint) {
    return this.request(DELETE, endpoint)
  }
}
