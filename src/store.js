// Store
import { applyMiddleware, createStore, compose } from 'redux'
import reducer from './reducers'

// Routing
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

// Middleware
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"
import promise from "redux-promise-middleware"

// Actions/Selectors
import { saveState, loadState } from './actions/AppActions'
import { localStorageState } from './reducers/AppReducer'

// Gather store elements
const initialState = {}

export const history = createHistory()
const enhancers = []
const middleware = [
  promise(),
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  middleware.push(createLogger())
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

// Loading from local storage
const persistedState = loadState()

// Wrap it up and Export
const store = createStore(
  reducer, 
  persistedState,
  composedEnhancers
)

// Saving to local storage
store.subscribe(() => {
  const state = store.getState()
  saveState(localStorageState(state))
})

export default store