import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reduceReducers from 'reduce-reducers'

// Individual Reducers
import app from './AppReducer'
import colors from './ColorsReducer'
import decorations from './DecorationsReducer'
import patterns from './PatternsReducer'
import styles from './StylesReducer'
import order from './OrderReducer'
import designer from './DesignerReducer'
import notifications from './NotificationsReducer'

export default reduceReducers(
  combineReducers({
    app,
    colors,
    decorations,
    designer,
    notifications,
    patterns,
    routing: routerReducer,
    styles,
    order
  })
)
 

