import createRouteFetchSaga from 'root/utils/createRouteFetchSaga'
import {fetchLeaderboard} from './actions'


export default createRouteFetchSaga(
  '/maps/:name/leaderboards/:zoneType/:zoneIndex',
  ({name, zoneType, zoneIndex}) =>  fetchLeaderboard(name, zoneType, zoneIndex)
)
