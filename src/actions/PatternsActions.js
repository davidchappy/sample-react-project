import * as types from './actionTypes'
import { executeDesignerFunction } from './DesignerActions'

export function choosePattern(pattern, uniformType) {
  return function(dispatch) {
    dispatch(executeDesignerFunction(
      'applyPattern',
      { pattern, uniformType }
    ))

    dispatch({
      type: types.PATTERN_CHOOSE,
      payload: {
        uniformType,
        pattern
      }
    })
  }
}
