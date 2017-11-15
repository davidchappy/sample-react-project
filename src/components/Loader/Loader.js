import React, { Component } from 'react'
import './Loader.css'
import Spin from 'spin'

// Loader class for global app (vs. designer Loader managed by Designer)
export class Loader extends Component {
  componentDidMount() {
    const loaderElement = this.refs.loader
    new Spin({color:'#fff', lines: 12}).spin(loaderElement)
  }

  render() {
    return (
      <div ref="loader" id="Loader" className="Loader"></div>
    )
  }
}

export default Loader