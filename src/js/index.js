console.log('yes')
import 'babel-core/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import APIUtils from './utils/APIUtils'

import MapsApp from './containers/MapsApp'
import App from './containers/App'


const routes = (
  <Route path="/" component={App}>
    <Route path="maps" component={MapsApp} />
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

