// React
import React from 'react'

// Components/Styles
import TeamDetailsForm from './TeamDetailsForm'
import TeamDetailsDisplay from './TeamDetailsDisplay'
import './TeamDetailsPage.css'

// Lives at top level of Team Details route
export const TeamDetailsPage = props => {
  return (
    <div className="TeamDetailsPage" >
      <TeamDetailsForm {...props} />
      <TeamDetailsDisplay teamName={props.teamName}
                          teamColors={props.teamColors} />
    </div>
  )
}

export default TeamDetailsPage