import {all} from 'redux-saga/effects'
import createRouteFetchSaga from 'root/utils/createRouteFetchSaga'
import {loadMapOverview} from './actions'
import leaderboardSaga from './scenes/Leaderboards/saga'


const mapOverviewSaga = createRouteFetchSaga(
  '/maps/:name',
  ({name}) =>  loadMapOverview(name)
)


export default function* rootSaga() {
  yield all(
    [ mapOverviewSaga()
    , leaderboardSaga()
    ])
}
