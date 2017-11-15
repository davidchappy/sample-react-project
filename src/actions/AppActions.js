import * as types from './actionTypes'
import { getServerData, sendState } from './ServerActions'
import { getDesign } from './DesignerActions'

export function startApp(storedStated = null) {
  // 1. Get server data 
  // 2. Manage app loading status
  // 3. Update store with initial server data

  return function(dispatch) {
    dispatch(startLoadingApp())

    return getServerData()
      .then(data => {
        dispatch({
          type: types.SERVER_INITIAL_LOAD,
          payload: data
        })

        getDesign(data, storedStated)
          .then(designData => {
            if (designData) {
              dispatch({
                type: types.DESIGNER_LOAD_DESIGN,
                payload: designData
              })
            }
            dispatch(endLoadingApp())
          })
      })
      .catch(reason => {
        console.error("Loading error: ", reason)
        dispatch(loadingError(reason))
      })
  }
}

export function toggleSaveForLater() {
  return function(dispatch) {
    dispatch({
      type: types.SAVE_TOGGLE
    })
  }
}

export function saveForLater(savedState) {
  return function(dispatch) {
    // Save design name in app state
    dispatch({
      type: types.SAVE_COMMIT,
      payload: savedState.app.designName
    })
  
    // Save state to server via AJAX
    // On success, return a UI message
    //   error handling here?
    sendState(savedState)
      .then(response => {
        console.log("Server message: ", response.message)
        dispatch({
          type: types.NOTIFICATION_EMIT,
          payload: response 
        })
      })
  }
}

export function saveState(appState) {
  // debugger
  try {
    window.localStorage.setItem('appState', JSON.stringify(appState))

  } catch (err) {
    console.error("error: ", err)
  }
}

export function loadState() {
  try {
    const serializedState = JSON.parse(window.localStorage.getItem('appState'))

    if( serializedState === null || 
        serializedState.designer.top === null ||
        serializedState.designer.bottom === null) { 
      return {} 
    }
    return serializedState
  } catch (err) {
    console.error("error: ", err)
    return undefined
  }
}

export function loadSavedDesign(stateJSON) {
  const state = JSON.parse(stateJSON)

  // Apply saved state to app
  return function(dispatch) {
    dispatch({
      type: types.SAVE_LOAD,
      payload: state
    })
  }
}

export function startLoadingApp() {
  return {
    type: types.LOAD_START
  }
}

export function endLoadingApp() {
  return {
    type: types.LOAD_END
  }
}

export function loadingError(response) {
  return {
    type: types.LOAD_ERROR,
    payload: response
  }
}

export function updateStep(stepNo) {
  return function(dispatch) {
    dispatch({
      type: types.STEP_UPDATE,
      payload: stepNo
    })
  }
}
