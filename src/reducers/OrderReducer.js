import * as types from '../actions/actionTypes'
import { updateById, removeById } from '../utils/arrayUtils'
import { defaultColors } from './ColorsReducer'

const initialState = {
  colors: { ...defaultColors },
  teamName: 'My Team',
  players: [],
  id: null
}

function updatePlayer(state, updatedPlayer) {
  return updateById(updatedPlayer, state)
}

function deletePlayerById(id, state) {
  return removeById(id, state)
}

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case types.ORDER_UPDATE_NAME:
      return {
        ...state,
        teamName: action.payload
      }    
    case types.ORDER_UPDATE_COLOR:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.segment]: action.payload.color
        }
      }    
    case types.ORDER_PLAYER_CREATE:
      return {
        ...state,
        players: state.players.concat([action.payload])
      }
    case types.ORDER_PLAYER_UPDATE:
      return {
        ...state,
        players: updatePlayer(state.players, action.payload)
      }
    case types.ORDER_PLAYER_DELETE:
      return {
        ...state,
        players: deletePlayerById(action.payload, state.players)
      }
    // case types.SAVE_LOAD:
    //   return {
    //     ...state,
    //     ...action.payload.order
    //   }
    case types.SERVER_INITIAL_LOAD:
      return {
        ...state,
        ...action.payload.order,
        id: action.payload.design ? action.payload.design.id : null,
        colors: { ...defaultColors }
      }
    default:
      return {...state}
  }
}