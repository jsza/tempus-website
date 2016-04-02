import 'babel-core/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Route, IndexRoute} from 'react-router'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import APIUtils from './utils/APIUtils'

import App from './containers/App'
import OverviewApp from './containers/OverviewApp'
import MapsApp from './containers/MapsApp'
import MapOverviewApp from './containers/MapOverviewApp'
import PlayerOverviewApp from './containers/PlayerOverviewApp'


class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <div style={{textAlign: 'center'}}>
          <img src="http://i.imgur.com/BCCVLXx.png" />
        </div>
      </div>
    )
  }
}


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={OverviewApp} />
    <Route path="activity" component={OverviewApp} />
    <Route path="maps" component={MapsApp} />
    <Route path="maps/:name" component={MapOverviewApp} />
    <Route path="players/:id" component={PlayerOverviewApp} />
    <Route path="ranks/overall" component={NotFound} />
    <Route path="ranks/class/3" component={NotFound} />
    <Route path="ranks/class/4" component={NotFound} />
    <Route path="*" component={NotFound} />
  </Route>
)


class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
          {this.props.routes}
        </ReduxRouter>
      </Provider>
    )
  }
}


function main() {
  const api = new APIUtils()
  const store = configureStore(api)
  ReactDOM.render(
    <Root store={store} routes={routes} />,
    document.getElementById('app')
  )
}
main()

