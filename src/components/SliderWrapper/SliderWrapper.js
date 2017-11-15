// React/lib
import React, { Component } from 'react'
import Slider from '../../lib/slider/Slider'

// Components/styles
import './SliderWrapper.css'

export class SliderWrapper extends Component {

  constructor(props) {
    super(props)

    this.state = {
      slider: undefined
    }
  }

  componentWillMount() {
    // Remove listeners before mounting
    if (this.state.slider) { this.state.slider.stopListening() }
  }

  componentWillReceiveProps = nextProps => {
    // For items whose count can change, keep slider updated
    if (this.state.slider) {
      this.state.slider.setCount(nextProps.itemCount)
    }
  }

  componentDidMount() {
    // Instantiate slider and turn on event listeners
    const slider = new Slider(
      this.refs.wrapper, 
      this.props.itemCount, 
      this.props.shrinkValue,
      this.props.indexCallback
    )
    slider.listen()
    this.setState({ slider })
  }

  render() {
    // Allows holder to be smaller so that item edges can be seen
    //  if none provided, width is 100%, ie one item is visible
    const shrinkValue = this.props.shrinkValue ? this.props.shrinkValue : 1

    const holderheight = window.matchMedia("(min-width: 768px)").matches
      ? `calc(${this.props.itemCount * 100 / 2}%)`
      : null

    const holderStyle = {
      height: holderheight, 
      width: String(this.props.itemCount * shrinkValue * 100) + "%",
      marginLeft: String((1 - shrinkValue) / 2 * 100) + "%"
    }       

    const classNames = this.props.classNames
      ? this.props.classNames
      : ''

    return (
      <div ref="wrapper" className={"SliderWrapper " + classNames}>
        <div className="holder" style={holderStyle}>
          {this.props.children.map(child => (
            <div className="slider-item-wrapper" style={this.props.itemStyles}>
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }

}

export default SliderWrapper