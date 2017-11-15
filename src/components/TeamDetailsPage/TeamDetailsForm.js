import React from 'react'
import ColorsTool from '../ColorsTool/ColorsTool'
import './TeamDetailsForm.css'

// For submitting user's team name and colors
export const TeamDetailsForm = props => {
  return (
    <div className="TeamDetailsForm" >
      <div className="team-name">
        <form onSubmit={props.submitName} className="pure-form pure-form-stacked">
          <label htmlFor="team-name">
            Team Name
            <input 
              type="text" 
              name="team-name" 
              placeholder="Enter Team Name" 
              onChange={props.updateTeamName}
              defaultValue={props.teamName} />
          </label>
        </form>
      </div>
      <div className="team-colors">
        <h4>Team Colors</h4>
        <ColorsTool selectedColorType='order' />
      </div>
    </div>
  )
}

export default TeamDetailsForm