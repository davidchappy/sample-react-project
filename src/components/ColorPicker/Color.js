import React from 'react'
import { capFirst } from '../../utils/stringUtils'
import './Color.css'


export const Color = props => {
  const style = { backgroundColor: "#" + props.color.hex }

  if (props.color.name === undefined) {
    // debugger
  }
  // Need different border for white
  if (props.color.hex === 'ffffff') style.border = '2px solid #eee'
  const selectedClass = props.selected ? ' selected' : ''

  return (
    <li className={"Color" + selectedClass} >
      <button className="color-button"
              title={capFirst(props.color.name)}
              style={ style } 
              onClick={props.selectColor} 
              data-color-id={props.color.id}></button>
    </li>
  )
}

export default Color