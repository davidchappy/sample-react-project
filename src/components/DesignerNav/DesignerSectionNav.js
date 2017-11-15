import React from 'react'
import { Link } from 'react-router-dom'
import './DesignerSectionNav.css'

// Appears only on desktop views
const DesignerSectionNav = props => {
  const selectedClass = sectionName => {
    if (sectionName === props.uniformType) {
      return 'selected'
    } else {
      return ''
    }
  }

  return (   
    <div className="DesignerSectionNav">
      <h3>Design Section</h3>
      <div className="section-nav-buttons">
        <Link to='/design-top'>
          <button className={selectedClass('top')}>Top</button>
        </Link>
        <Link to='/design-bottom'>
          <button className={selectedClass('bottom')}>Bottom</button>
        </Link>
      </div>
    </div>
  )
}

export default DesignerSectionNav