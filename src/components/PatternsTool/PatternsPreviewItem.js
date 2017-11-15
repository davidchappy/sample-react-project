import React from 'react'
import './PatternsPreviewItem.css'

export const PatternsPreviewItem = props => {
  const selected = props.selected ? ' selected' : ''

  return (
    <li className={"PatternsPreviewItem" + selected}>
      <img  src={props.pattern.preview} 
            onClick={props.choosePattern} 
            data-pattern-id={props.pattern.id}
            alt="Uniform pattern preview" />
    </li>
  )
}

export default PatternsPreviewItem

