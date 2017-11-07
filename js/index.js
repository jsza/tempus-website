import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import APIUtils from './utils/APIUtils'
import { AppContainer } from 'react-hot-loader'

import {makeRoutes} from './routes'

// styles are stored separately in production
if (__DEV__)
  require('../stylus/index.styl')
  // require('bootstrap/dist/css/bootstrap.css')


class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          {this.props.routes}
        </Router>
      </Provider>
    )
  }
}


const api = new APIUtils()
const store = configureStore(api)
const history = syncHistoryWithStore(browserHistory, store)
function render(routes) {
  console.log('render')
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(makeRoutes())
if (module.hot)
  module.hot.accept('./routes', () => render(makeRoutes()))
