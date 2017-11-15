import React from 'react'
import './RosterItem.css'

// Individual player/roster item
export const RosterItem = props => {
  // Get player's id before calling props edit player
  const handleEditPlayer = e => {
    e.preventDefault()
    const id = props.player.id
    props.editPlayer(id)
  }

  // Get player's id before calling props delete player
  const handleDeletePlayer = e => {
    e.preventDefault()
    const id = props.player.id
    props.deletePlayer(id)
  }

  const player = props.player

  return (
    <li className="RosterItem">
      <span className="player-number">{player.number}</span> 
      <div>
        <span className="player-size">{player.size}</span>
        <span className="player-names">{player['firstName']} {player['lastName']}</span>
      </div>
      <div className="roster-item-actions">
        <span className="edit-player fa fa-pencil-square-o"
              onClick={handleEditPlayer}></span>
        <span className="delete-player fa fa-trash-o"
              onClick={handleDeletePlayer}></span>
      </div>
    </li>
  )
}

export default RosterItem