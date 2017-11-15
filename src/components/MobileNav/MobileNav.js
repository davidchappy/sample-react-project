import React from 'react'
import MobileNavItem from './MobileNavItem'
import './MobileNav.css'

const MobileNav = props => {
  // props data for left nav item
  const leftNavItem = {
    link: props.navParams.linkURLs[0],
    title: props.navParams.titles[0],
    navClass: 'left',
    direction: 'Back'
  }

  // props data for right nav item
  const rightNavItem = {
    link: props.navParams.linkURLs[1],
    title: props.navParams.titles[1],
    navClass: 'right',
    direction: 'Next'
  }

  return (
    <div className="MobileNav">
      <MobileNavItem {...leftNavItem} />
      <MobileNavItem {...rightNavItem} />
    </div>
  )
}

export default MobileNav