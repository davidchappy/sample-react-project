import * as types from './actionTypes'
import { executeDesignerFunction } from './DesignerActions'

export function createDecoration(decoration, uniformType) {
  return function(dispatch) {
    dispatch(executeDesignerFunction(
      'createDecoration',
      { decoration }
    ))

    dispatch({
      type: types.DECORATION_CREATE,
      payload: { decoration, uniformType }
    })
  }
}

export function selectDecoration(id, uniformType) {
  return function(dispatch) {
    dispatch({
      type: types.DECORATION_SELECT,
      payload: { id, uniformType }
    })
  }
}

export function editDecoration(decoration) {
  return function(dispatch) {
    dispatch(executeDesignerFunction(
      'editDecoration',
      { decoration }
    ))

    dispatch({
      type: types.DECORATION_UPDATE,
      payload: decoration
    })
  }
}

export function deleteDecoration(id, uniformType) {
  return function(dispatch) {
    dispatch(executeDesignerFunction(
      'deleteDecoration',
      { id }
    ))

    dispatch({
      type:types.DECORATION_DELETE,
      payload: { id, uniformType }
    })
  }
}

export function moveDecoration(id, coords, uniformType) {
  console.log("report move: ", id, coords, uniformType)
  return function(dispatch) {
    dispatch({
      type: types.DECORATION_MOVE,
      payload: { id, coords, uniformType }
    })
  }
}