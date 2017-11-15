// React
import React from 'react'

// Components/Styles
import RosterItem from './RosterItem'
import ActionButton from '../ActionButton/ActionButton'
import './RosterList.css'

// Renders individual roster items (players)
export const RosterList = props => {
  const players = props.players.map((player, i) => {
    return (
      <RosterItem player={player} key={i} {...props} />
    )
  })

  return (
    <div className="RosterList">
      <ul>{players}</ul>
      <ActionButton confirmAction={props.addPlayer} 
                    text='Add Player' />
    </div>
  )
}

export default RosterList