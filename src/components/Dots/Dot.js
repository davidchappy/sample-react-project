import React from 'react'
import './Dot.css'

export const Dot = props => {
  const selectedClass = props.selected ? ' selected' : ''
  return (
    <li className={"Dot" + selectedClass}></li>
  )
}

export default Dot