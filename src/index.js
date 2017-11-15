// React
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

// Redux/Store/Actions
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import store, { history } from './store'

// Global styles
import './index.css'
import 'sanitize.css'
import 'pure-css'
import 'font-awesome/css/font-awesome.css'

// Component
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
