import React from 'react'
import ActionButton from '../ActionButton/ActionButton'
import './BlankRoster.css'

// Displayed when there are no players added
export const BlankRoster = props => {
  return (
    <div className="BlankRoster">
      <div className="no-players-added">
        <img src="assets/tanktop.svg" alt="Tanktop icon"/>
        <h3>No Players Added Yet</h3>
      </div>
      <ActionButton text='Add Player' confirmAction={props.addPlayer}/>
    </div>
  )
}

export default BlankRoster