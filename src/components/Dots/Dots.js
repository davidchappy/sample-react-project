import React from 'react'
import Dot from './Dot'
import './Dots.css'

// Class that renders the slider "dots" for tracking page location
export const Dots = props => {
  // Generate array from count prop and map to Dot components
  const dots = Array(Number(props.count)).fill().map((empty, i) => {
    return <Dot selected={props.selected === i ? true : false} key={i} />
  })

  return (
    <ul className={"Dots"} >
      {dots}
    </ul>
  )
}

export default Dots