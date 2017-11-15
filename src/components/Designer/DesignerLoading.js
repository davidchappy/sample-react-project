import React, { Component } from 'react'
import Spin from 'spin'
import './DesignerLoading.css'

// Loading class specifically for the designer, 
//  though it currently draw an overlay over the entire viewport - 10-24-17
export class DesignerLoading extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update loading status before mounting
    this.setState({ loading: nextProps.loading })
  }

  componentDidMount() {
    // Use Spinner lib for loader
    const loader = this.refs.loader
    const opts = {
      color:'#fff', 
      lines: 12,
      top: '50%',
      left: '50%',
      position: 'absolute'
    }
    const spinner = new Spin(opts).spin()
    loader.appendChild(spinner.el)
  }

  render() {
    const loadingClass = this.state.loading ? ' loading' : '' 

    return (
      <div ref="loader" className={"DesignerLoading" + loadingClass}></div>
    )
  }
}

export default DesignerLoading