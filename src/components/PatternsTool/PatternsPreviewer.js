// React/Utilities
import React, { Component } from 'react'
import { selectById } from '../../utils/arrayUtils'

// Components/Styles
import PatternsPreviewerPage from './PatternsPreviewerPage'
import SliderWrapper from '../SliderWrapper/SliderWrapper'
import Dots from '../Dots/Dots'
import './PatternsPreviewer.css'

export class PatternsPreviewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPageIndex: 0,
      selectedPattern: props.selectedPattern,
      patternsPerPage: 3
    }
  }

  componentDidMount() {
    this.setState({ selectedPattern: this.props.selectedPattern })
  }
  
  // Use target's id to update state and app with selected pattern 
  handleChoosePattern = e => {
    e.preventDefault()
    const id = e.target.getAttribute('data-pattern-id')

    const pattern = selectById(id, this.props.patterns)
    this.setState({ selectedPattern: pattern })

    this.props.choosePattern(pattern)
  }

  selectPatternPage = index => {
    this.setState({ currentPageIndex: index })
  }

  // Generate sets of patterns with 3 each
  makePatternSets = patterns => {
    const patternSets = []
    for (let i=0, j=0; i < patterns.length; i++) {
      if (!patternSets[j]) { 
        patternSets[j] = [] 
      } 
      patternSets[j].push(patterns[i])
        
      if ((i+1) % this.state.patternsPerPage === 0) {
        j++
      }     
    }
    return patternSets
  }

  render() {
    // Generate PatternsPreviewerPage components used by the slider
    const patternSets = this.makePatternSets(this.props.patterns)
    const patternPages = patternSets.map((patternArray, i) => {
      return  <PatternsPreviewerPage
                key={i}
                patterns={patternArray}
                choosePattern={this.handleChoosePattern}
                selectedPattern={this.props.selectedPattern}
              />
    })

    const wrapperStyle = { 
      width: 100/patternSets.length + "%"
    }

    return (
      <div className="PatternsPreviewer">
        <SliderWrapper  itemCount={patternPages.length}
                        indexCallback={this.selectPatternPage}
                        itemStyles={wrapperStyle} > 
          {patternPages}
        </SliderWrapper >
        <Dots count={patternPages.length} 
              selected={this.state.currentPageIndex} />
      </div>
    )
  }

}

export default PatternsPreviewer