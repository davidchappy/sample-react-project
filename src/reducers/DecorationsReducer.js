import * as types from '../actions/actionTypes'
import { 
  findIndexByAttr, 
  mergeArrays,
  removeById, 
  selectById, 
  selectByValue 
} from '../utils/arrayUtils'

// decoration signature:
// {
//   id: 0,
//   designId: 0,
//   uniformType: 'top',
//   type: 'text',
//   textType: 'Team Name',
//   location: null,
//   content: 'Net Rippers',
//   fontWeight: '700',
//   fontSize: 16,
//   fillColor: 'ff0000',
//   font: 'Serif',
//   coords: {}
// }

// All Decorations stored here (under 'all' property)
//   decorations referenced by id in designs

const initialState = {
  selected: {
    top: null,
    bottom: null
  },
  all: []
}

export function decorationById(id, decorations) {
  return selectById(id, decorations)
}

export function getDecorationsByUniform(decorations, uniformType) {
  return selectByValue('uniformType', uniformType, decorations)
}

export function decorationsByType(decorations) {
  const texts = selectByValue('type', 'text', decorations)
  const numbers = selectByValue('type', 'number', decorations)
  const images = selectByValue('type', 'image', decorations)

  return { text: texts, number: numbers, image: images }
}

function updateDecoration(decorations, updatedData) {
  const index = findIndexByAttr(decorations, 'id', Number(updatedData.id))
  decorations[index] = updatedData
  return decorations
}

function updateDecorationCoords(state, payload) {
  return state.all.map(
    (decoration, i) => (
      decoration.id === payload.id 
        ? {...decoration, coords: payload.coords}
        : decoration
    )
  )
}

function combineDecorations(design, decorations) {
  const topDecs = design.top.decorations
  const bottomDecs = design.bottom.decorations
  return mergeArrays([decorations, topDecs, bottomDecs])
}

export default function DecorationsReducer(state = initialState, action) {
  switch (action.type) {
    case types.DESIGNER_LOAD_DESIGN:
      return {
        ...state,
        all: combineDecorations(action.payload, state.all)
      }
    case types.DECORATION_MOVE:
      return {
        ...state,
        all: updateDecorationCoords(state, action.payload)
      }
    case types.DECORATION_CREATE: 
      return {
        ...state,
        all: state.all.concat([action.payload.decoration])
      }
    case types.DECORATION_SELECT:
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.payload.uniformType]: selectById(
            action.payload.id, state.all
          )
        }
      }
    case types.DECORATION_UPDATE:
      return {
        ...state,
        all: updateDecoration([...state.all], action.payload)
      }
    case types.DECORATION_DELETE:
      return {
        ...state,
        all: removeById(action.payload.id, state.all)
      }
    default:
      return {...state}
  }
}