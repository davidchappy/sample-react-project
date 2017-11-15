import React from 'react'
import './MobileNavItem.css'
import { Link } from 'react-router-dom'

// Renders the nav buttons in the mobile footer
export const MobileNavItem = props => (
  <div className={"MobileNavItem"}>
    <Link to={props.link} className={"mobile-button " + props.navClass}>
      <p className="desc">{props.direction}</p>
      <p className="title">{props.title}</p>
    </Link>
  </div>
)

export default MobileNavItem