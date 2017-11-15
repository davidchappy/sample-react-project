import * as types from '../actions/actionTypes'

const initialState = {
  error: null,
  loading: false,
  loaded: false,
  stepCount: 7,
  currentStep: 0,
  saving: false
}

export function localStorageState(state) {
  const appState = { 
    ...state,
    app: {
      ...state.app,
      saving: false
    }
  }  

  return { ...appState }
}

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_COMMIT:
      return {
        ...state,
        designName: action.payload
      }
    case types.SAVE_TOGGLE:
      return {
        ...state,
        saving: !state.saving
      }
    case types.STEP_UPDATE:
      return {
        ...state,
        currentStep: action.payload
      }
    case types.LOAD_START:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case types.LOAD_END:
      return {
        ...state,
        loading: false,
        loaded: true
      }
    case types.LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.data
      }
    default:
      return { ...state }
  }
}