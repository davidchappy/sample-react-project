// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/Utilities
import { 
  getPatternPreviews, 
  getCurrentPreview 
} from '../../reducers/PatternsReducer'
import { getCurrentStyleId, getCurrentPatternId } from '../../reducers/DesignerReducer'
import { patternById } from '../../reducers/PatternsReducer'
import { choosePattern } from '../../actions/PatternsActions'

// Components/Styles
import PatternsDesktop from './PatternsDesktop'
import PatternsPreviewer from './PatternsPreviewer'
import './PatternsTool.css'

// Top level component for Patterns, rendered by Designer Tools
export class PatternsTool extends Component {
  // Merge props with chosen props
  handleChoosePattern = pattern => {
    this.props.choosePattern(
      pattern,
      this.props.uniformType
    )
  }

  render() {
    return (
      <div className="PatternsTool tool" >
        <PatternsDesktop  patterns={this.props.patternPreviews}
                          selectedPattern={this.props.selectedPattern}
                          choosePattern={this.handleChoosePattern} />
        <PatternsPreviewer 
          patterns={this.props.patternPreviews}
          selectedPattern={this.props.selectedPattern}
          choosePattern={this.handleChoosePattern} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const styleId = getCurrentStyleId(state.designer, ownProps.uniformType)
  const patternPreviews = getPatternPreviews(state.patterns.all, ownProps.uniformType, styleId)

  const patternId = getCurrentPatternId(state.designer, ownProps.uniformType)
  const currentPattern = patternById(patternId, state.patterns.all)
  // debugger
  return {
    patternPreviews,
    selectedPattern: getCurrentPreview(currentPattern)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  choosePattern
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatternsTool)