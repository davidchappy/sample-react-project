// React
import React from 'react'
import { Link } from 'react-router-dom'

// Components/Styles
import Color from '../ColorPicker/Color'
import './TeamDetailsDisplay.css'

// Component for displaying the current user's team details: name and colors
const TeamDetailsDisplay = props => {
  // Map prop team colors to JSX
  const colors = props.teamColors
    ? Object.keys(props.teamColors).map((segment, i) => {
        const color = props.teamColors[segment]
        return (
          <Color  color={color} 
                  key={i} />
        )
      })
    : null

  return (
    <div className="TeamDetailsDisplay">   
      <h3>{props.teamName}</h3>
      <ul>{colors}</ul>
      <div className="edit-team-details">
        <Link to="/team-details?canReturn">Edit Team Details</Link>
      </div>
    </div>
  )
}

export default TeamDetailsDisplay
  
