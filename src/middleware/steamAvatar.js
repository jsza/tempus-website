import {QUEUE_AVATAR} from '../redux/avatars'
import {loadAvatars} from '../redux/avatars'


class AvatarQueue {
  constructor(callback) {
    this.queue = []
    this.callback = null
  }

  queueLoad(steamID) {
    this.queue.push(steamID)
    this.startTimeout()
  }

  clearTimeout() {
    if (this.timeout !== undefined) {
      window.clearTimeout(this.timeout)
      delete this.timeout
    }
  }

  startTimeout() {
    this.clearTimeout()
    this.timeout = window.setTimeout(this.fire.bind(this), 50)
  }

  fire() {
    this.callback(this.queue)
    this.queue = []
  }
}


export default function steamAvatarMiddleware() {
  const avatarQueue = new AvatarQueue()
  return store => next => action => {
    if (action.type !== QUEUE_AVATAR) {
      return next(action)
    }

    let result = next(action)

    avatarQueue.callback = (steamIDs) => store.dispatch(loadAvatars(steamIDs))
    avatarQueue.queueLoad(action.steamID)
    return result
  }
}
