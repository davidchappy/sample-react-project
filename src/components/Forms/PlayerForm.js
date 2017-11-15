import React from 'react'
import ModalForm from './ModalForm'
import './PlayerForm.css'

// Provides Roster Player form data to the Modal Form component
export const PlayerForm = props => {
  const formInputs = [
    {
      name: 'number',
      labelText: 'Number',
      type: 'number',
      defaultValue: props.player.number || null,
      placeholder: 'Enter Number',
      title: 'Enter a number for this player',
      required: 'required'
    },
    {
      name: 'size',
      labelText: 'Size',
      type: 'select',
      defaultValue: props.player.size || 'Select Size',
      title: 'Choose a size for this player',
      options: ['Select Size', 'XS', 'Small', 'Medium', 'Large', 'XL']
    },    
    {
      name: 'firstName',
      labelText: 'First Name',
      type: 'text',
      required: 'required',
      title: "Enter this player's first name",
      defaultValue: props.player.firstName || null,
      placeholder: 'Enter First Name' 
    },
    {
      name: 'lastName',
      labelText: 'Last Name',
      type: 'text',
      required: 'required',
      title: "Enter this player's last name",
      defaultValue: props.player.lastName || null,
      placeholder: 'Enter Last Name' 
    },
  ]

  return (
    <ModalForm  className="PlayerForm"
                formInputs={formInputs}
                formUpdate={props.formUpdate}
                submitForm={props.submitForm}
                cancel={props.cancel}
                buttonText="Submit Player"  />
  )
}

export default PlayerForm