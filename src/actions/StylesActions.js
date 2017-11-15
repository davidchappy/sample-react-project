import * as types from './actionTypes'
import { startLoadingDesign } from './DesignerActions'

export function chooseSport(sport) {
  return function(dispatch) {
    dispatch({
      type: types.STYLES_CHOOSE_SPORT,
      payload: sport.title
    })
  }
}

export function chooseStyle(style, pattern) {
  return function(dispatch) {
    dispatch(startLoadingDesign())

    dispatch({
      type: types.STYLES_CHOOSE_STYLE,
      payload: { style, pattern }
    })
  }
}