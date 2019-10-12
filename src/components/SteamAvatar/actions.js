import {CALL_API, GET} from 'root/services/api/middleware'


export const QUEUE_AVATAR = 'AVATARS_QUEUE_ONE'
export const REQUEST = 'AVATARS_REQUEST'
export const SUCCESS = 'AVATARS_SUCCESS'
export const FAILURE = 'AVATARS_FAILURE'


export function loadAvatars(steamids) {
  return (
    { [CALL_API]:
      { method: GET
      , started: [REQUEST]
      , success: [SUCCESS]
      , failure: [FAILURE]
      , endpoint: 'steamavatars'
      , params: {steamids: steamids.join(',')}
    }
  })
}


export function queueAvatar(steamID) {
  return (
    { type: QUEUE_AVATAR
    , steamID: steamID
    })
}
