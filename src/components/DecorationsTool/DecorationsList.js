import React from 'react'
import DecorationsListItem from './DecorationsListItem'
import './DecorationsList.css'

export const DecorationsList = props => {
  // Return mapped JSX for decoration items (these are used by the Slider)
  const decorationItems = props.decorations.map((decoration, i) => { 
    let selected = null
    if (props.selectedDecoration) {
      selected = props.selectedDecoration.id === decoration.id ? true : false
    }

    return <DecorationsListItem decoration={decoration} 
                                key={i}
                                image={props.imageList}
                                editDecoration={props.editDecoration}
                                deleteDecoration={props.deleteDecoration}
                                selectDecoration={props.selectDecoration}
                                selected={selected} />
  })

  const imageClass = props.imageList ? ' hasImages' : ''

  return (
    <ul className={"DecorationsList" + imageClass}>
      {decorationItems}
    </ul>
  )
}

export default DecorationsList