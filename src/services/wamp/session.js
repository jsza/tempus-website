import {Connection} from 'autobahn'
import Immutable from 'immutable'

import {REALM, WEBSOCKET_PORT} from 'root/utils/loginData'


const protocol = (window.location.protocol === 'https:' ? 'wss' : 'ws')
const url = `${protocol}://${window.location.hostname}:${WEBSOCKET_PORT}/`


export default class SessionProxy {
  constructor(ticket, dispatch) {
    this.ticket = ticket
    this.dispatch = dispatch
    this.session = null
    this.running = false
    this.wantsSubs = Immutable.Map()
    this.actionSubscriptions = {}
  }

  sessionAvailable() {
    this.wantsSubs.forEach((topic, actionType) => {
      this._subForDispatch(topic, actionType)
    })
  }

  _subForDispatch(topic, actionType) {
    return this.subscribe(topic, (args, kwargs) => {
      this.dispatch(actionType, {args, kwargs})
    }).then(
      (subscription) => {
        if (!this.wantsSubs.get(topic, actionType)) {
          this.unsubscribe(subscription)
        }
        else if (this.session) {
          console.log('subscription', subscription)
          this.actionSubscriptions[actionType] = subscription
        }
      },
      (error) => {
        console.log('Subscription failed:', error)
      }
    )
  }

  wantsSubscribe(topic, actionType, callback) {
    this.wantsSubs = this.wantsSubs.set(actionType, topic)
    if (this.session) {
      this._subForDispatch(topic, actionType)
    }
  }

  wantsUnsubscribe(topic, actionType) {
    console.log('check wants subs', topic, actionType, this.actionSubscriptions)
    if (this.wantsSubs.get(actionType)) {
      const subscription = this.actionSubscriptions[actionType]
      console.log('unsub', topic, actionType)
      if (subscription && this.session) {
        console.log('unsubbed', topic, actionType)
        this.session.unsubscribe(subscription)
        delete this.actionSubscriptions[actionType]
      }
    }
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

  unsubscribe(subscription) {
    return this.session.unsubscribe(subscription)
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
      onchallenge: onchallenge.bind(this)
      //retry_if_unreachable: true
    })

    return new Promise(function(resolve, reject) {
      function onopen(session, details) {
        console.log('WS session connected', session)
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
