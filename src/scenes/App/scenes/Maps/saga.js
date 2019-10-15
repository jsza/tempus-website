import createRouteFetchSaga from 'root/utils/createRouteFetchSaga'
import {loadMaps} from './actions'


export default createRouteFetchSaga(
  '/maps',
  loadMaps,
  { exact: true }
)
