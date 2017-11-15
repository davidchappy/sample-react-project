import React from 'react'
import './DecorationsListItem.css'

export const DecorationsListItem = props => {

  const handleSelectDecoration = e => {
    // e.preventDefault()
    props.selectDecoration(props.decoration.id)
  }

  const handleDeleteDecoration = e => {
    e.preventDefault()
    const id = props.decoration.id
    props.deleteDecoration(id)
  }

  const handleEditDecoration = e => {
    e.preventDefault()
    const id = props.decoration.id
    props.editDecoration(id)
  }

  // Conditional JSX for image vs text/numbers; 
  //  Images don't need edit
  let content, edit = null
  if (props.decoration.type === 'image') {
    content = <div className="decoration-content" >
                <img src={props.decoration.content} alt="Preview of decoration" />
              </div>
  } else {
    content = <div className="decoration-content">
                <span className="content">{props.decoration.content}</span>
                <span className="size muted">Size {props.decoration.size}</span>
              </div>
    edit =  <span className="edit-decoration fa fa-pencil-square-o" 
                  onClick={handleEditDecoration}>
            </span>
  }

  const selectedClass = props.selected ? ' selected' : ''
  const imageClass = props.image ? ' image' : ''

  return (
    <li className={"DecorationsListItem" + imageClass + selectedClass} 
        onClick={handleSelectDecoration}>
      {content}
      {edit}
      <span className="delete-decoration fa fa-trash-o" 
            onClick={handleDeleteDecoration}></span>
    </li>
  )
}

export default DecorationsListItem