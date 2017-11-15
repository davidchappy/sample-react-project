// React/lib
import React, { Component } from 'react'
import SliderWrapper from '../SliderWrapper/SliderWrapper'

// Components/styles
import ChooserItem from './ChooserItem'
import './Chooser.css'

export class Chooser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentSlideIndex: 0
    }
  }

  // Find target attribute (index value) and hand to props chooseItem
  handleChooseItem = e => {
    e.preventDefault()
    const index = e.target.getAttribute('data-target')
    this.props.chooseItem(this.props.items[Number(index-1)])
  }

  updateCurrentSlideIndex = index => {
    this.setState({ currentSlideIndex: index })
  }

  render() {
    const wrapperStyle = { 
      width: 100/this.props.items.length + "%",
    }

    // JSX for props items, content for the slider
    const items = this.props.items.map((item, i) => {
      const scale = i === this.state.currentSlideIndex ? true : false

      return (
        <ChooserItem
          key={i}
          itemNo={i+1}
          {...item} 
          chooseItem={this.handleChooseItem}
          buttonDestination={this.props.buttonDestination}
          scale={scale}
        />
      )
    })

    return (
      <SliderWrapper  itemCount={this.props.items.length}
                      shrinkValue={0.85}
                      classNames="Chooser"
                      indexCallback={this.updateCurrentSlideIndex}
                      itemStyles={wrapperStyle} >
        {items}
      </SliderWrapper>
    )
  }

}

export default Chooser

// Increments slider instance's index based on current index
// nextSlide = () => {
//   const sliderIndex = this.state.slider.index

//   if (sliderIndex < (this.state.slider.itemCount-1)) {
//     const newIndex = this.state.slider.index + 1
//     this.state.slider.update(newIndex)
//   }
// }

// Decrements slider instance's index based on current index
// previousSlide = () => {
//   const sliderIndex = this.state.slider.index

//   if (sliderIndex > 0) {
//     const newIndex = this.state.slider.index - 1
//     this.state.slider.update(newIndex)
//   }
// }

// Deprecated Navigator (arrows for navigating items horizontally)
// <button className="chooser-navigator navigate-back" onClick={this.previousSlide}>
//   <span className="fa fa-arrow-left"></span>
// </button>
// <button className="chooser-navigator navigate-forward" onClick={this.nextSlide}>
//   <span className="fa fa-arrow-right"></span>
// </button>