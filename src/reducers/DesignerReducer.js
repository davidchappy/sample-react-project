import * as types from '../actions/actionTypes'
import { removeByValue } from '../utils/arrayUtils'

const initialState = {
  currentFunction: null,
  top: null,
  bottom: null,
  loading: false
}

export function getCurrentPatternId(state, uniformType) {
  return state[uniformType].patternId
}

export function getCurrentStyleId(state, uniformType) {
  return state[uniformType].styleId
}

export function getSavedState(state, order) {
  if (state.top && state.bottom) {
    const { top, bottom } = state
    
    return { top, bottom, order }
  }
}


function getDecorationIds(decorations) {
  return decorations.map(d => d.id)
}


export default function DesignerReducer(state = initialState, action) {
  switch (action.type) {
    case types.DESIGNER_COLORS_CHANGE:
      const uniformType = action.payload.uniformType
      const segment = action.payload.segment
      return {
        ...state,
        [uniformType]: {
          ...state[uniformType],
          colors: {
            ...state[uniformType].colors,
            [segment]: action.payload.color
          }
        } 
      }
    case types.ORDER_UPDATE_COLOR:
      return {
        ...state,
        top: { 
          ...state.top,
          colors: {
            ...state.top.colors,
            [action.payload.segment]: action.payload.color
          }
        },
        bottom: { 
          ...state.bottom,
          colors: {
            ...state.bottom.colors,
            [action.payload.segment]: action.payload.color
          }
        }
      }
    case types.DESIGNER_LOAD_DESIGN:
      return {
        ...state,
        top: {
          ...action.payload.top, 
          decorations: getDecorationIds(action.payload.top.decorations) 
        },
        bottom: {
          ...action.payload.bottom, 
          decorations: getDecorationIds(action.payload.bottom.decorations) 
        }
      }
    case types.STYLES_CHOOSE_STYLE:
      return {
        ...state,
        [action.payload.style.uniformType]: {
          ...state[action.payload.style.uniformType],
          currentSvg: null,
          styleId: action.payload.style.id,
          patternId: action.payload.pattern.id
        }
      }
    case types.PATTERN_CHOOSE:
      return {
        ...state,
        [action.payload.uniformType]: {
          ...state[action.payload.uniformType],
          patternId: action.payload.pattern.id 
        }
      }
    case types.DECORATION_CREATE:
      const targetType = state[action.payload.uniformType]

      return {
        ...state,
        [action.payload.uniformType]: {
          ...targetType,
          decorations: targetType.decorations.concat([action.payload.decoration.id])
        }
      }
    case types.DECORATION_DELETE:
      const uType = state[action.payload.uniformType]
      // debugger
      return {
        ...state,
        [action.payload.uniformType]: {
          ...uType,
          decorations: removeByValue(action.payload.id, uType.decorations)
        }
      }
    case types.DESIGNER_EXECUTE:
      return {
        ...state,
        currentFunction: {
          name: action.payload.functionName,
          args: action.payload.args
        }
      }
    case types.DESIGNER_CLEAR:
      return {
        ...state,
        currentFunction: null
      }
    case types.DESIGNER_INIT:
      return {
        ...state,
        [action.payload.uniformType]: {
          ...state[action.payload.uniformType],
          ...action.payload.args
        }
      }
    case types.DESIGNER_LOAD_START:
      return {
        ...state,
        loading: true
      }
    case types.DESIGNER_LOAD_END:
      return {
        ...state,
        loading: false
      }
    // case types.SAVE_LOAD:
    //   return {
    //     ...state,
  //       top: { ...action.payload.top },
  //       bottom: { ...action.payload.bottom }
    //     }
    default:
      return {...state}
  }
}