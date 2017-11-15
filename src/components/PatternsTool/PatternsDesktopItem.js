import React from 'react'
import './PatternsDesktopItem.css'

export const PatternsDesktopItem = props => {
  const choosePattern = e => {
    e.preventDefault()
    props.choosePattern(props.pattern.id)
  }

  const selected = props.selected ? ' selected' : ''

  return (
    <li className={"PatternsDesktopItem" + selected}
        onClick={choosePattern} 
        data-pattern-id={props.pattern.id}
        selected={props.selected} >
      <img src={props.pattern.preview} alt="Uniform pattern preview" />
    </li>
  )
}

export default PatternsDesktopItem