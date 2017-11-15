import * as types from './actionTypes'

export function updateTeamName(name) {
  return function(dispatch) {
    dispatch({
      type: types.ORDER_UPDATE_NAME,
      payload: name
    })
  }
}

export function updateTeamColor(color, segment) {
  return function(dispatch) {
    dispatch({
      type: types.ORDER_UPDATE_COLOR,
      payload: { color: color.id, segment }
    })
  }
}

export function createPlayer(playerData) {
  return function(dispatch) {
    dispatch({
      type: types.ORDER_PLAYER_CREATE,
      payload: playerData
    })
  }
}

export function editPlayer(playerData) {
  return function(dispatch) {
    dispatch({
      type: types.ORDER_PLAYER_UPDATE,
      payload: playerData
    })
  }
}

export function deletePlayer(id) {
  return function(dispatch) {
    dispatch({
      type: types.ORDER_PLAYER_DELETE,
      payload: id
    })
  }
}