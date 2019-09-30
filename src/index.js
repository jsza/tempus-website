import 'babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import App from './scenes/App'

import '../stylus/index.styl'

const history = createHistory()
const store = configureStore(history)
function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)
if (module.hot) {
  module.hot.accept('./scenes/App/index.js', () => {
    const NextRootContainer = require('./scenes/App/index.js').default
    render(NextRootContainer)
  })
}
