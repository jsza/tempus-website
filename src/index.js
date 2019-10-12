import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import {createBrowserHistory} from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { AppContainer } from 'react-hot-loader'
import App from './scenes/App'
import {FormProvider} from 'react-advanced-form'

import '../stylus/index.styl'

const history = createBrowserHistory()
const store = configureStore(history)
function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <FormProvider>
          <ConnectedRouter history={history}>
            <Component />
          </ConnectedRouter>
        </FormProvider>
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
