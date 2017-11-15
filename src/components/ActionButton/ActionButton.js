import React from 'react'
import { withRouter } from 'react-router-dom'
import './ActionButton.css'

export const ActionButton = props => {
  // Call props' confirmAction and route to provided destination if any
  const handleSubmit = e => {
    e.preventDefault()
    props.confirmAction(e)

    if (props.destination) {
      props.history.push(props.destination)
    }
  }

  // Call props' cancelAction
  const handleCancel = e => {
    e.preventDefault()
    props.cancelAction(e)
  }

  // Cancel Button JSX
  const cancel = props.cancelAction 
    ? <button tabIndex="2"
              type="button" 
              className="cancel pure-button" 
              onClick={handleCancel} >
        <span className="fa fa-times-circle-o"></span>
      </button>
    : null

  return (
    <div className="ActionButton">
      <button tabIndex="1"
              className="submit pure-button" 
              data-target={props.dataProp} 
              onClick={handleSubmit}
              type={props.submitAttr ? 'submit' : null} >
              {props.text}
      </button>
      {cancel}
    </div>
  )
}

// Necessary?
// onTouchEnd={handleSubmit}
// onTouchEnd={handleCancel}

export default withRouter(ActionButton)