// React
import React from 'react'

// Components / Styles
import DesignerSectionNav from './DesignerSectionNav'
import DesignerNavItem from './DesignerNavItem'
import './DesignerNav.css'

const DesignerNav = props => {
  // Return navItems mapped to JSX
  const navTexts = ['Uniform Style', 'Pattern', 'Colors', 'Decorations']
  const navItems = navTexts.map((navText, i) => {
    let classes = i === 0 ? ' desktop' : ''
    classes += i === props.selectedToolIndex ? ' selected' : ''

    return (
      <DesignerNavItem 
        text={navText} 
        classes={classes} 
        key={i} 
        navIndex={i}
        navSelect={props.selectTool} />
    )
  })

  return (   
    <div className="DesignerNav">
      <DesignerSectionNav uniformType={props.uniformType} />
      <ul>{navItems}</ul>
    </div>
  )
}

export default DesignerNav