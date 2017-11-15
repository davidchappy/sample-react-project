import * as types from '../actions/actionTypes'

const initialState = {
  currentNotification: null
}

export default function NotificationsReducer(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATION_REMOVE:
      return {
        ...state,
        currentNotification: null
      }
    case types.NOTIFICATION_EMIT:
      return {
        ...state,
        currentNotification: { ...action.payload }
      }
    default:
      return {...state}
  }
}