import React from 'react'
import { capFirst } from '../../utils/stringUtils'
import './DesignerToolNav.css'

// Component used by Decorations (types) and Colors Tools (segments)
export const DesignerToolNav = props => {
  const navItems = props.navItems.map((text, i) => {
    const selectedClass = i === props.currentPageIndex ? ' selected' : '' 
    return  <li key={i}
                data-page-index={i} 
                onClick={props.selectNav}
                className={selectedClass}>
                {capFirst(text)}
            </li>
  })

  return (
    <ul className="DesignerToolNav">{navItems}</ul>
  )
}

export default DesignerToolNav

