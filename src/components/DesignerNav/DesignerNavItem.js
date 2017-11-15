import React from 'react'
import './DesignerNavItem.css'

const DesignerNavItem = props => {
  return (
    <li 
      className={"DesignerNavItem" + props.classes} 
      data-index={props.navIndex} 
      onClick={props.navSelect} >
      {props.text}
    </li>
  )
}

export default DesignerNavItem