import * as types from '../actions/actionTypes'
import { stylesBySport } from '../reducers/StylesReducer'
import { getPatternsByUniform } from '../reducers/PatternsReducer'
import { defaultColors } from '../reducers/ColorsReducer'
import { updateTeamColor } from './OrderActions'

const defaults = { 
  decorations: []
}

export function getDesign(data, storedStated) {
  return new Promise((resolve, reject) => {
    // Check if server data contains a design
    if(data.design) {
      const { top, bottom, name, price } = data.design

      resolve({ top, bottom, name, price })
    } else if(storedStated) {
      // Load from local storage
      // resolve(JSON.parse(storedState.designer))
      const parsedState = JSON.parse(storedStated)
      if (parsedState.designer && 
          parsedState.designer &&
          parsedState.designer.top &&
          parsedState.designer.bottom) {
        // Signal to leave state as is
        resolve(null) 
      } else {
        resolve(generateDefaultDesign(data))
      }
    } else { 
      resolve(generateDefaultDesign(data))
    }
  })
}

function generateDefaultDesign(data) {
  // Generate Defaults
  const { styles, patterns, order } = data
  order.colors = { ...defaultColors }

  const sport = styles[0].sport

  const top = {
    ...defaults,
    styleId: stylesBySport(styles, sport, 'top')[0].id,
    patternId: getPatternsByUniform(patterns, 'top')[0].id,
    colors: defaultColors
  }

  const bottom = {
    ...defaults,
    styleId: stylesBySport(styles, sport, 'bottom')[0].id,
    patternId: getPatternsByUniform(patterns, 'bottom')[0].id,
    colors: defaultColors
  }

  return { top, bottom, order }
}

export function changeColor(colorObject, segment, selectedColorType) {
  return function(dispatch) {
    if(selectedColorType !== 'order') {
      dispatch(executeDesignerFunction(
        'changeColor', 
        { color: colorObject.hex, segment, uniformType: selectedColorType }
      ))
    }

    if (selectedColorType === 'order') {
      dispatch(updateTeamColor(colorObject, segment))
    } else {
      dispatch({
        type: types.DESIGNER_COLORS_CHANGE,
        payload: { color: colorObject.id, segment, uniformType: selectedColorType }
      })
    }
  }
}

export function initDesigner(args, uniformType) {
  return function(dispatch) {
    dispatch({
      type: types.DESIGNER_INIT,
      payload: { args, uniformType }
    })
  }
}

export function executeDesignerFunction(functionName, args) {
  return function(dispatch) {
    dispatch(startLoadingDesign())

    dispatch({
      type: types.DESIGNER_EXECUTE,
      payload: { functionName, args }
    })
  }
}

export function clearDesignerFunction() {
  return function(dispatch) {
    dispatch({
      type: types.DESIGNER_CLEAR
    })
  }
}

export function startLoadingDesign() {
  return function(dispatch) {
    dispatch({
      type: types.DESIGNER_LOAD_START
    })
  }
}

export function stopLoadingDesign() {
  return function(dispatch) {
    dispatch({
      type: types.DESIGNER_LOAD_END
    })
  }
}