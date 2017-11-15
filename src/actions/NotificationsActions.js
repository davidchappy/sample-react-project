import * as types from './actionTypes'

export function removeNotification() {
  return function(dispatch) {
    dispatch({
      type: types.NOTIFICATION_REMOVE
    })
  }
}

export function addNotification(message) {
  return function(dispatch) {
    dispatch({
      type: types.NOTIFICATION_EMIT,
      payload: message
    })
  }
}