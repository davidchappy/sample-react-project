import React from 'react'
import ModalForm from './ModalForm'
import './DecorationForm.css'

// Provides Text Decoration form data to the Modal Form component
export const TextDecorationForm = props => {
  const formInputs = [
    {
      name: 'textType',
      labelText: 'Type',
      type: 'select',
      defaultValue: props.decoration.textType || 'Last Name',
      options: ['Custom Text', 'Last Name', 'Team Name']
    },
    {
      name: 'content',
      labelText: 'Text Content',
      type: 'text',
      defaultValue: props.decoration.content,
      placeholder: 'Enter Text' 
    },
    {
      name: 'fontSize',
      labelText: 'Size',
      type: 'select',
      defaultValue: props.decoration.fontSize || '40',
      options: ['48', '40', '30', '24', '20']
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
      value: 'text'
    }
  ]

  return (
    <ModalForm  className="DecorationForm TextDecorationForm"
                formInputs={formInputs}
                formUpdate={props.formUpdate}
                submitForm={props.submitForm}
                cancel={props.cancel}
                buttonText={props.buttonText}
                colorOptions={props.colorOptions} />
  )
}

export default TextDecorationForm