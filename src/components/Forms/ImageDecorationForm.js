import React from 'react'
import ModalForm from './ModalForm'
import './DecorationForm.css'

// Provides Image Decoration form data to the Modal Form component
export const NumberDecorationForm = props => {
  const formInputs = [
    {
      name: 'uploader',
      labelText: '',
      type: 'uploader',
      uploadedImage: props.decoration.uploadedImage || null,
    },
    {
      name: 'type',
      type: 'hidden',
      value: 'image'
    }
  ]

  return (
    <ModalForm  className="DecorationForm ImageDecorationForm"
                formInputs={formInputs}
                submitForm={props.createImageDecoration}
                cancel={props.cancelImageDecoration}
                onUpload={props.onUpload}
                buttonText={props.buttonText}  />
  )
}

export default NumberDecorationForm