// React
import React, { Component } from 'react'
import { withRouter } from 'react-router'

// Components/Styles
import DesignerLoading from './DesignerLoading'
import DesignerNav from '../DesignerNav/DesignerNav'
import DesignerView from '../DesignerView/DesignerView'
import DesignerTools from '../DesignerTools/DesignerTools'
import './Designer.css'

export class Designer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedToolIndex: 1
    }
  }

  // Update state with selected tool (Style, Pattern, etc.)
  handleSelectTool = e => {
    const index = e.target.getAttribute('data-index')

    // For desktop only, if clicking "Uniform Style", 
    //  route to appropriate page based on current Uniform Type
    if (Number(index) === 0) {
      if (this.props.uniformType === 'top') {
        this.props.history.push('/choose-top')
      } else if (this.props.uniformType === 'bottom') {
        this.props.history.push('/choose-bottom')
      }
    }

    this.setState({ selectedToolIndex: Number(index) })
  }

  render() {
    return (
      <div className="Designer">
        <DesignerLoading loading={this.props.designerLoading} />
        <DesignerNav 
          {...this.state} 
          {...this.props}
          selectTool={this.handleSelectTool} />
        <DesignerView uniformType={this.props.uniformType} />
        <DesignerTools {...this.state} {...this.props} />
      </div>
    )
  }
}

export default withRouter(Designer)