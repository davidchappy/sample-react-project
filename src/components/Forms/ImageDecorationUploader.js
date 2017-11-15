import React, { Component } from 'react'
import './ImageDecorationUploader.css'
import Dropzone from 'react-dropzone'

// This class is rendered by the Modal Form component if prop is received
//  uses Dropzone library for image uploads and previews
export class ImageDecorationUploader extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      uploading: false,
      uploadedImage: null
    }
  }

  // Method called by Dropzone when user drops or chooses an image
  onImageDrop = files => {
    const file = files[0]

    this.setState({ uploadedImage: file })
    this.props.onUpload(file.preview)
  }

  // Fired when user confirms selected image
  handleCreateImageDecoration = e => {
    e.preventDefault()

    // Temporary: need to use image from server once connected;
    //  see Dropzone docs
    this.props.createImageDecoration(this.state.uploadedImage.preview)
  }

  // Fired when user clicks cancel on form
  handleCancelImageDecoration = e => {
    // Prevent memory links per react-dropzone
    if (this.state.uploadedImage) {
      window.URL.revokeObjectURL(this.state.uploadedImage.preview)
    }
    this.setState({ uploading: false, uploadedImage: null })
  }

  render() {
    const dialogue = this.state.uploadedImage
      ? <div className="image-decoration-preview">
          <img src={this.state.uploadedImage.preview} alt="Decoration Preview"/>
        </div>
      : <Dropzone  multiple={false} accept="image/*"
                   className="Dropzone uploader" 
                   onDrop={this.onImageDrop} >Upload Image Here</Dropzone>

    return (
      <div className="ImageDecorationUploader" >
        {dialogue}
      </div>
    )
  }
  
}

export default ImageDecorationUploader