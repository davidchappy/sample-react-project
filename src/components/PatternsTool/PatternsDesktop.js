import React from 'react'
import PatternsDesktopItem from './PatternsDesktopItem'
import './PatternsDesktop.css'

export const PatternsDesktop = props => {


  const handleChoosePattern = patternId => {
    const pattern = props.patterns.filter(pattern => {
      if (Number(patternId) === pattern.id) { 
        return pattern 
      } else {
        return null
      }
    })[0]
    console.log("pattern in handleChoosepattern", pattern)
    props.choosePattern(pattern)
  }

  const patterns = props.patterns.map((pattern, i) => {
    return (
      <PatternsDesktopItem  pattern={pattern} 
                            key={i}
                            choosePattern={handleChoosePattern} 
                            selected={props.selectedPattern.id === pattern.id} />
    )
  })

  return (
    <div className="PatternsDesktop" >
      <ul>{patterns}</ul>
    </div>
  )
}

export default PatternsDesktop