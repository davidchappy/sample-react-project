// React
import React, { Component } from 'react'

// Components/Styles
import DecorationsList from './DecorationsList'
import SliderWrapper from '../SliderWrapper/SliderWrapper'
import Dots from '../Dots/Dots'
import './DecorationsPreviewer.css'

export class DecorationsPreviewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPageIndex: 0
    }
  }

  selectDecorationPage = index => {
    this.setState({ currentPageIndex: index })
  }

  // Generate sets of decorations with 2 or 4 each (2-level array)
  makeDecorationSets = (decorations, countPerPage) => {
    const decorationSets = []
    for (let i=0, j=0; i < decorations.length; i++) {
      if (!decorationSets[j]) { 
        decorationSets[j] = [] 
      } 
      decorationSets[j].push(decorations[i])
        
      if ((i+1) % countPerPage === 0) {
        j++
      }     
    }
    return decorationSets
  }

  render() {
    // Slider needs to know how many items exist per page;
    //  images = 4, text/numbers = 2
    const countPerPage = this.props.images ? 4 : 2

    // Generate decoration sets and 
    //  map to DecorationsList components for slider pages
    const decorationSets = this.makeDecorationSets(
      this.props.decorations, countPerPage
    )
    const decorationLists = decorationSets.map((decorationsArray, i) => {
      const imageList = decorationsArray[0].type === 'image' ? true : false

      return (
        <DecorationsList
          key={i}
          decorations={decorationsArray}
          selectedDecoration={this.props.selectedDecoration}
          imageList={imageList}
          editDecoration={this.props.editDecoration}
          deleteDecoration={this.props.deleteDecoration}
          selectDecoration={this.props.selectDecoration}
        />
      )
    })

    const wrapperStyle = { 
      width: 100/decorationSets.length + "%"
    }

    return (
      <div className="DecorationsPreviewer">
        <SliderWrapper  itemCount={decorationLists.length}
                        indexCallback={this.selectDecorationPage}
                        itemStyles={wrapperStyle}>
          {decorationLists}
        </SliderWrapper>
        <Dots count={decorationLists.length} 
              selected={this.state.currentPageIndex} />
      </div>
    )
  }

}

export default DecorationsPreviewer