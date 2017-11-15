// React / lib
import React, { Component } from 'react'
import SliderWrapper from '../SliderWrapper/SliderWrapper'

// Components/Styles
import { colorById } from '../../reducers/ColorsReducer'
import ColorPage from './ColorPage'
import Dots from '../Dots/Dots'
import './ColorPicker.css'

export class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedColor: props.selectedColor,
      currentPageIndex: 0,
      colorsPerPage: 14
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedColor: nextProps.selectedColor }) 
  }

  handleScroll = e => {
    const hinter = this.refs.hinter
    if (hinter) {
      hinter.style.display = 'none'
    }
  }

  // Mobile only: set color palette, called from Slider
  selectColorPage = index => {
    this.setState({ currentPageIndex: index })
  }

  // Get color from target, update state and call props function
  handleSelectColor = e => {
    e.preventDefault()
    const colorId = e.target.getAttribute('data-color-id')
    const color = colorById(colorId)

    this.setState({ selectedColor: color }) 
    this.props.selectColor(color)  
  }

  // Generate sets of colors with 14 each (2-level array)
  makeColorSets = colors => {
    const colorSets = []
    for (let i=0, j=0; i < colors.length; i++) {
      if (!colorSets[j]) { 
        colorSets[j] = [] 
      } 
      colorSets[j].push(colors[i])
        
      if ((i+1) % this.state.colorsPerPage === 0) {
        j++
      }     
    }
    return colorSets
  }
  
  render() {
    // Generate color sets and map to ColorPage components for slider pages
    const colorSets = this.makeColorSets(this.props.colorOptions)
    const colorPages = colorSets.map((item, i)  => {
      return <ColorPage selectedColor={this.state.selectedColor}
                        selectColor={this.handleSelectColor} 
                        colors={item}
                        key={i} />
    })

    const itemHeight = window.matchMedia("(min-width: 768px)").matches
      ? `calc(${100 / colorPages.length}%)`
      : null

    const wrapperStyle = { 
      width: 100/colorSets.length + "%",
      height: itemHeight
    }

    const scrollHinter = colorSets.length > 2 
      ? <div ref="hinter" className="scroll-hinter">
          <span>Scroll For More Colors</span>
        </div>
      : null

    return (
      <div className="ColorPicker" onScroll={this.handleScroll} >
        <SliderWrapper  itemCount={colorPages.length}
                        indexCallback={this.selectColorPage}
                        itemStyles={wrapperStyle} >
          {colorPages}
        </SliderWrapper>
        {scrollHinter}
        <Dots count={colorPages.length} 
              selected={this.state.currentPageIndex} />
      </div>
    )
  }
}

export default ColorPicker
