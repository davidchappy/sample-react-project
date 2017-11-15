// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/Utilities
import { getDecorationsByUniform } from '../../reducers/DecorationsReducer'
import { patternById } from '../../reducers/PatternsReducer'
import { colorsByIds } from '../../reducers/ColorsReducer'

// Components/Styles
import Color from '../ColorPicker/Color'
import DesignerTool from './DesignerTool'
import ColorsTool from '../ColorsTool/ColorsTool'
import PatternsTool from '../PatternsTool/PatternsTool'
import DecorationsTool from '../DecorationsTool/DecorationsTool'
import './DesignerTools.css'

export class DesignerTools extends Component {
  render() {
    // JSX for each tool's header (mobile only)
    
    // selected colors for colors tool header preview
    const selectedColors = Object.keys(this.props.selectedColors).map((segment, i) => {
      const color = this.props.selectedColors[segment]

      return <Color key={i} color={color} />
    })
    const colorHeader = <div className="colors-preview tool-preview">{selectedColors}</div>

    const decorationsHeader = 
      <div className="decorations-preview tool-preview">
        {this.props.currentDecorations.length} items added
      </div>

    const patternsHeader = 
      <div className="patterns-preview tool-preview">
        <img src={this.props.selectedPattern.preview} alt="Preview of selected pattern"/>
        {this.props.selectedPattern.name}
      </div>

    return (
      <div className="DesignerTools">
        <DesignerTool 
          title="Pattern" {...this.props} 
          headerContent={patternsHeader}
          selected={this.props.selectedToolIndex === 1} >
          <PatternsTool uniformType={this.props.uniformType} />
        </DesignerTool>
        <DesignerTool 
          title="Colors" {...this.props}
          headerContent={colorHeader}
          selected={this.props.selectedToolIndex === 2} >
          <ColorsTool selectedColorType={this.props.uniformType} />
        </DesignerTool>
        <DesignerTool 
          title="Decorations" {...this.props}
          headerContent={decorationsHeader}
          selected={this.props.selectedToolIndex === 3}>
          <DecorationsTool uniformType={this.props.uniformType}/>
        </DesignerTool>
      </div>
    )
  }

}
const mapStateToProps = (state, ownProps) => {
  const currentDesign = { ...state.designer[ownProps.uniformType] } 
  console.log("colors in designer tools: ", colorsByIds(currentDesign.colors, state.colors.all))

  return {
    selectedColors: colorsByIds(currentDesign.colors, state.colors.all),
    selectedPattern: patternById(currentDesign.patternId, state.patterns.all),
    currentDecorations: getDecorationsByUniform(state.decorations.all, ownProps.uniformType)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignerTools)