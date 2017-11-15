// React / utils / actions
import React from 'react'
import ActionButton from '../ActionButton/ActionButton'
import { capFirst } from '../../utils/stringUtils'

// Styles
import './ChooserItem.css'

export const ChooserItem = props => {
  // Some Chooser items have top text (ex: pricing)
  const topText = props.topText 
    ? <h3 className="chooser-item-top-text">{props.topText}</h3> 
    : null 

  const itemStyle = props.scale
    ? { transform: 'scale3D(1.03, 1.03, 1.03)' }
    : null

  return (
    <div className="ChooserItem" id={"slide" + props.itemNo} style={itemStyle}>
      <div className="item-top">
        {topText}
        <img src={props.preview} alt="Item preview" />
      </div>
      <div className="item-bottom">
        <h1>{capFirst(props.title)}</h1>
        {props.bodyContent}
        <ActionButton 
          text={props.buttonText} 
          dataProp={props.itemNo} 
          confirmAction={props.chooseItem} 
          destination={props.buttonDestination}
        />
      </div>
    </div>
  )
}

export default ChooserItem