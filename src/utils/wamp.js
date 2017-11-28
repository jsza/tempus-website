window.AUTOBAHN_DEBUG = true
import {Connection} from 'autobahn'

import {REALM, WEBSOCKET_PORT} from './loginData'



const protocol = (window.location.protocol === 'https:' ? 'wss' : 'ws')
const url = `${protocol}://${window.location.hostname}:${WEBSOCKET_PORT}/`


export class SessionProxy {
  constructor(ticket) {
    this.ticket = ticket
    this.session = null
    this.running = false
  }

  sessionAvailable() {
    this.call('xyz.tempus.jump.serverstatus.list')
  }

  wantsSubscription(topic, callback) {
    this._wantedSubscriptions.push(
      { topic
      , callback
      })
  }


  wantsCall(procedure, callback, args, kwargs) {
    this._wantedCalls.push(
      { procedure
      , callback
      , args
      , kwargs
      })
  }

  call(procedure, args, kwargs, options) {
    return this.session.call(procedure, args, kwargs, options)
  }

  register(procedure, endpoint, options) {
    return this.session.register(procedure, endpoint, options)
  }

  publish(topic, args, kwargs, options) {
    return this.session.publish(topic, args, kwargs, options)
  }

  subscribe(topic, handler, options) {
    return this.session.subscribe(topic, handler, options)
  }

  run() {
    function onchallenge(session, method, extra) {
      if (method === 'ticket') {
        return this.ticket
      }
      else {
        throw `don\'t know how to authenticate using \'${method}\'`
      }
    }

    this.connection = new Connection({
      url: url,
      realm: REALM,
      authmethods: [this.ticket ? 'ticket' : 'anonymous'],
      authid: 'ignored', // new authid will be assigned on challenge success
                         // or 'anonymous' for anonymous auth
      onchallenge: onchallenge.bind(this)
      //retry_if_unreachable: true
    })

    return new Promise(function(resolve, reject) {
      function onopen(session, details) {
        console.log('WS session connected', session, details)
        this.session = session
        this.sessionAvailable()
        resolve()
      }

      function onclose(reason, details) {
        reject(details.reason)
        console.log('WS session disconnected', reason, details)
        this.session = null
        return false
      }

      this.connection.onopen = onopen.bind(this)
      this.connection.onclose = onclose.bind(this)
      return this.connection.open()
    }.bind(this))
  }

  stop() {
    if (this.connection) {
      try {
        this.connection.close()
      } catch (error) {
        if (error !== 'connection already closed') {
          console.log(error)
        }
      }
    }
  }
}
