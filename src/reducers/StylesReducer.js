import * as types from '../actions/actionTypes'
import { selectById } from '../utils/arrayUtils'

const initialState = {
  all: [],
  currentSport: 'soccer'
}

export function styleById(id, styles) {
  return selectById(id, styles)
}

export function stylesBySport(styles, sport, uniformType) {
  return styles.filter(style => {
    return (
      style.sport === sport && 
      style.uniformType === uniformType
    )
  })
}

export function getSports(styles) {
  const allSports = styles.map(style => {
    return style.sport
  })
  // prevent duplicates
  return Array.from(new Set(allSports))
}

export default function StylesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SERVER_INITIAL_LOAD:
      return {
        ...state,
        all: action.payload.styles,
        currentSport: action.payload.styles[0].sport
      }
    case types.STYLES_LOAD:
      return {
        ...state,
        all: state.sports.concat(action.payload)
      }
    case types.STYLES_CHOOSE_SPORT:
      return {
        ...state,
        currentSport: action.payload
      }
    case types.STYLES_CHOOSE_STYLE:
      return {
        ...state,
        current: {
          ...state.current,
          [action.payload.style.uniformType]: action.payload.style
        }
      }
    default:
      return { ...state }
  }
}