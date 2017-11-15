// React / Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { colorsByIds } from '../../reducers/ColorsReducer'
import { changeColor } from '../../actions/DesignerActions'

// Components / Styles
import ColorPicker from '../ColorPicker/ColorPicker'
import DesignerToolNav from '../DesignerTools/DesignerToolNav'
import './ColorsTool.css'

export class ColorsTool extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentSegmentIndex: 0
    }
  }

  // Get current segment from state and call props changeColor 
  handleSelectColor = colorName => {
    const segment = this.props.segments[this.state.currentSegmentIndex]
    this.props.changeColor(colorName, segment, this.props.selectedColorType)  
  }

  // Get page index from target and update state
  handleSelectSegment = e => {
    const index = Number(e.target.getAttribute('data-page-index'))
    this.setState({ currentSegmentIndex: index })
  }
  
  render() {
    const currentSegment = this.props.segments[this.state.currentSegmentIndex]

    const navNames = this.props.segments.map(segmentName => {
      if (segmentName === 'primary') return 'first'
      if (segmentName === 'secondary') return 'second'  
      if (segmentName === 'tertiary') return 'third'  
    })

    return (
      <div className="ColorsTool tool" >
        <DesignerToolNav  navItems={navNames} 
                          currentPageIndex={this.state.currentSegmentIndex} 
                          selectNav={this.handleSelectSegment} />
        <ColorPicker 
          colorOptions={this.props.colorOptions} 
          selectedColor={this.props.selectedColors[currentSegment]}
          selectColor={this.handleSelectColor} /> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const type = ownProps.selectedColorType
  const selectedColorsIds = type === 'order' 
    ? state.order.colors
    : state.designer[type].colors
    
  return {
    colorOptions: state.colors.all,
    selectedColors: colorsByIds(selectedColorsIds),
    segments: Object.keys(selectedColorsIds)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changeColor
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorsTool)