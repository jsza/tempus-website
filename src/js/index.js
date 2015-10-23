import 'babel-core/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import APIUtils from './utils/APIUtils'

import MapsApp from './containers/MapsApp'
import MapOverviewApp from './containers/MapOverviewApp'
import App from './containers/App'


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
    <Route path="maps" component={MapsApp} />
    <Route path="maps/:name" component={MapOverviewApp} />
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

