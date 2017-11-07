import Immutable from 'immutable'


const data = document.getElementById('login-data').dataset


export const USERNAME = data.username
export const PLAYERNAME = data.playername
export const STEAMID = data.steamid
export const PERMISSIONS = Immutable.List(JSON.parse(data.permissions))
export const REALM = data.realm
export const DEPLOYMENT = data.deployment
export const DEPLOYMENT_TYPE = data.deployment_type
export const WEBSOCKET_PORT = parseInt(data.websocket_port)
