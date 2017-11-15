import React from 'react'
import Color from './Color'
import './ColorPage.css'

// This is a Slider item / page
export const ColorPage = props => {
  // Map props colors to Color components
  const colors = props.colors.map((color, i) => (
    <Color  color={color} key={i} 
            selectColor={props.selectColor} 
            selected={props.selectedColor && props.selectedColor.name === color.name} />
  ))

  return (
    <ul className="ColorPage" >
      {colors}
    </ul>
  )
}

export default ColorPage