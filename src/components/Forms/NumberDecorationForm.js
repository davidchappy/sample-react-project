import React from 'react'
import ModalForm from './ModalForm'
import './DecorationForm.css'

// Provides Number Decoration form data to the Modal Form component
export const NumberDecorationForm = props => {
  const formInputs = [
    {
      name: 'content',
      labelText: 'Number',
      type: 'number',
      defaultValue: props.decoration.content,
      placeholder: 'Enter Number' 
    },
    {
      name: 'fontSize',
      labelText: 'Size',
      type: 'select',
      defaultValue: props.decoration.fontSize || '40',
      options: ['50', '40', '30', '20']
    },
    {
      name: 'fontFamily',
      labelText: 'Font',
      type: 'select',
      defaultValue: props.decoration.fontFamily || 'Serif',
      options: ['Serif', 'Sans-Serif']
    },
    {
      name: 'fontWeight',
      labelText: 'Weight',
      type: 'select',
      defaultValue: props.decoration.fontWeight || 'Bold',
      options: ['Bold', 'Normal']
    },
    {
      name: 'fillColor',
      labelText: 'Color',
      type: 'colorPicker',
      defaultValue: props.decoration.fillColor || 'ffffff',
      pageCount: 2
    },
    {
      name: 'type',
      type: 'hidden',
      value: 'number'
    }
  ]

  return (
    <ModalForm  className="DecorationForm NumberDecorationForm"
                formInputs={formInputs}
                formUpdate={props.formUpdate}
                submitForm={props.submitForm}
                cancel={props.cancel}
                buttonText={props.buttonText}
                colorOptions={props.colorOptions} />
  )
}

export default NumberDecorationForm