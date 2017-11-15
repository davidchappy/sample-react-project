import React from 'react'
import PatternsPreviewItem from './PatternsPreviewItem'
import './PatternsPreviewerPage.css'

// Contains 3 Pattern items, used by the slider
export const PatternsPreviewerPage = props => {
  const patterns = props.patterns.map((pattern, i) => {
    return (
      <PatternsPreviewItem  pattern={pattern} 
                            key={i}
                            choosePattern={props.choosePattern} 
                            selected={props.selectedPattern.id === pattern.id} />
    )
  })

  return (
    <ul className="PatternsPreviewerPage" >
      {patterns}
    </ul>
  )
}

export default PatternsPreviewerPage