import React, { Component } from 'react'
import './DesignerTool.css'

// This tool is a wrapper for each Designer tool (colors, decorations, patterns)
export class DesignerTool extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  // Update state with header's expanded status 
  handleClickHeader = e => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const selectedClass = this.props.selected ? ' selected' : ''
    const expandedClass = this.state.expanded ? ' expanded' : ''

    return (
      <div className={"DesignerTool" + selectedClass + expandedClass}>
        <div className="tool-header" onClick={this.handleClickHeader}>
          <span className="tool-arrow"></span>
          <h4>{this.props.title}</h4>
          {this.props.headerContent}
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default DesignerTool