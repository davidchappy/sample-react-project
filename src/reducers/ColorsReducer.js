// import * as types from '../actions/actionTypes'
import { rgbToHex } from '../utils/colorUtils'
import { selectById } from '../utils/arrayUtils'
import rawColors from './colorData'

// Generate a startup color palette
// import distinctColors from 'distinct-colors'
// export const colors = distinctColors({ count: 26 }).map(colorObject => {
//   const rgb = colorObject._rgb.splice(0, 3)
//   return rgbToHex(rgb)
// }).concat(['ffffff', '000000'])

// temporary until server assigns ids
function colorsWithIds(colors) {
  return colors.map((color, i) => {
    color.id = i+1
    return color
  })
}
const colors = colorsWithIds(rawColors)

export const defaultColors = {
  primary: 9,
  secondary: 2,
  tertiary: 1
}

export function colorByName(name, collection = colors) {
  return collection.filter(color => color.name === name)[0]
}

export function colorById(id, collection = colors) {
  return selectById(id, collection)
}

export function colorsByIds(objectWithIds, collection = colors) {
  const objectWithColors = { ...objectWithIds }
  Object.keys(objectWithIds).forEach(segment => {
    const id = objectWithIds[segment]
    objectWithColors[segment] = colorById(id, collection)
  })
  return objectWithColors
}

const initialState = {
  all: colors,
}

export default function ColorsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return {...state}
  }
}