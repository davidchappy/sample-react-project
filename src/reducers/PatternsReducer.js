import * as types from '../actions/actionTypes'
import { selectByValue, selectById } from '../utils/arrayUtils'

const initialState = {
  all: []
}

export function getPatternPreviews(patterns, type, styleId) {
  return patterns.filter(pattern => {
    if (pattern.uniformType === type && pattern.styleId === styleId) {
      return {
        id: pattern.id,
        preview: pattern.preview,
        name: pattern.name 
      }
    } else {
      return null
    }
  })
}

export function getCurrentPreview(pattern) {
  return {
    id: pattern.id,
    preview: pattern.preview,
    name: pattern.name    
  }
}

export function getPatternsByUniform(patterns, uniformType) {
  return selectByValue('uniformType', uniformType, patterns)
}

export function getPatternsByStyle(patterns, style) {
  return selectByValue('styleId', style.id, patterns)
}

export function patternById(id, patterns) {
  return selectById(id, patterns)
}

export default function LoadingReducer(state = initialState, action) {
  switch (action.type) {
    case types.SERVER_INITIAL_LOAD:
      return {
        ...state,
        all: action.payload.patterns
      }
    case types.STYLES_CHOOSE_STYLE:
      return {
        ...state,
        current: {
          ...state.current,
          [action.payload.style.uniformType]: action.payload.pattern
        }
      }
    case types.PATTERN_CHOOSE:
      return {
        ...state,
        current: {
          ...state.current,
          [action.payload.uniformType]: action.payload.pattern
        }
      }
    default:
      return {...state}
  }
}